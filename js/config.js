/**
 * Centralized Site Configuration & Data Store
 * Easily update your personal details, projects, skills, and blog posts here.
 */
const SITE_CONFIG = {
  profile: {
    name: "Santosh Kumar Kashyap",
    shortName: "Santosh K.",
    handle: "santoshkkashyap25",
    role: "AI / ML Engineer & GenAI Systems Developer",
    statusText: "Open to AI/ML Engineering & GenAI Roles",
    isAvailable: true,
    bio: "AI / ML Engineer specializing in production-ready Generative AI architectures, low-latency RAG pipelines with verifiable citations, INT8 quantized transformer inference, and Graph Neural Networks for social intelligence.",
    location: "India",
    email: "santoshkkashyap25@gmail.com",
    github: "https://github.com/santoshkkashyap25",
    linkedin: "https://www.linkedin.com/in/santosh-kumar-kashyap-8b8359218/",
    substack: "https://substack.com/@skknotes",
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
        { name: "Token Streaming (Groq / Gemini)", level: "Expert", tag: "Low Latency" },
        { name: "Page-Level Citation Extraction", level: "Expert", tag: "Attribution" }
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
      category: "Backend, Security & Cloud",
      icon: "code",
      skills: [
        { name: "FastAPI Async Microservices", level: "Expert", tag: "High Throughput" },
        { name: "Redis Multi-tier Caching (<1ms)", level: "Expert", tag: "Performance" },
        { name: "PostgreSQL & SQLite", level: "Advanced", tag: "Databases" },
        { name: "AES-256-GCM & HMAC Indexing", level: "Advanced", tag: "Security" },
        { name: "Docker & Docker Compose", level: "Expert", tag: "Containers" },
        { name: "AWS Cloud Infrastructure", level: "Advanced", tag: "Deployment" },
        { name: "Django & REST Framework", level: "Advanced", tag: "Full-Stack" }
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
    citation: "IEEE Conference Proceedings",
    summary: "A deep learning framework for automated data race detection in OpenMP parallel computing programs using Abstract Syntax Trees (ASTs), text vectorization, neural embeddings, and a Deep Convolutional Neural Network (DCNN).",
    highlights: [
      "Achieved 89.60% accuracy and 89.60% F1-score on synchronization-based parallel datasets, significantly outperforming baseline CNN approaches.",
      "Engineered random-search hyperparameter optimization with early stopping, model checkpointing, and ReduceLROnPlateau dynamic scheduling."
    ],
    tags: ["Deep Learning", "AST Analysis", "OpenMP Concurrency", "DCNN", "Hyperparameter Optimization", "IEEE"]
  },

  education: [
    {
      institution: "Malaviya National Institute of Technology (MNIT), Jaipur",
      degree: "M.Tech in Computer Science and Engineering",
      period: "Aug 2022 – Jun 2024",
      grade: "CGPA: 8.47 / 10",
      details: "Core focus on advanced algorithms, deep learning architectures, and distributed systems."
    },
    {
      institution: "Himachal Pradesh Technical University, Hamirpur",
      degree: "B.Tech in Computer Science and Engineering",
      period: "Aug 2017 – Jun 2021",
      grade: "CGPA: 8.99 / 10 • University Gold Medalist 🥇",
      details: "Graduated Rank 1 across the university. Strong foundations in computer systems, mathematics, and data structures."
    }
  ],

  honors: [
    {
      icon: "🥇",
      title: "University Gold Medalist (Rank 1)",
      issuer: "Himachal Pradesh Technical University",
      desc: "Awarded University Gold Medal for securing 1st Rank in B.Tech Computer Science & Engineering (CGPA 8.99/10, 2021)."
    },
    {
      icon: "⚡",
      title: "GATE CS Qualified",
      issuer: "Ministry of Education, Govt. of India",
      desc: "Qualified the prestigious Graduate Aptitude Test in Engineering (GATE 2022) in Computer Science & Information Technology."
    },
    {
      icon: "💡",
      title: "900+ Algorithmic Problems Solved",
      issuer: "LeetCode & GeeksforGeeks",
      desc: "Solved over 900 algorithmic and system design challenges spanning dynamic programming, graphs, trees, and concurrency."
    }
  ],

  projects: [
    {
      id: "live-rag-fact-checker",
      title: "Live RAG Fact-Checker",
      category: "rag",
      categoryName: "RAG & GenAI",
      badge: "LIVE DEMO",
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
      badge: "STREAMING",
      stars: 1,
      shortDescription: "Interactive conversational document intelligence platform using dense retrieval. Query long PDF research papers with live token streaming and exact page citations.",
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
      title: "Production Sentiment Engine (INT8 Quantized)",
      category: "mlops",
      categoryName: "MLOps & Inference",
      badge: "INT8 ONNX",
      stars: 1,
      shortDescription: "Production-ready customer sentiment classification engine powered by INT8 quantized RoBERTa with calibrated negative recall (>90%) and real-time Kolmogorov-Smirnov drift monitoring.",
      highlights: [
        "4x inference latency reduction via INT8 post-training quantization on ONNX Runtime",
        "Strictly calibrated negative recall (>90%) to catch high-risk churn churn signals",
        "Continuous statistical drift monitoring using Kolmogorov-Smirnov hypothesis tests"
      ],
      technologies: ["RoBERTa", "INT8 Quantization", "ONNX Runtime", "FastAPI", "Drift Detection", "Python"],
      githubUrl: "https://github.com/santoshkkashyap25/sentiment-analysis",
      demoUrl: null,
      isFeatured: true
    },
    {
      id: "fake-news-detection-gnn",
      title: "Social Misinformation Detection with GNNs",
      category: "deeplearning",
      categoryName: "Graph AI & Deep Learning",
      badge: "RESEARCH",
      stars: 1,
      shortDescription: "Graph Neural Network system detecting misinformation cascade propagation on social networks using GCN, GAT, GIN, and GraphSAGE with BERT textual embeddings on UPFD benchmark.",
      highlights: [
        "Models propagation graph topology alongside linguistic news signals",
        "Automated Bayesian hyperparameter tuning with Optuna",
        "Comprehensive benchmark comparison against baseline NLP classifiers"
      ],
      technologies: ["PyTorch Geometric", "GNN / GAT", "BERT", "Optuna", "Python", "UPFD Benchmark"],
      githubUrl: "https://github.com/santoshkkashyap25/fake-news-detection-gnn",
      demoUrl: "https://arxiv.org/abs/2104.12259",
      isFeatured: true
    },
    {
      id: "insurance-default-risk-profiler",
      title: "Insurance Premium Default Risk Profiler",
      category: "mlops",
      categoryName: "MLOps & Analytics",
      badge: "ROI OPTIMIZED",
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
      id: "kart-ecommerce",
      title: "Kart Full-Stack E-Commerce Platform",
      category: "web",
      categoryName: "Systems & Web",
      badge: "FULL-STACK",
      stars: 1,
      shortDescription: "Full-stack e-commerce web platform built with Django. Features dynamic search & filtering, real-time AJAX cart, multi-address checkout pipeline, and custom administrative dashboard.",
      highlights: [
        "Zero-page-reload AJAX shopping cart and wishlist management",
        "Comprehensive order fulfillment lifecycle and automated notifications",
        "Optimized database queries with Django ORM indexing"
      ],
      technologies: ["Django", "Python", "AJAX", "PostgreSQL", "Bootstrap"],
      githubUrl: "https://github.com/santoshkkashyap25/kart-ecommerce",
      demoUrl: null,
      isFeatured: false
    },
    {
      id: "iris-flower-classifier",
      title: "Iris Flower Classifier & Production API",
      category: "mlops",
      categoryName: "Machine Learning API",
      badge: "REST API",
      stars: 1,
      shortDescription: "Interactive Iris flower species classifier and REST API built with Flask, Scikit-Learn pipelines, confidence scoring, automated unit tests, and automated cloud deployment.",
      highlights: [
        "Scikit-Learn preprocessing and modeling pipeline serialization",
        "Confidence score thresholding for out-of-distribution inputs",
        "Automated unit testing suite"
      ],
      technologies: ["Flask", "Scikit-Learn", "Python", "REST API", "Docker"],
      githubUrl: "https://github.com/santoshkkashyap25/iris-flower-classifier",
      demoUrl: "https://flotect.onrender.com/",
      isFeatured: false
    }
  ],

  blogPosts: [
    {
      slug: "rag-pipeline-optimization",
      title: "Architecting Production RAG: BM25 Re-Ranking, Page-Level Citations, and Sub-Second Streaming",
      summary: "How to eliminate hallucinations and achieve sub-second live web verification using hybrid dense-sparse retrieval, BM25Okapi scoring, and LangGraph streaming.",
      date: "2026-09-18",
      readTime: "6 min read",
      category: "RAG & GenAI",
      tags: ["RAG", "LangGraph", "Groq", "FastAPI", "BM25"],
      markdownFile: "posts/rag-pipeline-optimization.md"
    },
    {
      slug: "quantized-roberta-inference",
      title: "Optimizing Transformer Inference: INT8 Quantization with ONNX and Statistical Drift Monitoring",
      summary: "Achieving a 4x throughput boost and <15ms p95 latency on RoBERTa classifiers while maintaining >90% negative recall and monitoring Kolmogorov-Smirnov feature drift.",
      date: "2026-08-25",
      readTime: "8 min read",
      category: "MLOps & Systems",
      tags: ["ONNX", "Quantization", "RoBERTa", "MLOps", "FastAPI"],
      markdownFile: "posts/quantized-roberta-inference.md"
    },
    {
      slug: "graph-neural-networks-misinformation",
      title: "Graph Neural Networks for Misinformation: Benchmarking GCN, GAT, and GraphSAGE on Cascade Graphs",
      summary: "Why structural propagation graphs outperform pure text NLP for social misinformation detection. A deep dive into PyTorch Geometric and Optuna Bayesian optimization.",
      date: "2026-07-10",
      readTime: "7 min read",
      category: "Deep Learning",
      tags: ["PyTorch Geometric", "GNN", "BERT", "Optuna", "Graph AI"],
      markdownFile: "posts/graph-neural-networks-misinformation.md"
    }
  ],

  journey: [
    {
      commitHash: "9a4f21d",
      tag: "v2.5.0-prod",
      type: "feat",
      date: "September 2026",
      title: "Engineered Live RAG Fact-Checker & LangGraph Multi-Agent Workflows",
      description: "Architected real-time claim verification system against live DuckDuckGo and Wikipedia engines. Implemented BM25Okapi re-ranking, token streaming, and deployed on cloud infrastructure.",
      stack: ["LangGraph", "Groq", "BM25Okapi", "FastAPI", "Docker"]
    },
    {
      commitHash: "7b138ee",
      tag: "v2.1.0",
      type: "perf",
      date: "August 2026",
      title: "Production RoBERTa INT8 Quantization & MLOps Drift Pipeline",
      description: "Serialized transformer classifiers into ONNX INT8 representation, slashing inference latency by 4x. Integrated automated Kolmogorov-Smirnov drift detection to catch dataset distribution shifts.",
      stack: ["ONNX Runtime", "RoBERTa", "Quantization", "Drift Monitoring"]
    },
    {
      commitHash: "5e024aa",
      tag: "v1.8.0",
      type: "research",
      date: "January 2024",
      title: "Developed Fake News Cascade Classifier using Graph Neural Networks",
      description: "Designed GCN, GAT, and GraphSAGE topological propagation graph models for social network rumor detection on the UPFD benchmark with PyTorch Geometric and Optuna.",
      stack: ["PyTorch Geometric", "GAT", "BERT", "Optuna"]
    },
    {
      commitHash: "3c9110b",
      tag: "v1.2.0",
      type: "feat",
      date: "April 2021",
      title: "Class-Imbalance XGBoost & Cost-Sensitive Insurance Default Profiler",
      description: "Solved 94:6 extreme class imbalance with calibrated XGBoost probabilities and cost matrix optimization to maximize retention outreach ROI.",
      stack: ["XGBoost", "Scikit-Learn", "Probability Calibration", "Streamlit"]
    },
    {
      commitHash: "1a082f4",
      tag: "init",
      type: "init",
      date: "March 2021",
      title: "Initial Git Commit: Embarked on AI / ML Engineering Odyssey",
      description: "Started core machine learning foundation, mathematical modeling, and production software engineering.",
      stack: ["Python", "Algorithms", "Mathematics", "Linux"]
    }
  ],

  terminalCommands: {
    help: "List available commands: `about`, `experience`, `projects`, `research`, `education`, `skills`, `blog`, `stats`, `contact`, `theme [dark|matrix|dracula|light]`, `clear`, `gui`",
    about: "Santosh Kumar Kashyap - AI/ML Engineer specializing in GenAI, RAG architectures, INT8 Quantized Transformers, and Graph Neural Networks.",
    experience: "Tecorb Technologies (AI/ML Engineer), Shorthills AI (SDE 1), KVCH (ML Intern). Type `experience` in terminal.",
    research: "SafeCode: Enhancing Data Race Detection in OpenMP Through Hyperparameter-Optimised DCNN [IEEE Publication]",
    education: "M.Tech CSE from MNIT Jaipur (8.47 CGPA), B.Tech CSE from HPTU (8.99 CGPA, Gold Medalist 🥇)",
    stats: "Uptime: 99.98% | Active Models: 5+ Deployed | Primary Stack: PyTorch, LangGraph, FastAPI, ONNX",
    skills: "Categories: GenAI & Agentic Systems, Search & Vector Retrieval, Machine Learning & MLOps, Backend & Cloud.",
    contact: "Email: santoshkkashyap25@gmail.com | GitHub: https://github.com/santoshkkashyap25 | Substack: https://substack.com/@skknotes",
    clear: "Clear terminal buffer"
  }
};
