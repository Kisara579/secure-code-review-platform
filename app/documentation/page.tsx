import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";

export default function DocumentationPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100">
      <div className="mx-auto max-w-4xl">
        {/* Navigation & Header */}
        <header className="mb-12 border-b border-slate-800/80 pb-8">
          <Link
            href="/"
            className="group mb-6 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-cyan-400"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Home
          </Link>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Documentation
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-400 sm:text-lg">
            AI-Powered Automated Secure Code Review, Technical Debt Management,
            and SOC Threat Intelligence Platform for DevSecOps Teams
          </p>
        </header>

        {/* Table of Contents */}
        <nav className="mb-12 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">
            Table of Contents
          </h2>

          <div className="grid gap-x-8 gap-y-1 sm:grid-cols-2">
            {[
              {
                href: "#project-overview",
                label: "1. Project Overview & Identity",
              },
              { href: "#problem", label: "2. Problem Statement" },
              {
                href: "#project-goals",
                label: "3. Project Goals & Objectives",
              },
              { href: "#core-features", label: "4. Core System Features" },
              { href: "#system-architecture", label: "5. System Architecture" },
              {
                href: "#dual-pipelines",
                label: "6. Dual Automation Pipelines",
              },
              {
                href: "#technology-stack",
                label: "7. Complete Technology Stack",
              },
              {
                href: "#free-tier-cloud",
                label: "8. Free-Tier Cloud Ecosystem ($0)",
              },
              { href: "#how-it-works", label: "9. How SecureReview AI Works" },
              { href: "#analysis-pipeline", label: "10. Analysis Pipeline" },
              {
                href: "#security-analysis",
                label: "11. Security Analysis (SAST)",
              },
              {
                href: "#dependency-analysis",
                label: "12. Dependency Analysis (CVEs)",
              },
              { href: "#technical-debt", label: "13. Technical Debt Engine" },
              {
                href: "#finding-normalization",
                label: "14. Finding Normalization",
              },
              {
                href: "#finding-schema",
                label: "15. Normalized Finding Schema",
              },
              {
                href: "#deterministic-vs-ai",
                label: "16. Deterministic vs AI Principle",
              },
              { href: "#ai-assistance", label: "17. AI Assistance (Gemini)" },
              {
                href: "#scoring-metrics",
                label: "18. Scoring & Health Metrics",
              },
              {
                href: "#scoring-formulas",
                label: "19. Mathematical Scoring Formulas",
              },
              {
                href: "#quality-gates",
                label: "20. Configurable Quality Gates",
              },
              {
                href: "#gate-configuration",
                label: "21. Quality Gate Configuration",
              },
              { href: "#dashboard", label: "22. Web Dashboard & Analytics" },
              {
                href: "#database-architecture",
                label: "23. Database & Prisma Schema",
              },
              {
                href: "#project-structure",
                label: "24. Monorepo Project Structure",
              },
              { href: "#roadmap", label: "25. 21-Phase Development Roadmap" },
              { href: "#docker-cicd", label: "26. Docker & CI/CD Pipelines" },
              {
                href: "#environment-variables",
                label: "27. Master Environment Variables",
              },
              {
                href: "#security-privacy",
                label: "28. Security & Privacy Hardening",
              },
              { href: "#testing", label: "29. Comprehensive Testing Strategy" },
              {
                href: "#academic-thesis",
                label: "30. Academic Research & Thesis Guide",
              },
              {
                href: "#future-improvements",
                label: "31. CyberMind SOC Extensions",
              },
              {
                href: "#project-scope",
                label: "32. Project Scope (Core vs Optional)",
              },
              { href: "#out-of-scope", label: "33. Explicitly Out-of-Scope" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block py-1 text-sm text-slate-400 transition-colors hover:text-cyan-400"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        {/* 1. Project Overview */}
        <section id="project-overview" className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            1. Project Overview &amp; Identity
          </h2>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
            <p className="leading-7 text-slate-300">
              <strong className="text-white">Full Formal Project Title:</strong>{" "}
              AI-Powered Automated Secure Code Review and Technical Debt
              Management Platform for DevSecOps Teams
            </p>
            <p className="leading-7 text-slate-300">
              <strong className="text-white">Product System Names:</strong>{" "}
              <span className="text-cyan-400 font-semibold">
                SecureReview AI
              </span>{" "}
              (Core DevSecOps Platform &amp; Vulnerability &amp; SOC Workbench
              Extension)
            </p>
            <p className="leading-7 text-slate-400">
              <strong className="text-white">
                One-Sentence Definitive Mission:
              </strong>{" "}
              A full-stack DevSecOps and cybersecurity platform that
              automatically analyzes GitHub/GitLab Pull Requests for security
              vulnerabilities, code-quality flaws, and technical debt, uses
              Google Gemini AI to explain and prioritize findings and generate
              remediation patches, provides executive dashboards and
              configurable quality gates, automates containerized deployments
              via Docker and GitHub Actions CI/CD to GHCR, and extends into a
              centralized SOC intelligence workbench featuring CVE intelligence,
              MITRE ATT&amp;CK mapping, Nmap/Nessus/Syslog ingestion, and
              audit-ready PDF pentest report generation.
            </p>
          </div>
        </section>

        {/* 2. Problem Statement */}
        <section id="problem" className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            2. Problem Statement
          </h2>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="leading-8 text-slate-400">
              Manual code reviews and security assessments are time-consuming,
              inconsistent, and difficult to scale across fast-paced development
              teams. Development teams routinely overlook vulnerable
              dependencies, insecure coding patterns (OWASP Top 10), and
              accumulated technical debt during rapid release cycles. Existing
              commercial AppSec tools are expensive, complex to configure,
              produce alert fatigue, and lack actionable remediation diffs.
              Furthermore, code security findings are rarely correlated with
              operational infrastructure telemetry (open ports, host CVEs,
              authentication logs).
            </p>
          </div>
        </section>

        {/* 3. Project Goals */}
        <section id="project-goals" className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            3. Project Goals &amp; Objectives
          </h2>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <ul className="space-y-4 text-slate-400">
              <li>
                <span className="font-medium text-slate-200">
                  Automate Deterministic Secure Code Review:
                </span>
                <span className="block mt-1">
                  Inspect source code using AST and static rules to detect OWASP
                  Top 10 vulnerabilities and hardcoded secrets with 100%
                  reproducible results and zero hallucination.
                </span>
              </li>

              <li>
                <span className="font-medium text-slate-200">
                  Identify Dependency Vulnerabilities (CVEs):
                </span>
                <span className="block mt-1">
                  Query live OSV and NVD REST API 2.0 databases to detect known
                  vulnerabilities in third-party packages, mapping them to CVSS
                  scores and remediation versions.
                </span>
              </li>

              <li>
                <span className="font-medium text-slate-200">
                  Quantify and Prioritize Technical Debt:
                </span>
                <span className="block mt-1">
                  Measure code smells, cyclomatic complexity, and duplication in
                  estimated remediation hours, and rank debt using an
                  impact-to-effort Refactor-First algorithm.
                </span>
              </li>

              <li>
                <span className="font-medium text-slate-200">
                  Provide Generative AI Interpretation &amp; Patch Synthesis:
                </span>
                <span className="block mt-1">
                  Use Google Gemini AI to translate technical CWE/CVE findings
                  into plain English, explain exploit scenarios, and generate
                  secure Git diff replacement patches.
                </span>
              </li>

              <li>
                <span className="font-medium text-slate-200">
                  Enforce Quality Gates &amp; In-PR Feedback:
                </span>
                <span className="block mt-1">
                  Block unsafe code from merging using configurable quality gate
                  thresholds, automated in-PR Markdown comments, and GitHub
                  commit status checks.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* 4. Core Features */}
        <section id="core-features" className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            4. Core System Features
          </h2>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <ul className="space-y-3 text-slate-400">
              <li>
                • Automated secure code review for GitHub and GitLab Pull
                Requests
              </li>
              <li>
                • Deterministic OWASP Top 10 vulnerability scanner (SQLi, XSS,
                Cmd Injection, etc.)
              </li>
              <li>
                • High-entropy secret and credential leak detector (AWS, GitHub
                tokens, private keys)
              </li>
              <li>
                • Dependency vulnerability analysis via OSV and NVD REST API 2.0
              </li>
              <li>
                • Technical debt quantification in remediation hours with
                hotspot mapping
              </li>
              <li>
                • Algorithmic Repository Health Scoring Engine (explainable
                formula 0–100)
              </li>
              <li>
                • Configurable quality gates (PASS/FAIL) with GitHub commit
                status checks
              </li>
              <li>
                • Automated in-PR Markdown review comments with actionable
                findings
              </li>
              <li>
                • Google Gemini AI plain-English risk explanations and automated
                Git diff patches
              </li>
              <li>
                • Interactive Next.js 16 Web Dashboard with Recharts visual
                analytics
              </li>
              <li>
                • Multi-tenant RBAC authentication (Auth.js v5 + Supabase
                PostgreSQL)
              </li>
              <li>
                • Docker multi-container orchestration and GitHub Actions CI/CD
                to GHCR
              </li>
              <li>
                • CyberMind SOC workbench: NVD CVE search, Nmap/Nessus/Syslog
                parsers, and PDF reports
              </li>
            </ul>
          </div>
        </section>

        {/* 5. System Architecture */}
        <section id="system-architecture" className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            5. System Architecture
          </h2>

          <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
            <Image
              src="/document/system-architecture.svg"
              alt="SecureReview AI system architecture"
              className="mx-auto w-full max-w-5xl"
              width={32}
              height={32}
            />
          </div>

          <p className="mt-4 leading-7 text-slate-400">
            SecureReview AI receives source code from a repository or pull
            request and processes it through the analysis engine. Security,
            dependency, and technical debt analyses are performed before the
            findings are normalized and passed to the AI assistance layer. The
            resulting findings and insights are presented through the dashboard.
          </p>
        </section>

        {/* 6. Dual Automation Pipelines */}
        <section id="dual-pipelines" className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            6. Dual Automation Pipelines Architecture
          </h2>

          <p className="mb-6 leading-8 text-slate-400">
            A central architectural innovation of SecureReview AI is the clean
            separation and synchronization of two distinct automation
            lifecycles:
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                Pipeline 1
              </span>
              <h3 className="mt-1 mb-2 font-semibold text-white">
                Application PR Analysis Pipeline
              </h3>
              <p className="text-sm leading-6 text-slate-400 mb-3">
                Analyzes code written by the user&apos;s development team:
              </p>
              <ul className="space-y-2 text-xs leading-5 text-slate-400">
                <li>1. Developer opens or updates PR on GitHub/GitLab</li>
                <li>
                  2. Webhook received with HMAC SHA-256 signature verification
                </li>
                <li>3. Job enqueued to Redis BullMQ task queue</li>
                <li>4. Sandboxed isolated worker performs shallow Git clone</li>
                <li>5. SAST, secret, dependency, and complexity scans run</li>
                <li>6. Findings normalized into common schema</li>
                <li>
                  7. Health &amp; debt scores calculated; quality gates
                  evaluated
                </li>
                <li>
                  8. Gemini AI generates explanations &amp; Git diff patches
                </li>
                <li>9. Results persisted to PostgreSQL via Prisma ORM</li>
                <li>
                  10. In-PR review comment &amp; commit status check posted
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Pipeline 2
              </span>
              <h3 className="mt-1 mb-2 font-semibold text-white">
                Software Delivery CI/CD Pipeline
              </h3>
              <p className="text-sm leading-6 text-slate-400 mb-3">
                Builds, tests, packages, and deploys the platform itself:
              </p>
              <ul className="space-y-2 text-xs leading-5 text-slate-400">
                <li>1. Platform developer pushes feature branch</li>
                <li>
                  2. GitHub Actions CI checks out repository &amp; dependencies
                </li>
                <li>
                  3. Linters (ESLint) &amp; TypeScript type check executed
                </li>
                <li>4. Unit &amp; integration tests run with coverage</li>
                <li>5. Security audit scan (npm audit, Semgrep) executed</li>
                <li>6. Multi-stage Docker images built (web, worker)</li>
                <li>7. Merge to main triggers CD pipeline</li>
                <li>
                  8. Images tagged with Git SHA &amp; latest, pushed to GHCR
                </li>
                <li>9. Database migrations deployed (prisma migrate deploy)</li>
                <li>
                  10. Deployment smoke test &amp; /api/health check executed
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 7. Technology Stack */}
        <section id="technology-stack" className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            7. Complete Technology Stack Reference
          </h2>

          <p className="mb-6 leading-8 text-slate-400">
            SecureReview AI uses a modern full-stack TypeScript ecosystem with
            separate components for the frontend, backend services, analysis
            workers, data storage, security scanning, and AI-assisted
            processing.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Frontend Framework",
                description:
                  "Next.js 16 (App Router), TypeScript v5 (Strict Mode), and Tailwind CSS v4 provide the dashboard, documentation, and user interface.",
              },
              {
                title: "Backend & APIs",
                description:
                  "Next.js API Route Handlers and serverless functions handle repository processing, webhook validation, and quality gates.",
              },
              {
                title: "Database & ORM",
                description:
                  "PostgreSQL (Supabase) with Prisma ORM v5/v6 for multi-tenant persistence of organizations, repositories, PRs, findings, and metrics.",
              },
              {
                title: "Queue & Cache",
                description:
                  "Redis (Upstash / local) with BullMQ for asynchronous PR analysis jobs, rate limiting, and API response caching.",
              },
              {
                title: "Authentication",
                description:
                  "Auth.js (NextAuth v5) with GitHub & GitLab OAuth 2.0, JWT secure cookies, and multi-tenant RBAC authorization guards.",
              },
              {
                title: "Security Analysis (SAST)",
                description:
                  "Semgrep CLI and custom AST/regex rules for deterministic OWASP Top 10 detection and Shannon-entropy secret scanning.",
              },
              {
                title: "Dependency Scanning",
                description:
                  "OSV API and NVD REST API 2.0 for identifying known CVEs in third-party package manifests (package.json, requirements.txt).",
              },
              {
                title: "AI Engine",
                description:
                  "Google Gemini API (@google/genai Flash 1.5/2.0) for plain-English explanations, attack scenarios, and Git diff patch generation.",
              },
              {
                title: "Data Visualization",
                description:
                  "Recharts SVG charts for severity donuts, technical debt trend lines, and repository health gauges.",
              },
              {
                title: "Report Generation",
                description:
                  "@react-pdf/renderer for server-side generation of audit-ready penetration test and security assessment PDF reports.",
              },
              {
                title: "Containerization",
                description:
                  "Docker multi-stage OCI images and Docker Compose for unified local orchestration of web, worker, postgres, and redis.",
              },
              {
                title: "CI/CD & Registry",
                description:
                  "GitHub Actions automated workflows and GitHub Container Registry (GHCR) with immutable Git SHA tags.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-5"
              >
                <h3 className="mb-2 font-semibold text-white">{item.title}</h3>
                <p className="text-sm leading-6 text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Free-Tier Cloud Ecosystem */}
        <section id="free-tier-cloud" className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            8. Free-Tier Cloud Ecosystem ($0 Budget)
          </h2>

          <p className="mb-6 leading-8 text-slate-400">
            The entire platform is designed to be built, tested, hosted, and
            operated with zero hosting cost ($0.00) by leveraging
            industry-standard developer free tiers:
          </p>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 text-left">
                  <th className="px-4 py-3 font-semibold text-white">
                    Provider
                  </th>
                  <th className="px-4 py-3 font-semibold text-white">
                    Free Tier Allowance
                  </th>
                  <th className="px-4 py-3 font-semibold text-white">
                    Project Allocation &amp; Role
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-400">
                {[
                  {
                    provider: "Supabase",
                    tier: "2 Projects, 500MB PostgreSQL, 1GB Storage",
                    role: "Primary relational DB (Prisma ORM) & storage bucket for raw scan uploads (.xml, .nessus, .log)",
                  },
                  {
                    provider: "Vercel",
                    tier: "Hobby Tier (Unlimited Deploys, SSL, CDN)",
                    role: "Hosting Next.js 16 frontend, API routes, edge middleware & serverless functions",
                  },
                  {
                    provider: "Upstash",
                    tier: "10,000 commands/day free",
                    role: "Serverless Redis instance for rate limiting (@upstash/ratelimit) and caching",
                  },
                  {
                    provider: "Google AI Studio",
                    tier: "Free Tier (Gemini Flash 1.5/2.0)",
                    role: "Generative AI engine for vulnerability explanations, executive summaries & Git diff patches",
                  },
                  {
                    provider: "GitHub Actions",
                    tier: "2,000 free build minutes/month",
                    role: "Automated CI/CD execution pipeline (test, lint, Docker build, deploy trigger)",
                  },
                  {
                    provider: "GHCR",
                    tier: "Free public & private container storage",
                    role: "OCI Docker image registry storing versioned application container images",
                  },
                  {
                    provider: "NVD & CISA APIs",
                    tier: "100% Free Public REST APIs",
                    role: "Live vulnerability search, CVSS metrics, and CVE catalog intelligence",
                  },
                ].map((row) => (
                  <tr
                    key={row.provider}
                    className="border-b border-slate-800/50"
                  >
                    <td className="px-4 py-3 font-medium text-slate-200">
                      {row.provider}
                    </td>
                    <td className="px-4 py-3">{row.tier}</td>
                    <td className="px-4 py-3">{row.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 9. How SecureReview AI Works */}
        <section id="how-it-works" className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            9. How SecureReview AI Works
          </h2>

          <p className="mb-6 leading-8 text-slate-400">
            SecureReview AI follows an automated analysis workflow that
            processes source code, dependencies, and code-quality information
            before presenting the results to the development team:
          </p>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <ol className="space-y-5">
              {[
                {
                  step: "1. Repository or Pull Request Submission",
                  desc: "A developer connects a repository or opens a pull request on GitHub or GitLab.",
                },
                {
                  step: "2. Analysis Run Creation",
                  desc: "The platform creates an AnalysisRun record in QUEUED status and enqueues the job.",
                },
                {
                  step: "3. Security Analysis",
                  desc: "Static analysis tools inspect the changed source code for security vulnerabilities and insecure coding patterns.",
                },
                {
                  step: "4. Dependency Analysis",
                  desc: "Project manifest files are examined against OSV and NVD to identify known third-party CVEs.",
                },
                {
                  step: "5. Technical Debt Analysis",
                  desc: "Code smells, cyclomatic complexity, and duplication are measured to quantify technical debt hours.",
                },
                {
                  step: "6. Finding Normalization",
                  desc: "Results from all scanners are converted into the unified NormalizedFinding schema.",
                },
                {
                  step: "7. AI-Assisted Analysis",
                  desc: "Google Gemini AI generates plain-language explanations, exploit scenarios, and Git diff remediation patches.",
                },
                {
                  step: "8. Quality Gate Evaluation",
                  desc: "Analysis results and debt deltas are evaluated against configured quality gate thresholds.",
                },
                {
                  step: "9. Dashboard Results & PR Feedback",
                  desc: "Findings are displayed on the dashboard, posted as in-PR review comments, and reported as commit status checks.",
                },
              ].map((item) => (
                <li key={item.step}>
                  <h3 className="font-semibold text-white">{item.step}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    {item.desc}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 10. Analysis Pipeline */}
        <section id="analysis-pipeline" className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            10. Analysis Pipeline
          </h2>

          <p className="mb-6 leading-8 text-slate-400">
            The analysis pipeline processes repository and pull request changes
            through 10 isolated, automated stages:
          </p>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <ol className="space-y-5">
              {[
                {
                  step: "1. Webhook Ingestion",
                  desc: "A pull_request event triggers the /api/webhooks/github endpoint with payload and signature headers.",
                },
                {
                  step: "2. HMAC SHA-256 Signature Verification",
                  desc: "The request is validated using crypto.timingSafeEqual against the repository webhook secret to reject unauthorized or tampered requests.",
                },
                {
                  step: "3. Job Queuing",
                  desc: "The verified PR metadata is pushed to the pr-analysis BullMQ Redis queue, isolating long-running scans from the API.",
                },
                {
                  step: "4. Sandboxed Analysis Worker",
                  desc: "An unprivileged worker (non-root uid: 1001) performs a shallow Git clone of only changed files into an ephemeral /tmp/scans/{id} directory.",
                },
                {
                  step: "5. Automated Multi-Engine Scanning",
                  desc: "SAST (OWASP Top 10), secret scanning, dependency CVE lookup, cyclomatic complexity parser, and Rabin-Karp duplication tokenizer execute in parallel.",
                },
                {
                  step: "6. Finding Normalization",
                  desc: "All findings are mapped into the strict NormalizedFinding interface with unique IDs, line ranges, and metadata.",
                },
                {
                  step: "7. Health & Debt Scoring",
                  desc: "The mathematical scoring engine computes Security (S), Quality (Q), Debt (D), Maintainability (M), Complexity (C), and overall Health Scores.",
                },
                {
                  step: "8. Gemini AI Synthesis",
                  desc: "Findings are passed inside isolated XML prompt boundaries to Gemini to produce plain-English explanations and unified Git diff patches.",
                },
                {
                  step: "9. Relational Persistence",
                  desc: "Prisma ORM persists the AnalysisRun, Finding, TechnicalDebtItem, MetricSnapshot, and AIAnalysis records in PostgreSQL.",
                },
                {
                  step: "10. Developer Feedback & Status Checks",
                  desc: "A Markdown review comment is posted to the PR, and a GitHub commit status check (state: failure/success) is set for the gate result.",
                },
              ].map((item) => (
                <li key={item.step}>
                  <h3 className="font-semibold text-white">{item.step}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    {item.desc}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 11. Security Analysis */}
        <section id="security-analysis" className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            11. Security Analysis (SAST &amp; Secret Scanning)
          </h2>

          <p className="mb-6 leading-8 text-slate-400">
            SecureReview AI performs deterministic static security analysis to
            identify vulnerabilities and insecure coding patterns within
            application source code. Every finding is authoritative and 100%
            reproducible:
          </p>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 mb-4">
            <h3 className="mb-3 font-semibold text-white">
              OWASP Top 10 Detection Rules
            </h3>
            <ul className="space-y-4 text-slate-400">
              {[
                {
                  title: "SQL Injection (CWE-89)",
                  desc: "Detects raw string concatenation or template literals in database query methods such as execute(), query(), and findRaw().",
                },
                {
                  title: "Cross-Site Scripting / XSS (CWE-79)",
                  desc: "Detects dangerous DOM injection via dangerouslySetInnerHTML, innerHTML, document.write, and unsanitized template interpolation.",
                },
                {
                  title: "Command Injection (CWE-78)",
                  desc: "Detects unescaped command execution through child_process.exec, os.system, and subprocess.Popen with shell=True.",
                },
                {
                  title: "Path Traversal (CWE-22)",
                  desc: "Detects unvalidated file path concatenation with user input in file system operations (path.join with untrusted inputs).",
                },
                {
                  title: "Weak Cryptography (CWE-327)",
                  desc: "Detects obsolete algorithms including MD5, SHA1, DES, and static hardcoded initialization vectors (IVs).",
                },
                {
                  title: "Insecure Deserialization (CWE-502)",
                  desc: "Detects unsafe object unpickling via pickle.loads and yaml.load with unsafe Loader.",
                },
              ].map((item) => (
                <li key={item.title}>
                  <span className="font-medium text-slate-200">
                    {item.title}
                  </span>
                  <span className="block mt-1">{item.desc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <h3 className="mb-3 font-semibold text-white">
              High-Entropy Secret Detection
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                • AWS Access Keys:{" "}
                <code className="text-cyan-400">
                  AKIA[0-9A-Z]&#123;16&#125;
                </code>
              </li>
              <li>
                • GitHub Personal Access Tokens:{" "}
                <code className="text-cyan-400">
                  ghp_[0-9a-zA-Z]&#123;36&#125;
                </code>
              </li>
              <li>
                • Private Cryptographic Keys:{" "}
                <code className="text-cyan-400">
                  -----BEGIN (RSA|EC|OPENSSH) PRIVATE KEY-----
                </code>
              </li>
              <li>
                • Shannon Entropy string analysis on variables named password,
                secret, token, or apiKey
              </li>
            </ul>
          </div>
        </section>

        {/* 12. Dependency Analysis */}
        <section id="dependency-analysis" className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            12. Dependency Analysis (CVEs)
          </h2>

          <p className="mb-6 leading-8 text-slate-400">
            SecureReview AI inspects package manifest files to detect known
            vulnerabilities in third-party libraries using public databases:
          </p>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <ul className="space-y-4 text-slate-400">
              {[
                {
                  title: "Manifest Parsing",
                  desc: "Extracts package names and exact version ranges from package.json, requirements.txt, and lockfiles.",
                },
                {
                  title: "Vulnerability Database Lookup",
                  desc: "Queries the Open Source Vulnerabilities (OSV) API and NVD REST API 2.0 for matching CVE identifiers.",
                },
                {
                  title: "CVSS Severity Classification",
                  desc: "Maps vulnerabilities to CVSS v3.1/v4.0 base scores and severity levels (CRITICAL, HIGH, MEDIUM, LOW).",
                },
                {
                  title: "Remediation Guidance",
                  desc: "Recommends minimum non-vulnerable upgrade versions and displays direct links to vendor security advisories.",
                },
              ].map((item) => (
                <li key={item.title}>
                  <span className="font-medium text-slate-200">
                    {item.title}
                  </span>
                  <span className="block mt-1">{item.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 13. Technical Debt Analysis */}
        <section id="technical-debt" className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            13. Technical Debt Engine
          </h2>

          <p className="mb-6 leading-8 text-slate-400">
            The platform quantifies technical debt in estimated remediation
            hours and prioritizes issues to maximize refactoring impact:
          </p>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 mb-4">
            <ul className="space-y-4 text-slate-400">
              {[
                {
                  title: "Cyclomatic Complexity Engine",
                  desc: "Parses source code into AST and computes CC = 1 + Count(if, for, while, case, catch, &&, ||, ?:). Functions with CC > 15 are flagged as medium hotspots, and CC > 25 as high.",
                },
                {
                  title: "AST Duplication Tokenizer",
                  desc: "Tokenizes code blocks, strips comments and whitespace, and detects duplicate fragments of ≥10 lines using a rolling hash (Rabin-Karp).",
                },
                {
                  title: "Code Smell Detection",
                  desc: "Identifies Long Methods (>60 lines), God Classes (>500 lines or >20 methods), Excessive Parameters (>5 args), and tracks unresolved TODO/FIXME markers.",
                },
              ].map((item) => (
                <li key={item.title}>
                  <span className="font-medium text-slate-200">
                    {item.title}
                  </span>
                  <span className="block mt-1">{item.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 14. Finding Normalization */}
        <section id="finding-normalization" className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            14. Finding Normalization
          </h2>

          <p className="mb-6 leading-8 text-slate-400">
            All analysis engines (SAST, secrets, dependencies, quality,
            complexity, and CyberMind parsers) output findings mapped to a
            single unified data contract.
          </p>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <ul className="space-y-4 text-slate-400">
              {[
                {
                  title: "Uniform Severity Spectrum",
                  desc: "All findings are assigned one of: CRITICAL, HIGH, MEDIUM, LOW, INFO.",
                },
                {
                  title: "Category Classification",
                  desc: "Findings belong to: SECURITY_VULNERABILITY, SECRET_LEAK, DEPENDENCY_CVE, CODE_SMELL, COMPLEXITY_HOTSPOT, DUPLICATION, or MAINTAINABILITY.",
                },
                {
                  title: "Deterministic Integrity Flag",
                  desc: "Every scanner finding is flagged isDeterministic: true, ensuring clear separation from AI-generated interpretations.",
                },
              ].map((item) => (
                <li key={item.title}>
                  <span className="font-medium text-slate-200">
                    {item.title}
                  </span>
                  <span className="block mt-1">{item.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 15. Normalized Finding Schema */}
        <section id="finding-schema" className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            15. Normalized Finding Schema
          </h2>

          <p className="mb-6 leading-8 text-slate-400">
            Every finding produced conforms to this strict TypeScript interface:
          </p>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <pre className="text-sm leading-7 text-slate-300">
              {`type SeverityLevel = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "INFO";

type FindingCategory =
  | "SECURITY_VULNERABILITY"
  | "SECRET_LEAK"
  | "DEPENDENCY_CVE"
  | "CODE_SMELL"
  | "COMPLEXITY_HOTSPOT"
  | "DUPLICATION"
  | "MAINTAINABILITY";

interface NormalizedFinding {
  id: string;                         // UUID / CUID
  analysisRunId: string;
  category: FindingCategory;
  ruleId: string;                     // e.g. "owasp-sqli-01", "entropy-jwt-secret"
  title: string;                      // Concise summary e.g. "SQL Injection in User Query"
  severity: SeverityLevel;
  filePath: string;                   // Relative path e.g. "src/controllers/auth.ts"
  startLine: number;
  endLine: number;
  codeSnippet?: string;               // Matching snippet from AST
  description: string;                // Authoritative technical explanation
  mitreTechniqueId?: string;          // e.g. "T1190", "T1059", "T1110"
  cveId?: string;                     // e.g. "CVE-2023-38606"
  cvssScore?: number;                 // Base score 0.0 - 10.0
  isDeterministic: boolean;           // Always true for scanner outputs
  aiExplanation?: string;             // Plain-English translation from Gemini
  remediationDiff?: string;           // Unified Git diff patch generated by Gemini
}`}
            </pre>
          </div>
        </section>

        {/* 16. Deterministic vs AI Principle */}
        <section id="deterministic-vs-ai" className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            16. The Core Principle: Deterministic Detection vs. AI Assistance
          </h2>

          <p className="mb-6 leading-8 text-slate-400">
            A foundational requirement for both enterprise DevSecOps credibility
            and academic research defense is maintaining a strict boundary
            between deterministic code analysis and probabilistic generative AI:
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                Authoritative Engine
              </span>
              <h3 className="mt-1 mb-2 font-semibold text-white">
                Deterministic Code Analysis
              </h3>
              <p className="text-sm leading-6 text-slate-400 mb-3">
                <strong>Role: Authoritative Detection of What Exists</strong>
              </p>
              <ul className="space-y-2 text-xs leading-5 text-slate-400">
                <li>• Semgrep AST rules &amp; regex security scanners</li>
                <li>
                  • Static cyclomatic &amp; cognitive complexity calculators
                </li>
                <li>• Rabin-Karp AST code duplication detection</li>
                <li>• High-entropy secret and credential scanners</li>
                <li>
                  • <strong>Never hallucinates findings</strong>
                </li>
                <li>
                  • Guarantees 100% reproducible line numbers, rule IDs, and
                  severities
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                Generative AI Layer
              </span>
              <h3 className="mt-1 mb-2 font-semibold text-white">
                Google Gemini AI Enhancement
              </h3>
              <p className="text-sm leading-6 text-slate-400 mb-3">
                <strong>
                  Role: Interpretation, Education &amp; Remediation
                </strong>
              </p>
              <ul className="space-y-2 text-xs leading-5 text-slate-400">
                <li>• Translates complex CWE / CVE data into plain English</li>
                <li>
                  • Contextualizes exploitability against the application
                  framework
                </li>
                <li>
                  • Prioritizes which bugs to fix first based on threat posture
                </li>
                <li>• Generates secure Git diff replacement patches</li>
                <li>• Synthesizes executive summaries for managers</li>
                <li>
                  •{" "}
                  <strong>
                    Never invents security findings out of thin air
                  </strong>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 17. AI Assistance */}
        <section id="ai-assistance" className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            17. AI Assistance (Google Gemini API)
          </h2>

          <p className="mb-6 leading-8 text-slate-400">
            SecureReview AI utilizes the Google Gemini API (@google/genai Flash
            1.5/2.0) under Google AI Studio&apos;s free tier. The AI engine
            receives structured prompts with isolated XML delimiters to ensure
            security and focus:
          </p>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <ul className="space-y-4 text-slate-400">
              {[
                {
                  title: "Plain-English Vulnerability Explanations",
                  desc: "Translates technical CWE descriptions into clear explanations of why the code is vulnerable, how an attacker could exploit it, and step-by-step mitigation.",
                },
                {
                  title: "Automated Git Diff Patch Synthesis",
                  desc: "Generates unified diff blocks (```diff ... ```) that resolve the security issue while preserving the original functional logic.",
                },
                {
                  title: "PR Executive Summaries",
                  desc: "Condenses the PR's entire risk profile into a 3-bullet executive summary for engineering leads and managers.",
                },
                {
                  title: "Streaming Security Consultation Chat",
                  desc: "Interactive RAG-enabled chat assistant (/chat) allowing developers to ask targeted remediation questions about their repository findings.",
                },
              ].map((item) => (
                <li key={item.title}>
                  <span className="font-medium text-slate-200">
                    {item.title}
                  </span>
                  <span className="block mt-1">{item.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 18. Scoring Metrics */}
        <section id="scoring-metrics" className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            18. Scoring &amp; Health Metrics
          </h2>

          <p className="mb-6 leading-8 text-slate-400">
            SecureReview AI computes deterministic, explainable, and
            reproducible scores bounded between 0.0 and 100.0:
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Security Score (S) — Weight: 30%",
                desc: "Base of 100, penalized by active vulnerabilities (Critical: -25, High: -10, Medium: -4, Low: -1).",
              },
              {
                title: "Code Quality Score (Q) — Weight: 25%",
                desc: "Penalized based on code smell density per thousand lines of code (KLOC).",
              },
              {
                title: "Technical Debt Score (D) — Weight: 20%",
                desc: "Inverted ratio of estimated remediation hours to total codebase development effort.",
              },
              {
                title: "Maintainability Score (M) — Weight: 15%",
                desc: "Derived from the Halstead and Cyclomatic Maintainability Index (MI).",
              },
              {
                title: "Complexity Score (C) — Weight: 10%",
                desc: "Deducts points when average function cyclomatic complexity exceeds standard thresholds.",
              },
              {
                title: "Overall Repository Health Score",
                desc: "Weighted composite score: Health = (S×0.30) + (Q×0.25) + (D×0.20) + (M×0.15) + (C×0.10).",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-5"
              >
                <h3 className="mb-2 font-semibold text-white">{item.title}</h3>
                <p className="text-sm leading-6 text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 19. Scoring Formulas */}
        <section id="scoring-formulas" className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            19. Mathematical Scoring Formulas &amp; Algorithms
          </h2>

          <p className="mb-6 leading-8 text-slate-400">
            Every score is mathematically grounded rather than generated
            arbitrarily:
          </p>

          <div className="space-y-4">
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60 p-6">
              <h3 className="mb-2 font-semibold text-white">
                1. Unified Repository Health Score Model
              </h3>
              <pre className="text-sm leading-7 text-cyan-400">
                {`Health Score = (S × 0.30) + (Q × 0.25) + (D × 0.20) + (M × 0.15) + (C × 0.10)

Where:
  S = max(0, 100 - (N_critical × 25 + N_high × 10 + N_medium × 4 + N_low × 1))
  Q = max(0, 100 - ((Total_Smells / KLOC) × 15))
  D = max(0, 100 × (1 - (Remediation_Hours / (0.05 × Total_Lines_of_Code))))
  M = max(0, 171 - 5.2 × ln(V) - 0.23 × CC - 16.2 × ln(LOC)) × (100 / 171)
  C = 100 if CC_avg <= 5; 100 - (CC_avg - 5) × 5 if 5 < CC_avg <= 20; 25 if CC_avg > 20`}
              </pre>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60 p-6">
              <h3 className="mb-2 font-semibold text-white">
                2. Technical Debt Quantification (Remediation Hours)
              </h3>
              <pre className="text-sm leading-7 text-cyan-400">
                {`T_remed = Σ(Smell_i × H_smell) + (N_dup_blocks × 1.5) + (N_complex_funcs × 2.0) + (N_todos × 0.5)

Standard Labor Effort Estimates:
  Critical Security finding:  4.0 hours (Weight: 10.0)
  High Security finding:      2.5 hours (Weight: 7.0)
  Architectural Debt:         8.0 – 16.0 hours (Weight: 8.0)
  Complex function (CC > 20): 2.0 hours (Weight: 5.0)
  Duplicated code block:      1.5 hours (Weight: 4.0)
  Code Smell (Long method):   1.0 hour  (Weight: 3.0)
  Unresolved TODO/FIXME:      0.5 hours (Weight: 2.0)`}
              </pre>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60 p-6">
              <h3 className="mb-2 font-semibold text-white">
                3. The &quot;Refactor First&quot; Priority Algorithm
              </h3>
              <pre className="text-sm leading-7 text-cyan-400">
                {`Priority Rank = (Severity_Impact × File_Churn_Rate) / Estimated_Remediation_Effort_Hours`}
              </pre>
              <p className="mt-3 text-sm text-slate-400">
                Ranks all debt items by their impact-to-effort ratio. Files with
                frequent commits (high churn) and severe issues get surfaced to
                the top of the developer refactoring queue.
              </p>
            </div>
          </div>
        </section>

        {/* 20. Quality Gates */}
        <section id="quality-gates" className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            20. Configurable Quality &amp; Security Gates
          </h2>

          <p className="mb-6 leading-8 text-slate-400">
            Quality gates evaluate PR changes against configurable policy
            thresholds. A single violation triggers a FAILED gate, blocking the
            PR:
          </p>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <ul className="space-y-4 text-slate-400">
              {[
                {
                  title: "Security Gate Thresholds",
                  desc: "Block on any new Critical vulnerability. Configurable tolerance for High (default: 0) and Medium (default: 3) findings.",
                },
                {
                  title: "Technical Debt Delta Gate",
                  desc: "Reject PRs where debt increase exceeds the allowed delta (default: max +2.0 hours increase per PR).",
                },
                {
                  title: "Minimum Health Score Gate",
                  desc: "Enforce a repository health floor (e.g. Health Score must remain ≥ 75.0 / 100).",
                },
                {
                  title: "Automated PR Feedback",
                  desc: "Gate status is communicated via GitHub commit status checks (state: failure/success) and detailed in-PR Markdown review comments.",
                },
              ].map((item) => (
                <li key={item.title}>
                  <span className="font-medium text-slate-200">
                    {item.title}
                  </span>
                  <span className="block mt-1">{item.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 21. Quality Gate Configuration */}
        <section id="gate-configuration" className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            21. Quality Gate Configuration Schema
          </h2>

          <p className="mb-6 leading-8 text-slate-400">
            Policy configuration (secure-review.config.json or database JSON):
          </p>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <pre className="text-sm leading-7 text-slate-300">
              {`{
  "$schema": "https://securereview.dev/schemas/config.v1.json",
  "version": "1.0",
  "qualityGate": {
    "enabled": true,
    "blockOnCriticalSecurity": true,
    "maxAllowedHighSecurity": 0,
    "maxAllowedMediumSecurity": 3,
    "maxAllowedLowSecurity": 10,
    "maxAllowedTechnicalDebtIncreaseHours": 2.0,
    "minAllowableOverallHealthScore": 75.0,
    "minAllowableSecurityScore": 80.0,
    "maxAllowableDuplicationPercent": 3.0,
    "maxFunctionComplexity": 20
  },
  "notifications": {
    "prComment": true,
    "commitStatusCheck": true,
    "failBuildOnGateFailure": true
  },
  "scanners": {
    "sast": true,
    "secrets": true,
    "dependencies": true,
    "codeQuality": true,
    "technicalDebt": true
  },
  "aiAssistance": {
    "generateExplanations": true,
    "generateRemediationDiffs": true,
    "model": "gemini-1.5-flash"
  }
}`}
            </pre>
          </div>

          <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <h3 className="mb-2 font-semibold text-white">
              Evaluation Outcome Rules
            </h3>
            <pre className="text-sm leading-7 text-slate-400">
              {`IF (New_Critical_Findings > 0)             → GATE REJECTED (Status: FAILED)
IF (New_High_Findings > Policy.Max)        → GATE REJECTED (Status: FAILED)
IF (Debt_Delta_Hours > Policy.MaxDebtDelta)→ GATE REJECTED (Status: FAILED)
IF (Final_Health_Score < Policy.MinHealth) → GATE REJECTED (Status: FAILED)
ELSE                                       → GATE APPROVED (Status: PASSED)`}
            </pre>
          </div>
        </section>

        {/* 22. Dashboard */}
        <section id="dashboard" className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            22. Web Dashboard &amp; Analytics
          </h2>

          <p className="mb-6 leading-8 text-slate-400">
            The Next.js 16 Web Dashboard provides executive overviews, detailed
            PR inspection drawers, and Recharts analytics:
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Severity Donut Chart",
                desc: "Interactive breakdown of Critical, High, Medium, and Low vulnerabilities across repositories.",
              },
              {
                title: "Technical Debt Trend Chart",
                desc: "Historical 30-day timeline tracking remediation hours and debt regressions over time.",
              },
              {
                title: "File-Tree Hotspot Visualizer",
                desc: "Hierarchical visual tree color-coding files by risk (Green: Clean, Yellow: Moderate, Red: Critical).",
              },
              {
                title: "Detailed PR Analysis Drawer",
                desc: "Side-by-side view with line-numbered vulnerable code, AST evidence, and Gemini Git diff patches.",
              },
              {
                title: "Top Vulnerable Repositories",
                desc: "Comparative bar charts ranking projects by vulnerability density and technical debt hours.",
              },
              {
                title: "Quality Gate Banner",
                desc: "Prominent PASSED/FAILED indicator with individual rule checks and one-click report export.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-5"
              >
                <h3 className="mb-2 font-semibold text-white">{item.title}</h3>
                <p className="text-sm leading-6 text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 23. Database Architecture */}
        <section id="database-architecture" className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            23. Database Architecture &amp; Prisma Schema
          </h2>

          <p className="mb-6 leading-8 text-slate-400">
            The relational schema implements a multi-tenant, tenant-isolated
            architecture supporting 12 models in PostgreSQL (Supabase) via
            Prisma:
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                model: "User",
                desc: "User accounts, email, avatar, GitHub/GitLab OAuth IDs",
              },
              {
                model: "Organization",
                desc: "Tenants with unique slug and team memberships",
              },
              {
                model: "TeamMember",
                desc: "User-organization junction with RBAC (OWNER, ADMIN, DEV, VIEWER)",
              },
              {
                model: "Repository",
                desc: "Connected repos, clone URLs, webhook secrets, gate config",
              },
              {
                model: "PullRequest",
                desc: "PR number, title, author, source/target branches, commit SHA",
              },
              {
                model: "AnalysisRun",
                desc: "Scoring results, gateStatus, debt hours total & delta, timestamps",
              },
              {
                model: "Finding",
                desc: "Normalized findings, line ranges, snippet, ruleId, MITRE/CVE tags, diff",
              },
              {
                model: "TechnicalDebtItem",
                desc: "Debt category, effort hours, priority weight, file path",
              },
              {
                model: "MetricSnapshot",
                desc: "LOC, cyclomaticAvg, duplicationPct, smellDensity, severity counts",
              },
              {
                model: "AIAnalysis",
                desc: "Executive summary, risk factors JSON, suggestedAction, token usage",
              },
              {
                model: "ScanReport",
                desc: "Uploaded Nmap XML, Nessus v2, Syslog parsed payloads & stats",
              },
              {
                model: "ChatSession / Message",
                desc: "Multi-session AI security consultation chat history",
              },
            ].map((item) => (
              <div
                key={item.model}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-4"
              >
                <h3 className="mb-1 text-sm font-semibold text-cyan-400">
                  {item.model}
                </h3>
                <p className="text-xs leading-5 text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <h3 className="mb-2 font-semibold text-white">
              Tenant Isolation Proof
            </h3>
            <p className="text-sm leading-6 text-slate-400">
              Strict isolation is enforced through the{" "}
              <code className="text-cyan-400">
                Organization → Repository → PullRequest → AnalysisRun
              </code>{" "}
              ownership chain. All API routes and queries use a tenant guard
              middleware: queries include{" "}
              <code className="text-cyan-400">
                where: &#123; organizationId: session.orgId &#125;
              </code>{" "}
              to guarantee zero cross-tenant data leakage.
            </p>
          </div>
        </section>

        {/* 24. Project Structure */}
        <section id="project-structure" className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            24. Monorepo Project Structure
          </h2>

          <p className="mb-6 leading-8 text-slate-400">
            The monorepo cleanly decouples the web application, analysis
            workers, and shared calculation packages:
          </p>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <pre className="text-sm leading-7 text-slate-300">
              {`secure-code-review-platform/
├── apps/
│   ├── web/                          # Next.js 16 App Router Frontend & Server Actions
│   │   ├── app/                      # App router directory
│   │   │   ├── (auth)/               # Auth routes (login, register)
│   │   │   ├── (dashboard)/          # Dashboard routes (repos, prs, cves, scans, chat)
│   │   │   ├── documentation/        # Full-page documentation
│   │   │   └── api/                  # API endpoints (webhooks, ai/chat, cve, reports)
│   │   ├── components/               # UI components, charts, diff viewer, layout
│   │   ├── lib/                      # Client/server utils, auth, parsers (Nmap, Nessus, Syslog)
│   │   └── public/                   # Static assets, branding, architecture diagrams
│   └── api/                          # Optional standalone microservice
│
├── services/
│   ├── analysis-worker/              # BullMQ queue consumer & sandboxed Git clone runner
│   ├── security-scanner/             # SAST & high-entropy secret detection rules
│   ├── quality-engine/               # Cyclomatic complexity, duplication, code smells
│   ├── debt-engine/                  # Technical debt calculator & Refactor-First sorter
│   └── ai-service/                   # Google Gemini AI wrapper, prompts & diff synthesizer
│
├── packages/
│   ├── shared-types/                 # NormalizedFinding, GateStatus, PRPayload contracts
│   └── scoring/                      # Health score formulas, Quality gate evaluator, MITRE map
│
├── docker/                           # web.Dockerfile, worker.Dockerfile, compose.yml
├── .github/workflows/                # ci.yml (test/build) & cd.yml (GHCR publish/deploy)
├── prisma/                           # Master schema.prisma & seed.ts
├── tests/                            # Unit, integration, security & benchmark test suites
└── package.json                      # Workspace configuration (npm/pnpm workspaces)`}
            </pre>
          </div>
        </section>

        {/* 25. Development Roadmap */}
        <section id="roadmap" className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            25. 21-Phase End-to-End Implementation Blueprint
          </h2>

          <p className="mb-6 leading-8 text-slate-400">
            The project follows a rigorous 21-phase implementation lifecycle
            grouped into three master phases:
          </p>

          <div className="space-y-3">
            {[
              {
                phase: "Phase 1",
                title: "Project Setup, Monorepo Architecture & Modern UI Shell",
              },
              {
                phase: "Phase 2",
                title:
                  "Database Layer, Prisma Schema & Multi-Tenant Auth (Auth.js v5)",
              },
              {
                phase: "Phase 3",
                title:
                  "Repository & Webhook Integration Pipeline (GitHub & GitLab HMAC)",
              },
              {
                phase: "Phase 4",
                title:
                  "Asynchronous Analysis Queue & Sandboxed Analysis Worker (BullMQ)",
              },
              {
                phase: "Phase 5",
                title:
                  "Deterministic SAST Security Scanner & High-Entropy Secret Detection",
              },
              {
                phase: "Phase 6",
                title:
                  "Code Quality, Cyclomatic Complexity & AST Duplication Engine",
              },
              {
                phase: "Phase 7",
                title:
                  "Technical Debt Engine & Refactor-First Hotspot Visualizer",
              },
              {
                phase: "Phase 8",
                title:
                  "Repository Health Scoring Engine & Automated PR Reviews/Gates",
              },
              {
                phase: "Phase 9",
                title:
                  "Google Gemini AI Integration (Explanation & Auto-Patch Diff Generator)",
              },
              {
                phase: "Phase 10",
                title:
                  "Interactive DevSecOps Web Dashboard & Recharts Visualizations",
              },
              {
                phase: "Phase 11",
                title:
                  "Containerization & Docker Multi-Service Orchestration (Compose)",
              },
              {
                phase: "Phase 12",
                title:
                  "Automated CI/CD Pipelines (GitHub Actions & GHCR Publishing)",
              },
              {
                phase: "Phase 13",
                title:
                  "CyberMind Module A — CVE Intelligence Engine (NVD API & CVSS Calculator)",
              },
              {
                phase: "Phase 14",
                title:
                  "CyberMind Module B — MITRE ATT&CK Threat Mapping Engine",
              },
              {
                phase: "Phase 15",
                title:
                  "CyberMind Module C — Multi-Source Scan & Log Parsers (Nmap, Nessus, Syslog)",
              },
              {
                phase: "Phase 16",
                title:
                  "CyberMind Module D — Unified SOC Incident Workspace & Historical Archive",
              },
              {
                phase: "Phase 17",
                title:
                  "CyberMind Module E — Automated Audit-Ready PDF Security Report Generator",
              },
              {
                phase: "Phase 18",
                title:
                  "Enterprise Security Hardening, Rate Limiting & Platform Defense",
              },
              {
                phase: "Phase 19",
                title:
                  "Comprehensive Testing & Verification Strategy (Unit, Integration, Security)",
              },
              {
                phase: "Phase 20",
                title:
                  "Academic Research, Scientific Evaluation & 23-Chapter Thesis Guide",
              },
              {
                phase: "Phase 21",
                title:
                  "Production Cloud Deployment, Portfolio Showcase & Launch",
              },
            ].map((item) => (
              <div
                key={item.phase}
                className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/60 px-4 py-3"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                  {item.phase}
                </span>
                <span className="text-sm font-medium text-slate-200 text-right">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 26. Docker & CI/CD */}
        <section id="docker-cicd" className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            26. Docker &amp; CI/CD Pipelines
          </h2>

          <p className="mb-6 leading-8 text-slate-400">
            Containerization and continuous delivery ensure reproducible builds
            and zero-downtime releases:
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Multi-Stage Dockerfiles",
                description:
                  "web.Dockerfile uses Node.js Alpine deps/builder/runner stages with non-root user (nextjs:1001). worker.Dockerfile includes Git & Python runtimes.",
              },
              {
                title: "Docker Compose Orchestration",
                description:
                  "docker/compose.yml provisions postgres:16-alpine, redis:7-alpine, web (port 3000), and worker containers with persistent volumes.",
              },
              {
                title: "GitHub Actions CI Pipeline",
                description:
                  "Runs on every PR to main/develop: linting (ESLint), type checking, unit tests, security audit (npm audit), and Docker image build dry-runs.",
              },
              {
                title: "GHCR Publishing & CD",
                description:
                  "On merge to main: tags images with Git commit SHA and 'latest', pushes to ghcr.io, executes prisma migrate deploy, and runs /api/health check.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-5"
              >
                <h3 className="mb-2 font-semibold text-white">{item.title}</h3>
                <p className="text-sm leading-6 text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 27. Environment Variables */}
        <section id="environment-variables" className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            27. Master Environment Variables Reference
          </h2>

          <p className="mb-6 leading-8 text-slate-400">
            Required configuration across all services (all compatible with free
            tiers):
          </p>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <pre className="text-sm leading-7 text-slate-300">
              {`# --- APPLICATION CORE ---
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# --- SUPABASE / POSTGRESQL (FREE TIER) ---
DATABASE_URL="postgresql://postgres.[ref]:[pw]@...pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[ref]:[pw]@...pooler.supabase.com:5432/postgres"

# --- REDIS (UPSTASH / LOCAL DOCKER) ---
REDIS_URL="redis://localhost:6379"
UPSTASH_REDIS_REST_URL="https://...upstash.io"
UPSTASH_REDIS_REST_TOKEN="AXXX..."

# --- GOOGLE GEMINI AI (GOOGLE AI STUDIO FREE TIER) ---
GEMINI_API_KEY="AIzaSy..."
GEMINI_MODEL="gemini-1.5-flash"

# --- GITHUB OAUTH & WEBHOOK INTEGRATION ---
GITHUB_ID="your_github_oauth_app_client_id"
GITHUB_SECRET="your_github_oauth_app_client_secret"
GITHUB_WEBHOOK_SECRET="your_shared_webhook_signing_secret"

# --- NATIONAL VULNERABILITY DATABASE (OPTIONAL) ---
NVD_API_KEY="" # Optional for higher rate limits

# --- CONTAINER REGISTRY (CI/CD) ---
DOCKER_REGISTRY="ghcr.io"
IMAGE_NAME="your-username/secure-code-review-platform"`}
            </pre>
          </div>
        </section>

        {/* 28. Security & Privacy Considerations */}
        <section id="security-privacy" className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            28. Enterprise Security Hardening &amp; Platform Defense
          </h2>

          <p className="mb-6 leading-8 text-slate-400">
            Security controls applied to protect the platform itself from
            untrusted repository input and malicious actors:
          </p>

          <div className="space-y-4">
            {[
              {
                title: "Cryptographic Webhook Signature Verification",
                description:
                  "All webhook events require HMAC SHA-256 signatures validated using crypto.timingSafeEqual to prevent signature forging and replay attacks.",
              },
              {
                title: "Sandboxed Worker Isolation",
                description:
                  "Workers run as unprivileged users (uid: 1001) in ephemeral directories (/tmp/scans/{id}) with hard execution timeouts (max 180s) and automatic cleanup.",
              },
              {
                title: "Adversarial Prompt Injection Defense",
                description:
                  "All user source code passed to Gemini is sanitized and enclosed in isolated XML boundaries (<code_to_analyze>) to neutralize prompt injection attacks.",
              },
              {
                title: "API Rate Limiting",
                description:
                  "Enforced via @upstash/ratelimit token bucket algorithm: 100 req/min for public webhook APIs and 10 req/min for Gemini AI generation endpoints.",
              },
              {
                title: "Secure HTTP Headers & Secret Masking",
                description:
                  "Content Security Policy (CSP), HSTS, X-Frame-Options (DENY), nosniff headers, and zero logging of tokens, database passwords, or AI keys.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-5"
              >
                <h3 className="mb-2 font-semibold text-white">{item.title}</h3>
                <p className="text-sm leading-6 text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 29. Comprehensive Testing Strategy */}
        <section id="testing" className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            29. Comprehensive Testing &amp; Verification Strategy
          </h2>

          <p className="mb-6 leading-8 text-slate-400">
            Multi-tier testing architecture verifying all application layers:
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Unit Testing (Vitest / Jest)",
                description:
                  "Testing Health Score calculation edge cases (0 score for 5 criticals, 100 for clean code), debt remediation formulas, and Nmap/Nessus XML parsers.",
              },
              {
                title: "Integration Testing",
                description:
                  "Simulating GitHub PR webhooks, verifying database persistence, and running the analysis worker pipeline against mock vulnerable repositories.",
              },
              {
                title: "Security & Isolation Testing",
                description:
                  "Tenant isolation verification (ensuring Org A gets HTTP 403 when requesting Org B resources) and HMAC signature forgery tests.",
              },
              {
                title: "AI Output & Hallucination Testing",
                description:
                  "Evaluating 50 known vulnerable snippets through Gemini to verify AI never hallucinates vulnerabilities absent from deterministic inputs.",
              },
              {
                title: "Performance Benchmarking",
                description:
                  "Worker throughput benchmarks: 10,000 LOC repository PR analysis must execute under 30 seconds total elapsed time.",
              },
              {
                title: "End-to-End Workflow Testing",
                description:
                  "Full PR lifecycle verification: PR open → webhook → BullMQ → scan → scoring → Gemini patch → GitHub comment & status check.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-5"
              >
                <h3 className="mb-2 font-semibold text-white">{item.title}</h3>
                <p className="text-sm leading-6 text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 30. Academic Research & Thesis Guide */}
        <section id="academic-thesis" className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            30. Academic Research, Scientific Evaluation &amp; Thesis Guide
          </h2>

          <p className="mb-6 leading-8 text-slate-400">
            For academic defense, the project incorporates formal scientific
            evaluation metrics and a 23-chapter research dissertation blueprint:
          </p>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 mb-4">
            <h3 className="mb-2 font-semibold text-white">
              Scientific Detection Benchmarking Formulas
            </h3>
            <p className="text-sm text-slate-400 mb-3">
              Evaluated against OWASP Benchmark v1.2, DVWA, and OWASP Juice
              Shop:
            </p>
            <pre className="text-sm leading-7 text-cyan-400">
              {`Precision = TP / (TP + FP)
Recall    = TP / (TP + FN)
F1 Score  = 2 × (Precision × Recall) / (Precision + Recall)`}
            </pre>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <h3 className="mb-3 font-semibold text-white">
              23-Chapter Academic Dissertation Structure
            </h3>
            <div className="grid gap-x-6 gap-y-1 text-xs text-slate-400 sm:grid-cols-2">
              {[
                "Ch 1: Introduction & Problem Domain",
                "Ch 2: Background & Industry Context",
                "Ch 3: Problem Statement & DevSecOps Pain Points",
                "Ch 4: Research Gap in Code Review Tools",
                "Ch 5: Aim and Specific Research Objectives",
                "Ch 6: Literature Review (SAST, Debt, GenAI)",
                "Ch 7: Comprehensive Requirements Analysis",
                "Ch 8: System Architecture & Dual Pipelines",
                "Ch 9: Relational Database Design & Schema",
                "Ch 10: REST API & Webhook Ingestion Design",
                "Ch 11: Security Architecture (STRIDE)",
                "Ch 12: Deterministic Code Analysis Engine",
                "Ch 13: Technical Debt Engine Implementation",
                "Ch 14: Generative AI Component & Prompts",
                "Ch 15: Full-Stack Implementation Details",
                "Ch 16: Verification & Testing Methodology",
                "Ch 17: Security Evaluation & Isolation Proofs",
                "Ch 18: Performance & Scalability Benchmarking",
                "Ch 19: Experimental Results & Benchmarks",
                "Ch 20: Critical Discussion & Comparisons",
                "Ch 21: Limitations & Known Constraints",
                "Ch 22: Future Improvements & CyberMind SOC",
                "Ch 23: Conclusion & Research Contributions",
              ].map((chapter) => (
                <div key={chapter} className="py-1">
                  • {chapter}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 31. Future Improvements (CyberMind SOC Extensions) */}
        <section id="future-improvements" className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            31. CyberMind Advanced SOC Workbench Extensions
          </h2>

          <p className="mb-6 leading-8 text-slate-400">
            Modular value-add enhancements extending the core DevSecOps platform
            into a full SOC threat intelligence workbench:
          </p>

          <div className="space-y-4">
            {[
              {
                title: "Module A: CVE Intelligence & CVSS Calculator (/cves)",
                description:
                  "Live NVD REST API 2.0 vulnerability search, interactive CVSS v3.1/v4.0 vector calculator, 24-hour Redis caching, and Gemini AI plain-English threat explanations.",
              },
              {
                title: "Module B: MITRE ATT&CK Threat Mapping Engine",
                description:
                  "Automatic tagging of findings with ATT&CK techniques: T1190 (Exploit Public-Facing App) ← SQLi, T1059.004 (Unix Shell) ← Command Injection, T1110.001 (Password Guessing) ← SSH brute force, T1552.001 (Credentials in Files) ← Secrets, T1548.003 (Sudo Caching) ← Priv-Esc.",
              },
              {
                title: "Module C: Multi-Source Scan & Log Parsers (/scans)",
                description:
                  "Parsers for Nmap XML (open ports, services, OS fingerprints), Nessus v2 reports (plugin IDs, CVE references, host vulnerabilities), Linux Syslog/auth.log (SSH brute force detection, sudo abuse), and PCAP metadata flow summaries.",
              },
              {
                title:
                  "Module D: Unified SOC Incident Workspace (/scans/history)",
                description:
                  "Correlates code-level findings with network port scans and auth logs into a unified incident timeline and searchable historical scan archive.",
              },
              {
                title: "Module E: Audit-Ready PDF Penetration Testing Reports",
                description:
                  "One-click PDF generation via @react-pdf/renderer with executive summary, severity matrix, technical evidence, and prioritized remediation roadmap.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-5"
              >
                <h3 className="mb-2 font-semibold text-white">{item.title}</h3>
                <p className="text-sm leading-6 text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 32. Project Scope */}
        <section id="project-scope" className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            32. Project Scope: Core vs. Extension
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-5">
              <h3 className="mb-3 font-semibold text-cyan-400">
                Phase A: Core PID 4 System (Must Complete First)
              </h3>

              <ul className="space-y-2 text-sm leading-6 text-slate-400">
                <li>• Next.js 16 Full-Stack Monorepo Architecture</li>
                <li>• Multi-Tenant Auth &amp; RBAC (Auth.js v5 + Supabase)</li>
                <li>• GitHub/GitLab OAuth &amp; HMAC Verified Webhooks</li>
                <li>• Asynchronous Analysis Queue (Redis BullMQ)</li>
                <li>• Deterministic SAST &amp; Secret Detection</li>
                <li>• Code Quality, Complexity &amp; Duplication Engine</li>
                <li>
                  • Technical Debt Quantification &amp; Refactor-First Queue
                </li>
                <li>• Algorithmic Repository Health Scoring Engine</li>
                <li>
                  • Automated In-PR Review Comments &amp; Commit Status Checks
                </li>
                <li>• Configurable Security &amp; Quality Gates (PASS/FAIL)</li>
                <li>• Gemini AI Explanations &amp; Git Diff Patches</li>
                <li>• Interactive Web Dashboard with Recharts Analytics</li>
              </ul>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <h3 className="mb-3 font-semibold text-white">
                Phase C: CyberMind SOC Extensions (Modular Enhancements)
              </h3>

              <ul className="space-y-2 text-sm leading-6 text-slate-400">
                <li>• Live CVE Search &amp; NVD 2.0 REST API Integration</li>
                <li>• Interactive CVSS v3.1 / v4.0 Calculator</li>
                <li>• MITRE ATT&amp;CK Framework Mapping Engine</li>
                <li>
                  • Security Tool Cheatsheet &amp; Command Generator (/tools)
                </li>
                <li>• Multi-Format Scan Parsers (Nmap XML, Nessus)</li>
                <li>• Linux Syslog &amp; auth.log Anomaly Analyzer</li>
                <li>• Network Packet / PCAP Flow Summary Parser (Lite)</li>
                <li>• Unified SOC Incident Workspace &amp; Scan Archive</li>
                <li>• Automated Audit-Ready PDF Pentest Report Generator</li>
                <li>• ML PR Risk Predictor (Optional Research Component)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 33. Out of Scope */}
        <section id="out-of-scope" className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            33. Explicitly Out-of-Scope (What NOT to Build)
          </h2>

          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6">
            <p className="mb-4 text-sm text-slate-400">
              To guarantee academic defensibility, prevent scope creep, and
              ensure 100% on-time completion, the following features are
              intentionally <strong className="text-red-400">excluded</strong>:
            </p>

            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <strong className="text-slate-200">
                  • No Full Raw PCAP Packet Sniffer / Deep Packet Inspection:
                </strong>{" "}
                Only exported text/JSON metadata flow summaries are accepted.
              </li>
              <li>
                <strong className="text-slate-200">
                  • No Full Commercial SIEM Replacement:
                </strong>{" "}
                The platform correlates project-specific security findings, not
                petabytes of enterprise telemetry.
              </li>
              <li>
                <strong className="text-slate-200">
                  • No Autonomous Penetration Exploitation:
                </strong>{" "}
                The platform detects and remediates weaknesses; it never
                executes active payloads or exploits against targets.
              </li>
              <li>
                <strong className="text-slate-200">
                  • No Mandatory IDE / VS Code Extensions:
                </strong>{" "}
                All developer interactions occur through Git PR comments,
                webhooks, and the Web Dashboard.
              </li>
              <li>
                <strong className="text-slate-200">
                  • No Video Conferencing / Chat Rooms:
                </strong>{" "}
                Collaboration is strictly through code comments, PR gates, and
                the SOC workbench.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
