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
    website: "https://santoshkkashyap25.github.io"
  },

  skills: [
    {
      category: "Generative AI & RAG Systems",
      icon: "cpu",
      skills: [
        { name: "LangGraph / LangChain", level: "Expert", tag: "Production" },
        { name: "Live RAG & BM25 Re-Ranking", level: "Expert", tag: "Architecture" },
        { name: "ChromaDB & Vector Databases", level: "Advanced", tag: "Storage" },
        { name: "Token Streaming (Groq / Gemini)", level: "Expert", tag: "Low Latency" },
        { name: "Page-Level Citation Extraction", level: "Expert", tag: "Evaluation" },
        { name: "Multi-Model Orchestration", level: "Advanced", tag: "Reasoning" }
      ]
    },
    {
      category: "Deep Learning & NLP",
      icon: "network",
      skills: [
        { name: "PyTorch & PyTorch Geometric", level: "Expert", tag: "GNNs" },
        { name: "RoBERTa / BERT / Transformers", level: "Expert", tag: "NLP" },
        { name: "GCN, GAT & GraphSAGE", level: "Advanced", tag: "Graph AI" },
        { name: "Hugging Face Ecosystem", level: "Advanced", tag: "Models" },
        { name: "Hyperparameter Tuning (Optuna)", level: "Advanced", tag: "Optimization" },
        { name: "Sentence-Transformers Embeddings", level: "Expert", tag: "Vectors" }
      ]
    },
    {
      category: "MLOps & Model Optimization",
      icon: "server",
      skills: [
        { name: "INT8 Quantization & ONNX Runtime", level: "Expert", tag: "Inference" },
        { name: "Kolmogorov-Smirnov Drift Detection", level: "Advanced", tag: "Monitoring" },
        { name: "Probability Calibration (Isotonic/Sigmoid)", level: "Expert", tag: "Reliability" },
        { name: "FastAPI Async Microservices", level: "Expert", tag: "High Throughput" },
        { name: "Docker Containerization", level: "Advanced", tag: "DevOps" },
        { name: "Cost-Sensitive XGBoost Learning", level: "Advanced", tag: "Class Imbalance" }
      ]
    },
    {
      category: "Core Stack & Engineering",
      icon: "code",
      skills: [
        { name: "Python 3 (Asyncio, NumPy, Pandas)", level: "Expert", tag: "Primary" },
        { name: "JavaScript / Modern Web / DOM", level: "Advanced", tag: "Full-Stack" },
        { name: "Django & REST Framework", level: "Advanced", tag: "Web" },
        { name: "SQLite, PostgreSQL & NoSQL", level: "Advanced", tag: "Databases" },
        { name: "Git, GitHub Actions & CI/CD", level: "Expert", tag: "Workflow" },
        { name: "Linux, Shell & Cloud (Render/AWS)", level: "Advanced", tag: "Infra" }
      ]
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
    help: "List available commands: `about`, `skills`, `projects`, `blog`, `stats`, `contact`, `theme [dark|matrix|dracula|light]`, `clear`, `gui`",
    about: "Santosh Kumar Kashyap - AI/ML Engineer specializing in GenAI, RAG architectures, INT8 Quantized Transformers, and Graph Neural Networks.",
    stats: "Uptime: 99.98% | Active Models: 5+ Deployed | Target Latency: <1.2s | Primary Stack: PyTorch, LangGraph, FastAPI, ONNX",
    skills: "Categories: GenAI & RAG, Deep Learning & NLP, MLOps & Optimization, Backend Systems.",
    contact: "Email: santoshkkashyap25@gmail.com | GitHub: https://github.com/santoshkkashyap25",
    clear: "Clear terminal buffer"
  }
};
