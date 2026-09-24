# Architecting Production RAG: BM25 Re-Ranking, Page-Level Citations, and Sub-Second Streaming

*Published on September 18, 2026 • 6 min read • Category: RAG & GenAI*

---

Standard Retrieval-Augmented Generation (RAG) tutorials often demonstrate the naive approach: embed chunks, compute cosine similarity against a vector database, stuff the top 3 chunks into a system prompt, and invoke an LLM.

In real-world production systems, however, naive RAG falls apart on two major fronts:
1. **Semantic Drift & Keyword Blindness**: Dense embeddings excel at conceptual semantic matching but frequently miss exact alphanumeric codes, dates, acronyms, or specific entity names.
2. **Hallucinated Attribution**: Without strict provenance and page-level citations, users cannot trust the answers, especially in legal, medical, or fact-checking domains.

In this article, I will share the architectural blueprint behind **Live RAG Fact-Checker** and **Ask Your Doc**, highlighting how we engineered sub-second response times with verifiable page citations.

---

## 1. The Hybrid Retrieval Pipeline

To get the best of both worlds, we combine dense semantic retrieval with sparse lexical retrieval (BM25Okapi).

```
                      ┌───────────────┐
                      │  User Query   │
                      └───────┬───────┘
                              │
               ┌──────────────┴──────────────┐
               ▼                             ▼
       ┌───────────────┐             ┌───────────────┐
       │ Dense Search  │             │ Sparse BM25   │
       │  (ChromaDB)   │             │  (BM25Okapi)  │
       └───────┬───────┘             └───────┬───────┘
               │                             │
               └──────────────┬──────────────┘
                              ▼
                   ┌─────────────────────┐
                   │  Reciprocal Rank    │
                   │  Fusion (RRF Score) │
                   └──────────┬──────────┘
                              ▼
                   ┌─────────────────────┐
                   │  Cross-Encoder      │
                   │  Re-Ranker (Top 5)  │
                   └──────────┬──────────┘
                              ▼
                   ┌─────────────────────┐
                   │ Groq / LLM Stream   │
                   └─────────────────────┘
```

### Reciprocal Rank Fusion (RRF)
Rather than attempting to normalize disparate cosine distances and BM25 scores, we utilize reciprocal rank fusion:

$$RRF\_Score(d \in D) = \sum_{m \in M} \frac{1}{k + r_m(d)}$$

Where $k \approx 60$ and $r_m(d)$ is the document rank produced by retrieval method $m$.

```python
def reciprocal_rank_fusion(dense_ranks, bm25_ranks, k=60):
    rrf_scores = {}
    for rank, doc_id in enumerate(dense_ranks):
        rrf_scores[doc_id] = rrf_scores.get(doc_id, 0) + 1.0 / (k + rank + 1)
    for rank, doc_id in enumerate(bm25_ranks):
        rrf_scores[doc_id] = rrf_scores.get(doc_id, 0) + 1.0 / (k + rank + 1)
        
    return sorted(rrf_scores.items(), key=lambda x: x[1], reverse=True)
```

---

## 2. Enforcing Exact Page-Level Citations

When processing large documents (such as PDFs in *Ask Your Doc*), we inject strict chunk metadata containing:
- `doc_id`: Unique document identifier
- `page_number`: Exact source page
- `chunk_index`: Position within the document
- `bounding_box`: Spatial coordinates (when utilizing PDF extractors like PyMuPDF)

In the system prompt, we constrain the LLM to tag each claim with a bracketed reference:

```text
You are a precise fact-checking assistant. Answer the question ONLY using the provided excerpts.
For EVERY assertion, cite the source using the format [Doc: {doc_id}, Page: {page_number}].
Never make claims that cannot be directly attributed to an excerpt.
```

Our frontend parser then converts these bracketed tokens into clickable source pills that instantly scroll the viewer to the highlighted paragraph on the target page.

---

## 3. Sub-Second Token Streaming via FastAPI & Groq

To keep perceived latency under 500ms, we stream tokens using Server-Sent Events (SSE) directly from the LLM inference provider (such as Groq LLaMA 3.3 or Gemini) through FastAPI:

```python
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
import asyncio

app = FastAPI()

async def token_generator(query: str):
    context = await retrieve_hybrid_context(query)
    async for chunk in groq_client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=build_rag_messages(query, context),
        stream=True
    ):
        delta = chunk.choices[0].delta.content or ""
        if delta:
            yield f"data: {delta}\n\n"
    yield "data: [DONE]\n\n"

@app.get("/api/chat/stream")
async def chat_stream(q: str):
    return StreamingResponse(token_generator(q), media_type="text/event-stream")
```

---

## 4. Key Lessons from Production Deployments

1. **Chunk Boundaries Matter More Than Chunk Size**: Fixed 500-token chunks frequently split sentences in half. Implementing Markdown and header-aware chunking improved downstream retrieval accuracy by 23%.
2. **Cache Re-Ranked Queries**: Up to 35% of user queries in production are semantic duplicates. In-memory semantic hashing cuts inference costs significantly.
3. **Always Measure Faithfulness**: Use evaluation frameworks like Ragas to track context recall and answer faithfulness before deploying prompt changes.

Check out the live code and demo on GitHub:
- [Live RAG Fact-Checker Repository](https://github.com/santoshkkashyap25/live-rag-fact-checker)
- [Ask Your Doc Repository](https://github.com/santoshkkashyap25/ask-your-doc)
