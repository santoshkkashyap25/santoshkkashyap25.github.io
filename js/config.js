/**
 * Centralized Site Configuration & Data Store
 * Easily update your personal details, projects, skills, and blog posts here.
 */
const SITE_CONFIG = {
  profile: {
    name: "Santosh Kumar Kashyap",
    shortName: "Santosh K.",
    handle: "santoshkkashyap25",
    role: "AI / ML Engineer",
    statusText: "Open to AI/ML Engineering & GenAI Roles",
    bio: "AI / ML Engineer focused on designing intelligent systems, machine learning pipelines, generative AI solutions, and deep learning architectures.",
    location: "India",
    email: "santoshkkashyap25@gmail.com",
    github: "https://github.com/santoshkkashyap25",
    linkedin: "https://www.linkedin.com/in/santoshkkashyap25/",
    substack: "https://substack.com/@skknotes",
    portfolioApp: "https://portfolio-lemon-eight-ubrmijgffb.vercel.app/",
    website: "https://santoshkkashyap25.github.io"
  },

  skills: [
    {
      category: "GenAI & Agentic Systems",
      icon: "cpu",
      skills: [
        { name: "LangGraph / LangChain", level: "Expert", tag: "Workflows" },
        { name: "Model Context Protocol (MCP)", level: "Expert", tag: "Protocols" },
        { name: "LiteLLM & Dynamic Routing", level: "Expert", tag: "Inference" },
        { name: "Tool & Function Calling", level: "Expert", tag: "Agents" },
        { name: "Guardrails (HarmBench / IFEval)", level: "Expert", tag: "Safety" },
        { name: "Prompt Hierarchy & Jailbreak Defense", level: "Expert", tag: "Security" },
        { name: "Token Streaming (Groq / Gemini)", level: "Expert", tag: "Low Latency" }
      ]
    },
    {
      category: "Search & Vector Retrieval",
      icon: "network",
      skills: [
        { name: "Elasticsearch Hybrid Search", level: "Expert", tag: "Enterprise" },
        { name: "MongoDB Atlas Vector Search", level: "Expert", tag: "HNSW" },
        { name: "BM25Okapi Lexical Re-Ranking", level: "Expert", tag: "Sparse Search" },
        { name: "FAISS & ChromaDB", level: "Advanced", tag: "Vector Index" },
        { name: "Weaviate Vector DB", level: "Advanced", tag: "Storage" },
        { name: "Reciprocal Rank Fusion (RRF)", level: "Expert", tag: "Hybrid Search" }
      ]
    },
    {
      category: "Machine Learning & MLOps",
      icon: "server",
      skills: [
        { name: "PyTorch & PyTorch Geometric", level: "Expert", tag: "Deep Learning" },
        { name: "INT8 Quantization & ONNX Runtime", level: "Expert", tag: "Inference Speed" },
        { name: "TensorFlow & scikit-learn", level: "Advanced", tag: "ML Frameworks" },
        { name: "MLflow Model Tracking", level: "Advanced", tag: "Lifecycle" },
        { name: "Kolmogorov-Smirnov Drift Testing", level: "Expert", tag: "Monitoring" },
        { name: "Probability Calibration (Isotonic)", level: "Expert", tag: "Class Imbalance" },
        { name: "Graph Neural Networks (GCN/GAT)", level: "Advanced", tag: "Graph AI" }
      ]
    },
    {
      category: "Cloud & AI Infrastructure",
      icon: "code",
      skills: [
        { name: "FastAPI Async Microservices", level: "Expert", tag: "Inference APIs" },
        { name: "Redis In-Memory Caching", level: "Expert", tag: "Low Latency" },
        { name: "Docker & Containerization", level: "Expert", tag: "Containers" },
        { name: "AWS Cloud Infrastructure", level: "Advanced", tag: "Cloud Deployment" },
        { name: "PostgreSQL & SQLite", level: "Advanced", tag: "Databases" }
      ]
    }
  ],

  experience: [
    {
      company: "Tecorb Technologies",
      role: "AI / ML Engineer",
      location: "Noida, Uttar Pradesh",
      period: "Nov 2024 – Present",
      type: "Full-Time",
      highlights: [
        "Architected dual-source parallel RAG retrieval pipelines using MongoDB Atlas HNSW Vector Search and all-MiniLM-L6-v2, cutting retrieval latency by 50% (500ms → 250ms) across concurrent knowledge stores.",
        "Engineered deterministic cosine-similarity relevance gating (≥ 0.3) that short-circuits LLM generation for out-of-scope context, eliminating unnecessary token expenditure and preventing hallucinations.",
        "Built a thread-safe 2-tier caching subsystem (L1 in-memory TTL + L2 Redis across Uvicorn workers) achieving <1ms response times for cache hits with automated auditing across 5 quality dimensions.",
        "Designed and implemented multi-layered LLM safety and jailbreak guardrails via prompt hierarchy decoupling, achieving a 100% refusal rate across 198 HarmBench vectors.",
        "Constructed empirical LLM evaluation harnesses benchmarking persona fidelity, instruction following (IFEval), and capability retention across multiple model families.",
        "Engineered containerized multi-channel agent runtimes streaming inference across WhatsApp, Telegram, and Slack via LiteLLM dynamic routing and advisory-register gating."
      ],
      stack: ["MongoDB Atlas Vector", "FastAPI", "Redis", "LiteLLM", "HarmBench & IFEval", "Docker", "PostgreSQL", "Python"]
    },
    {
      company: "Shorthills AI",
      role: "Software Development Engineer (SDE 1)",
      location: "Gurugram, Haryana",
      period: "Sep 2024 – Aug 2025",
      type: "Full-Time",
      highlights: [
        "Developed conversational AI chatbots and multi-turn product research workflows analyzing 18.6M+ unstructured reviews across 1,500+ categories.",
        "Built enterprise RAG conversational pipelines using LangChain, Elasticsearch, and LLMs for grounded, context-aware answer generation.",
        "Architected automated document ingestion and preprocessing pipelines (OCR, structured text parsing, metadata extraction) for multi-hundred-page technical manuals.",
        "Implemented function and tool calling, conversational memory persistence, dynamic recommendation flows, and token streaming for responsive chat interfaces.",
        "Engineered an automated root-cause analysis assistant surfacing diagnostic failure modes and historical remediation patterns from technical datasets."
      ],
      stack: ["LangChain", "Elasticsearch", "FastAPI", "OCR & Document AI", "Prompt Engineering", "Python"]
    },
    {
      company: "KVCH Pvt. Ltd.",
      role: "Machine Learning Intern",
      location: "Noida, Uttar Pradesh",
      period: "Feb 2021 – Jul 2021",
      type: "Internship",
      highlights: [
        "Engineered text processing, feature extraction, and NLP classification pipelines using Python and scikit-learn.",
        "Conducted exploratory data analysis, dataset preprocessing, and baseline machine learning model evaluations."
      ],
      stack: ["Python", "scikit-learn", "NLP", "Data Preprocessing"]
    }
  ],

  research: {
    title: "SafeCode: Enhancing Data Race Detection in OpenMP Through Hyperparameter-Optimised DCNN",
    publisher: "IEEE",
    badge: "IEEE PUBLICATION",
    citation: "IEEE Conference Proceedings (Co-Authored)",
    url: "https://ieeexplore.ieee.org/document/11398187/",
    summary: "A collaborative deep learning research framework for automated data race detection in OpenMP parallel computing programs using Abstract Syntax Trees (ASTs), text vectorization, neural embeddings, and a Deep Convolutional Neural Network (DCNN).",
    highlights: [
      "Co-authored research achieving 89.60% accuracy and 89.60% F1-score on synchronization-based parallel datasets, outperforming baseline CNN approaches.",
      "Engineered random-search hyperparameter optimization with early stopping, model checkpointing, and ReduceLROnPlateau dynamic scheduling."
    ],
    tags: ["Deep Learning", "AST Analysis", "OpenMP Concurrency", "DCNN", "Hyperparameter Optimization", "IEEE"]
  },

  education: [
    {
      institution: "Malaviya National Institute of Technology (MNIT), Jaipur",
      degree: "M.Tech in Computer Science and Engineering",
      period: "Aug 2022 – Jun 2024",
      grade: "",
      details: "Focused on machine learning algorithms, deep learning architectures, and generative AI systems."
    },
    {
      institution: "Himachal Pradesh Technical University, Hamirpur",
      degree: "B.Tech in Computer Science and Engineering",
      period: "Aug 2017 – Jun 2021",
      grade: "Gold Medalist (University First Rank)",
      details: "Strong foundations in computer systems, algorithms, mathematics, and software engineering."
    }
  ],

  projects: [
    {
      id: "live-rag-fact-checker",
      title: "Live RAG Fact-Checker",
      category: "rag",
      categoryName: "RAG & GenAI",
      badge: "RAG & AGENTS",
      stars: 1,
      shortDescription: "Real-time AI fact-checking system verifying claim veracity against live web intelligence (DuckDuckGo + Wikipedia) with BM25Okapi re-ranking and multi-provider LLM reasoning (Groq, Gemini, OpenAI, Claude).",
      highlights: [
        "Hybrid dense + sparse BM25Okapi re-ranking for ultra-precise context alignment",
        "Sub-second live web verification engine with token streaming",
        "Multi-provider LLM fallback consensus mechanism"
      ],
      technologies: ["LangGraph", "FastAPI", "Groq", "BM25Okapi", "DuckDuckGo API", "Docker", "TypeScript"],
      githubUrl: "https://github.com/santoshkkashyap25/live-rag-fact-checker",
      demoUrl: "https://factguard-frontend-qo5v.onrender.com/",
      isFeatured: true
    },
    {
      id: "ask-your-doc",
      title: "Ask Your Doc (PDF Chat via RAG)",
      category: "rag",
      categoryName: "RAG & GenAI",
      badge: "DOCUMENT AI",
      stars: 1,
      shortDescription: "Conversational document intelligence platform using dense retrieval. Query long PDF research papers with token streaming and exact page citations.",
      highlights: [
        "LangGraph stateful conversation graphs with memory retention",
        "Exact page-level citation extraction avoiding LLM hallucinations",
        "Vector indexing powered by ChromaDB & Sentence-Transformers"
      ],
      technologies: ["LangGraph", "FastAPI", "ChromaDB", "Sentence-Transformers", "Groq", "Python"],
      githubUrl: "https://github.com/santoshkkashyap25/ask-your-doc",
      demoUrl: "https://askyourdoc-s0p9.onrender.com",
      isFeatured: true
    },
    {
      id: "sentiment-analysis",
      title: "Sentiment Analysis Engine (INT8 Quantized)",
      category: "mlops",
      categoryName: "MLOps & Inference",
      badge: "INT8 ONNX",
      stars: 1,
      shortDescription: "Customer sentiment classification system powered by INT8 quantized RoBERTa with calibrated negative recall (>90%) and real-time Kolmogorov-Smirnov drift monitoring.",
      highlights: [
        "4x inference latency reduction via INT8 post-training quantization on ONNX Runtime",
        "Strictly calibrated negative recall (>90%) to catch high-risk churn signals",
        "Continuous statistical drift monitoring using Kolmogorov-Smirnov hypothesis tests"
      ],
      technologies: ["RoBERTa", "INT8 Quantization", "ONNX Runtime", "FastAPI", "Drift Detection", "Python"],
      githubUrl: "https://github.com/santoshkkashyap25/sentiment-analysis",
      demoUrl: "https://sentipulse-q0mx.onrender.com/",
      isFeatured: true
    },
    {
      id: "fake-news-detection-gnn",
      title: "Social Misinformation Detection with GNNs",
      category: "deeplearning",
      categoryName: "Graph AI & Deep Learning",
      badge: "RESEARCH",
      stars: 1,
      shortDescription: "Graph Neural Network system detecting misinformation cascade propagation on social networks using GCN, GAT, GIN, and GraphSAGE with BERT textual embeddings, inspired by research on the UPFD benchmark.",
      highlights: [
        "Models propagation graph topology alongside linguistic news signals",
        "Automated Bayesian hyperparameter tuning with Optuna",
        "Comprehensive benchmark comparison against baseline NLP classifiers"
      ],
      technologies: ["PyTorch Geometric", "GNN / GAT", "BERT", "Optuna", "Python", "UPFD Benchmark"],
      githubUrl: "https://github.com/santoshkkashyap25/fake-news-detection-gnn",
      isFeatured: true
    },
    {
      id: "insurance-default-risk-profiler",
      title: "Insurance Premium Default Risk Profiler",
      category: "mlops",
      categoryName: "MLOps & Analytics",
      badge: "RISK MODEL",
      stars: 1,
      shortDescription: "End-to-end insurance premium default prediction system addressing severe class imbalance (94:6) with probability-calibrated XGBoost to maximize outreach retention ROI.",
      highlights: [
        "Cost-sensitive loss formulation balancing false positives vs lost policyholders",
        "Isotonic regression probability calibration ensuring realistic risk scoring",
        "Interactive decision-support dashboard built for policy operations"
      ],
      technologies: ["XGBoost", "Probability Calibration", "FastAPI", "Streamlit", "Cost-Sensitive Learning"],
      githubUrl: "https://github.com/santoshkkashyap25/insurance-default-risk-profiler",
      demoUrl: "https://insurance-default-risk-profiler.onrender.com/",
      isFeatured: false
    },
    {
      id: "iris-flower-classifier",
      title: "Iris Flower Classifier",
      category: "mlops",
      categoryName: "Machine Learning API",
      badge: "CLASSIFICATION",
      stars: 1,
      shortDescription: "Iris flower species classifier built with Flask, Scikit-Learn pipelines, confidence scoring, automated unit tests, and cloud deployment.",
      highlights: [
        "Scikit-Learn preprocessing and modeling pipeline serialization",
        "Confidence score thresholding for out-of-distribution inputs",
        "Automated unit testing suite"
      ],
      technologies: ["Flask", "Scikit-Learn", "Python", "API", "Docker"],
      githubUrl: "https://github.com/santoshkkashyap25/iris-flower-classifier",
      demoUrl: "https://flotect.onrender.com/",
      isFeatured: false
    }
  ],

  blogPosts: [
    {
      slug: "the-1-bit-revolution",
      title: "The 1-Bit Revolution: The AI That Runs on Just Three Numbers",
      summary: "What if we've been scaling the wrong thing in AI? How native 1.58-bit ternary architectures [-1, 0, +1] break the compute curve, cut memory by 80%, and challenge the assumption that intelligence requires floating-point precision.",
      date: "2026-03-20",
      readTime: "7 min read",
      category: "LLM Architecture & Efficiency",
      tags: ["BitNet", "Ternary Weights", "Quantization", "Efficiency", "Deep Learning"],
      markdownFile: "posts/the-1-bit-revolution.md"
    }
  ],

  terminalCommands: {
    help: "List available commands: `about`, `experience`, `projects`, `research`, `education`, `skills`, `blog`, `portfolio`, `resume`, `stats`, `contact`, `theme [system|dark|matrix|dracula|light]`, `clear`, `gui`",
    about: "Santosh Kumar Kashyap - AI/ML Engineer focused on machine learning systems, deep learning, and generative AI.",
    experience: "Tecorb Technologies (AI/ML Engineer), Shorthills AI (SDE 1), KVCH (ML Intern). Type `experience` in terminal.",
    research: "SafeCode: Enhancing Data Race Detection in OpenMP Through Hyperparameter-Optimised DCNN [IEEE Publication]: https://ieeexplore.ieee.org/document/11398187/",
    education: "M.Tech CSE from MNIT Jaipur, B.Tech CSE from HPTU (Gold Medalist)",
    portfolio: "Portfolio Website: https://portfolio-lemon-eight-ubrmijgffb.vercel.app/",
    resume: "To request my latest comprehensive resume, send an email to santoshkkashyap25@gmail.com with subject 'Resume Request'.",
    stats: "Uptime: 99.98% | Active Models: 5+ Deployed | Primary Stack: PyTorch, LangGraph, FastAPI, ONNX",
    skills: "Categories: GenAI & Agentic Systems, Search & Vector Retrieval, Machine Learning & MLOps, Cloud & AI Infrastructure.",
    contact: "Email: santoshkkashyap25@gmail.com | Portfolio: https://portfolio-lemon-eight-ubrmijgffb.vercel.app/ | GitHub: https://github.com/santoshkkashyap25 | LinkedIn: https://www.linkedin.com/in/santoshkkashyap25/ | Substack: https://substack.com/@skknotes",
    clear: "Clear terminal buffer"
  }
};
