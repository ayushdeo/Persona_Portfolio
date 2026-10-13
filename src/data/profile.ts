// Single source of truth for portfolio content.
// Pages pull from here so copy only needs updating in one place.

const base = import.meta.env.BASE_URL;

export const links = {
    email: "mailto:theayushdeo@gmail.com",
    resume: `${base}/resume.pdf`,
    scholar: "https://scholar.google.com/citations?user=PTnp3CgAAAAJ&hl=en",
    github: "https://github.com/ayushdeo",
    linkedin: "https://www.linkedin.com/in/ayushdeo",
};

export const nav = [
    { name: "MISSION START", short: "START", href: `${base}/` },
    { name: "STATS", short: "STATS", href: `${base}/stats/` },
    { name: "ARSENAL", short: "ARSENAL", href: `${base}/arsenal/` },
    { name: "RESEARCH PROWESS", short: "RESEARCH", href: `${base}/research/` },
    { name: "SAFE ROOM", short: "SAFE ROOM", href: `${base}/safe-room/` },
];

// ---------------------------------------------------------------- research

export const objective = "Applied research in language systems";

export const activeMissions = [
    { title: "Compression Systems", detail: "Optimization work", status: "IN PROGRESS" },
    { title: "Spatial Transcriptomics", detail: "Ongoing research", status: "IN PROGRESS" },
];

export const researchInterests = [
    "Language Systems",
    "Deep Learning",
    "NLP",
    "Computer Vision",
    "Socio-Behavioral Studies",
];

export type Publication = {
    title: string;
    authors?: string;
    venue: string;
    year: string;
    status: "PUBLISHED" | "PRESENTED" | "UNDER REVIEW";
    summary: string;
    tag: string;
    link?: string;
};

export const publications: Publication[] = [
    {
        title: "Sentiment-Controlled Image Caption Generation Using Modular Vision-Language Models",
        venue: "SN Computer Science",
        year: "2026",
        status: "UNDER REVIEW",
        tag: "VISION-LANGUAGE",
        summary:
            "Multimodal transformer system that generates sentiment-aware captions across 15,500 food images, with sentiment tagging from 20,000+ Instagram posts.",
    },
    {
        title: "Implementation of a Unified Deep Learning Based Deepfake Detection Model to Mitigate Business Risk",
        authors: "A. Deo, I. Butaney, N. Keni, P. Mayekar",
        venue: "Artificial Intelligence-Driven Triple Helix Innovation (Springer)",
        year: "2026",
        status: "PUBLISHED",
        tag: "DEEPFAKE DETECTION",
        summary:
            "A unified deep-learning deepfake detector framed around business risk. Presented at the International Conference of Global Economic Revolution 2024.",
    },
    {
        title: "Unveiling Biases via Proactive Detection and Analysis of Racism in GPT-4o-mini",
        authors: "A. Deo, A. Rao",
        venue: "Springer conference proceedings",
        year: "2025",
        status: "PUBLISHED",
        tag: "LLM BIAS",
        summary:
            "Evaluation pipelines probing racial bias in GPT-4o-mini across domains, using structured prompts, statistical analysis and NLP metrics, cross-checked against a survey of training data.",
    },
    {
        title: "Implementation of a Deep Learning-Based ICT Model to Solve the Problem of Enroute Confirmation of Waitlisted Tickets in Indian Railways",
        authors: "A. Deo, D. Raythatha, I. Butaney, K. Syed, P. Aggarwal, M. Parihar",
        venue: "International Conference on Data Analytics & Management (Springer), pp. 325–336",
        year: "2024",
        status: "PUBLISHED",
        tag: "OPTIMIZATION",
        summary:
            "Deep-learning and ICT-based automated seat allocation for Indian Railways, improving transparency and curbing malpractice in ticket allotment.",
        link: "https://doi.org/10.1007/978-981-96-3352-4_23",
    },
    {
        title: "Empirical Analysis of Growth of the IT Sector in India and its Sustainability in the Future",
        authors: "A. Deo, D. Raythatha, I. Butaney, K. Syed, P. Aggarwal, M. Parihar",
        venue: "Springer book chapter",
        year: "2024",
        status: "PUBLISHED",
        tag: "ECONOMETRICS",
        summary:
            "Regression analysis of India's IT software sector: its global impact, growth challenges and long-term sustainability.",
        link: "https://doi.org/10.1007/978-3-031-56586-1_27",
    },
    {
        title: "Examining McDonald's Operational Strategies: An Integrated Application of Regression and Social Media Sentiment Analysis",
        venue: "PAN IIM 2023",
        year: "2023",
        status: "PRESENTED",
        tag: "SENTIMENT ANALYTICS",
        summary:
            "Combined business metrics with social-media sentiment analysis to evaluate operational strategy and customer loyalty.",
    },
];

// -------------------------------------------------------------- experience

export const experience = [
    {
        role: "Research Assistant — Software Development",
        company: "USC Dornsife",
        duration: "APR 2026 — PRESENT",
        place: "Los Angeles",
        arcana: "THE PRIESTESS",
        points: [
            "Fixed a timing-drift bug across 864 production tasks by moving timestamps from browser frame numbers to a millisecond schema (React/TypeScript + Django).",
            "Ran a zero-data-loss PostgreSQL migration: additive schema change plus an atomic backfill with a dry-run mode.",
            "Operate a 10-container Docker platform serving 150 researchers across 800+ annotation tasks.",
        ],
        skills: ["DJANGO", "REACT", "POSTGRESQL", "DOCKER", "AZURE"],
    },
    {
        role: "Software Engineering Intern — Cloud.AI",
        company: "Tata Consultancy Services",
        duration: "JAN 2025 — JUN 2025",
        place: "Mumbai",
        arcana: "THE MAGICIAN",
        points: [
            "Cut fraud-investigation time 40% with a distributed Azure SQL → Cosmos DB graph pipeline via Databricks.",
            "Automated 60% of fraud-analysis workflows with a 7-agent Copilot Studio system.",
            "Took reporting for two global banks from 2 weeks to under 10 minutes with a multi-agent RAG pipeline (Azure OpenAI, AutoGen).",
        ],
        skills: ["MULTI-AGENT", "RAG", "AZURE OPENAI", "DATABRICKS"],
    },
    {
        role: "Co-Founder",
        company: "BelleVidCo",
        duration: "JUN 2023 — JUN 2025",
        place: "Mumbai",
        arcana: "THE EMPEROR",
        points: [
            "Built a data-driven marketing and analytics consultancy to $12,000 revenue at 70% margins.",
            "Scaled delivery capacity 50% by mentoring a team of 8 and standardizing workflows.",
        ],
        skills: ["STRATEGY", "ANALYTICS", "LEADERSHIP"],
    },
    {
        role: "Software Engineering Intern (AI)",
        company: "Compusoft Advisors",
        duration: "MAY 2024 — JUL 2024",
        place: "Mumbai",
        arcana: "THE HIEROPHANT",
        points: [
            "Cut manual data entry 50% with an LLM-enabled dealer-management workflow used by 20+ sales managers.",
            "Improved ROI tracking 25% with orchestration pipelines in Copilot Studio.",
        ],
        skills: ["POWER APPS", "COPILOT STUDIO", "AUTOMATION"],
    },
    {
        role: "Pro-Bono Consultant",
        company: "Bruce Smolen Books",
        duration: "OCT 2025 — DEC 2025",
        place: "Remote",
        arcana: "THE HERMIT",
        points: [
            "Built feasibility and profitability models from Amazon KDP benchmarks, plus pricing scenarios and launch workflows.",
        ],
        skills: ["PRICING MODELS", "STRATEGY"],
    },
];

// --------------------------------------------------------------- off-duty

export const offDuty = [
    {
        stat: "LOYALTY",
        rank: "UNWAVERING",
        title: "Culé for Life",
        body: "FC Barcelona, through every era. Visca el Barça.",
        accent: "blue",
    },
    {
        stat: "CONVICTION",
        rank: "ABSOLUTE",
        title: "La Roja × La Albiceleste",
        body: "Spain and Argentina. Messi is the GOAT, and that is not up for debate.",
        accent: "yellow",
    },
    {
        stat: "GUTS",
        rank: "DAUNTLESS",
        title: "E-Conquest MVP",
        body: "MVP at E-Conquest, USC's esports showdown with UCLA. We smashed them.",
        accent: "red",
    },
    {
        stat: "CHARM",
        rank: "DEBONAIR",
        title: "Behind the Decks",
        body: "DJing when the laptop closes.",
        accent: "purple",
    },
    {
        stat: "PROFICIENCY",
        rank: "TRANSCENDENT",
        title: "Head Chef",
        body: "Cooking: the one optimization problem you get to eat.",
        accent: "red",
    },
];
