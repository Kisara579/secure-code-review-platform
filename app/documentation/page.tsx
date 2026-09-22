export default function DocumentationPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <header className="mb-12 border-b border-slate-800 pb-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-cyan-400">
            SecureReview AI
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Documentation
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
            AI-Powered Automated Secure Code Review and Technical Debt
            Management Platform for DevSecOps Teams
          </p>
        </header>

        {/* Project Title */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Project Title
          </h2>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="leading-7 text-slate-300">
              AI-Powered Automated Secure Code Review and Technical Debt
              Management Platform for DevSecOps Teams
            </p>
          </div>
        </section>

        {/* Project Overview */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Project Overview
          </h2>

          <p className="leading-8 text-slate-400">
            SecureReview AI is a DevSecOps-oriented platform designed to
            automate secure code review, vulnerability detection, dependency
            analysis, and technical debt identification. The platform analyzes
            software repositories and presents security and code-quality
            findings through a centralized dashboard.
          </p>
        </section>

        {/* Problem */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">Problem</h2>

          <p className="leading-8 text-slate-400">
            Manual code reviews and security assessments can be time-consuming,
            inconsistent, and difficult to scale. Development teams may also
            overlook vulnerable dependencies, insecure coding patterns, and
            accumulated technical debt during rapid software development.
          </p>
        </section>

        {/* Project Goals */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Project Goals
          </h2>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <ul className="space-y-4 text-slate-400">
              <li>
                <span className="font-medium text-slate-200">
                  Automate secure code review
                </span>
                <span className="block mt-1">
                  Automatically analyze source code to identify common security
                  vulnerabilities and insecure coding patterns.
                </span>
              </li>

              <li>
                <span className="font-medium text-slate-200">
                  Identify dependency vulnerabilities
                </span>
                <span className="block mt-1">
                  Detect known security vulnerabilities in third-party
                  dependencies used by software projects.
                </span>
              </li>

              <li>
                <span className="font-medium text-slate-200">
                  Manage technical debt
                </span>
                <span className="block mt-1">
                  Identify code-quality issues and technical debt that may
                  affect maintainability and long-term development.
                </span>
              </li>

              <li>
                <span className="font-medium text-slate-200">
                  Provide AI-assisted analysis
                </span>
                <span className="block mt-1">
                  Use AI to explain detected issues and provide useful
                  remediation guidance for developers.
                </span>
              </li>

              <li>
                <span className="font-medium text-slate-200">
                  Support DevSecOps workflows
                </span>
                <span className="block mt-1">
                  Integrate security and code-quality analysis into the software
                  development lifecycle.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Core Features */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Core Features
          </h2>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <ul className="space-y-3 text-slate-400">
              <li>• Automated secure code review</li>
              <li>• Security vulnerability detection</li>
              <li>• Dependency vulnerability analysis</li>
              <li>• Technical debt identification</li>
              <li>• Repository and pull request analysis</li>
              <li>• Security findings dashboard</li>
              <li>• AI-assisted vulnerability explanation and remediation</li>
              <li>• Security and code-quality metrics</li>
            </ul>
          </div>
        </section>

        {/* System Architecture */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            System Architecture
          </h2>

          <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
            <img
              src="/document/system-architecture.svg"
              alt="SecureReview AI system architecture"
              className="mx-auto w-full max-w-5xl"
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

        {/* Technology Stack */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Technology Stack
          </h2>

          <p className="mb-6 leading-8 text-slate-400">
            SecureReview AI uses a modern web application stack with separate
            components for the frontend, backend services, analysis workers,
            data storage, security analysis, and AI-assisted processing.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <h3 className="mb-2 font-semibold text-white">Frontend</h3>
              <p className="text-sm leading-6 text-slate-400">
                Next.js, TypeScript, and Tailwind CSS are used to build the
                documentation, dashboard, and user interface.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <h3 className="mb-2 font-semibold text-white">Backend</h3>
              <p className="text-sm leading-6 text-slate-400">
                A server-side API handles repository processing, analysis
                orchestration, findings, quality gates, and application logic.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <h3 className="mb-2 font-semibold text-white">Database</h3>
              <p className="text-sm leading-6 text-slate-400">
                PostgreSQL is used to store projects, analysis runs, findings,
                metrics, and related application data.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <h3 className="mb-2 font-semibold text-white">
                Background Processing
              </h3>
              <p className="text-sm leading-6 text-slate-400">
                Background workers handle repository analysis and other
                time-consuming processing tasks without blocking the main API.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <h3 className="mb-2 font-semibold text-white">
                Security Analysis
              </h3>
              <p className="text-sm leading-6 text-slate-400">
                Semgrep and custom security rules are used for static analysis
                and detection of insecure coding patterns.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <h3 className="mb-2 font-semibold text-white">
                Dependency Analysis
              </h3>
              <p className="text-sm leading-6 text-slate-400">
                Vulnerability information from sources such as OSV and NVD is
                used to identify vulnerable third-party dependencies.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <h3 className="mb-2 font-semibold text-white">AI</h3>
              <p className="text-sm leading-6 text-slate-400">
                A Gemini or compatible AI API provides explanations and
                remediation guidance for selected findings.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <h3 className="mb-2 font-semibold text-white">Deployment</h3>
              <p className="text-sm leading-6 text-slate-400">
                Docker and CI/CD workflows are used to provide reproducible
                development, testing, and deployment environments.
              </p>
            </div>
          </div>
        </section>

        {/* How SecureReview AI Works */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            How SecureReview AI Works
          </h2>

          <p className="mb-6 leading-8 text-slate-400">
            SecureReview AI follows an automated analysis workflow that
            processes source code, dependencies, and code-quality information
            before presenting the results to the development team.
          </p>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <ol className="space-y-5">
              <li>
                <h3 className="font-semibold text-white">
                  1. Repository or Pull Request Submission
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  A developer provides a repository or submits a pull request
                  for automated analysis.
                </p>
              </li>

              <li>
                <h3 className="font-semibold text-white">
                  2. Analysis Run Creation
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  The platform creates an analysis run and prepares the source
                  code and project information for processing.
                </p>
              </li>

              <li>
                <h3 className="font-semibold text-white">
                  3. Security Analysis
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  Static analysis tools inspect the source code for security
                  vulnerabilities and insecure coding patterns.
                </p>
              </li>

              <li>
                <h3 className="font-semibold text-white">
                  4. Dependency Analysis
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  Project dependencies are examined against vulnerability
                  databases to identify known security issues in third-party
                  packages.
                </p>
              </li>

              <li>
                <h3 className="font-semibold text-white">
                  5. Technical Debt Analysis
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  Code-quality issues and maintainability problems are
                  identified and used to assess technical debt.
                </p>
              </li>

              <li>
                <h3 className="font-semibold text-white">
                  6. Finding Normalization
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  Results from different analysis tools are converted into a
                  consistent finding format so they can be stored and displayed
                  together.
                </p>
              </li>

              <li>
                <h3 className="font-semibold text-white">
                  7. AI-Assisted Analysis
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  AI can provide explanations, context, and remediation guidance
                  for selected security and code-quality findings.
                </p>
              </li>

              <li>
                <h3 className="font-semibold text-white">
                  8. Quality Gate Evaluation
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  The analysis results are evaluated against configured security
                  and quality conditions to determine whether the project
                  satisfies the required quality gate.
                </p>
              </li>

              <li>
                <h3 className="font-semibold text-white">
                  9. Dashboard Results
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  Findings, metrics, technical debt information, and quality
                  results are presented through the dashboard for developers and
                  DevSecOps teams.
                </p>
              </li>
            </ol>
          </div>
        </section>

        {/* Analysis Pipeline */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Analysis Pipeline
          </h2>

          <p className="mb-6 leading-8 text-slate-400">
            The analysis pipeline processes repository and pull request changes
            through a sequence of automated stages. Each stage has a specific
            responsibility, allowing security analysis, quality analysis,
            scoring, and AI assistance to operate as independent components.
          </p>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <ol className="space-y-5">
              <li>
                <h3 className="font-semibold text-white">
                  1. Webhook Ingestion
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  A repository event such as a new pull request or push triggers
                  the SecureReview AI webhook endpoint.
                </p>
              </li>

              <li>
                <h3 className="font-semibold text-white">
                  2. Signature Verification
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  The webhook request is verified before processing to ensure
                  that the event originated from the expected source.
                </p>
              </li>

              <li>
                <h3 className="font-semibold text-white">3. Job Queuing</h3>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  Valid analysis requests are placed into a background task
                  queue so that longer-running analysis does not block the main
                  API.
                </p>
              </li>

              <li>
                <h3 className="font-semibold text-white">
                  4. Isolated Analysis Worker
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  A worker retrieves the analysis job and prepares an isolated
                  environment for processing the repository or changed files.
                </p>
              </li>

              <li>
                <h3 className="font-semibold text-white">
                  5. Automated Analysis
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  Security scanning, dependency analysis, code-quality analysis,
                  and technical debt analysis are performed on the source code.
                </p>
              </li>

              <li>
                <h3 className="font-semibold text-white">
                  6. Finding Normalization
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  Results from the different analysis engines are converted into
                  a unified finding structure.
                </p>
              </li>

              <li>
                <h3 className="font-semibold text-white">
                  7. Scoring and Quality Evaluation
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  Findings are used to calculate security, quality, technical
                  debt, and overall health metrics. Quality gate conditions are
                  then evaluated.
                </p>
              </li>

              <li>
                <h3 className="font-semibold text-white">
                  8. AI-Assisted Processing
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  Selected findings can be passed to the AI engine for
                  plain-language explanations and remediation guidance.
                </p>
              </li>

              <li>
                <h3 className="font-semibold text-white">
                  9. Result Persistence
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  Analysis results, findings, metrics, and related information
                  are stored for later access through the application.
                </p>
              </li>

              <li>
                <h3 className="font-semibold text-white">
                  10. Developer Feedback
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  The completed analysis can be presented through the dashboard
                  and integrated into the pull request review workflow.
                </p>
              </li>
            </ol>
          </div>
        </section>

        {/* Security Analysis */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Security Analysis
          </h2>

          <p className="mb-6 leading-8 text-slate-400">
            SecureReview AI performs static security analysis to identify
            vulnerabilities and insecure coding patterns within application
            source code. The security analysis forms one of the main components
            of the automated code review pipeline.
          </p>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <ul className="space-y-4 text-slate-400">
              <li>
                <span className="font-medium text-slate-200">
                  Static Application Security Testing
                </span>
                <span className="block mt-1">
                  Source code is analyzed without executing the application to
                  identify potentially insecure coding patterns.
                </span>
              </li>

              <li>
                <span className="font-medium text-slate-200">
                  Semgrep Analysis
                </span>
                <span className="block mt-1">
                  Semgrep is used to detect security issues using predefined and
                  project-specific rules.
                </span>
              </li>

              <li>
                <span className="font-medium text-slate-200">
                  Custom Security Rules
                </span>
                <span className="block mt-1">
                  Custom rules can be added to detect security patterns that are
                  specific to the project or supported programming languages.
                </span>
              </li>

              <li>
                <span className="font-medium text-slate-200">
                  Finding Details
                </span>
                <span className="block mt-1">
                  Detected issues are converted into structured findings
                  containing information such as severity, location,
                  description, and remediation guidance.
                </span>
              </li>

              <li>
                <span className="font-medium text-slate-200">
                  Severity Classification
                </span>
                <span className="block mt-1">
                  Security findings are classified according to their severity
                  so that important issues can be identified and prioritized.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Dependency Analysis */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Dependency Analysis
          </h2>

          <p className="mb-6 leading-8 text-slate-400">
            SecureReview AI analyzes third-party dependencies used by a project
            and checks them against known vulnerability information. This helps
            identify security risks that may exist within external packages even
            when the application's own source code does not contain the
            vulnerability.
          </p>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <ul className="space-y-4 text-slate-400">
              <li>
                <span className="font-medium text-slate-200">
                  Dependency Detection
                </span>
                <span className="block mt-1">
                  Project manifest files are inspected to identify the packages
                  and versions used by the application.
                </span>
              </li>

              <li>
                <span className="font-medium text-slate-200">
                  Vulnerability Lookup
                </span>
                <span className="block mt-1">
                  Detected dependencies are checked against vulnerability
                  databases such as OSV and NVD.
                </span>
              </li>

              <li>
                <span className="font-medium text-slate-200">
                  Vulnerability Details
                </span>
                <span className="block mt-1">
                  Matching vulnerabilities can provide information such as
                  affected package versions, vulnerability identifiers,
                  severity, and available remediation information.
                </span>
              </li>

              <li>
                <span className="font-medium text-slate-200">
                  Risk Identification
                </span>
                <span className="block mt-1">
                  Vulnerable dependencies are converted into structured findings
                  so they can be combined with source-code security findings.
                </span>
              </li>

              <li>
                <span className="font-medium text-slate-200">
                  Remediation Guidance
                </span>
                <span className="block mt-1">
                  Developers can use the identified vulnerability information to
                  determine whether a dependency should be updated, replaced, or
                  otherwise addressed.
                </span>
              </li>
            </ul>
          </div>
        </section>
        {/* Technical Debt Analysis */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Technical Debt Analysis
          </h2>

          <p className="mb-6 leading-8 text-slate-400">
            SecureReview AI evaluates code-quality and maintainability issues
            that may increase technical debt over time. The analysis uses
            automated code-quality checks and complexity-related metrics to
            identify areas that may require refactoring or improvement.
          </p>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <ul className="space-y-4 text-slate-400">
              <li>
                <span className="font-medium text-slate-200">
                  Code Quality Analysis
                </span>
                <span className="block mt-1">
                  Source code is analyzed for common quality and maintainability
                  issues using automated code-quality rules.
                </span>
              </li>

              <li>
                <span className="font-medium text-slate-200">
                  Complexity Analysis
                </span>
                <span className="block mt-1">
                  Code complexity is evaluated to identify functions or
                  components that may be difficult to understand, maintain, or
                  modify.
                </span>
              </li>

              <li>
                <span className="font-medium text-slate-200">
                  Maintainability Issues
                </span>
                <span className="block mt-1">
                  Repeated patterns, overly complex code, and other
                  maintainability problems are identified as potential sources
                  of technical debt.
                </span>
              </li>

              <li>
                <span className="font-medium text-slate-200">
                  Technical Debt Findings
                </span>
                <span className="block mt-1">
                  Detected issues are converted into structured findings that
                  can be tracked together with security and dependency findings.
                </span>
              </li>

              <li>
                <span className="font-medium text-slate-200">
                  Remediation Guidance
                </span>
                <span className="block mt-1">
                  Developers can use the findings to identify areas where
                  refactoring or code-quality improvements may reduce future
                  maintenance effort.
                </span>
              </li>
            </ul>
          </div>
        </section>
        {/* Finding Normalization */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Finding Normalization
          </h2>

          <p className="mb-6 leading-8 text-slate-400">
            SecureReview AI combines findings from multiple analysis sources
            into a common structure. Normalization allows security, dependency,
            and technical debt findings to be processed consistently throughout
            the platform.
          </p>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <ul className="space-y-4 text-slate-400">
              <li>
                <span className="font-medium text-slate-200">
                  Common Finding Structure
                </span>
                <span className="block mt-1">
                  Results from different analysis tools are converted into a
                  consistent finding format.
                </span>
              </li>

              <li>
                <span className="font-medium text-slate-200">
                  Finding Classification
                </span>
                <span className="block mt-1">
                  Each finding contains information such as its category,
                  severity, source, and location within the analyzed project.
                </span>
              </li>

              <li>
                <span className="font-medium text-slate-200">
                  Source Tracking
                </span>
                <span className="block mt-1">
                  The platform keeps track of which analysis engine produced
                  each finding so that the original source can be identified.
                </span>
              </li>

              <li>
                <span className="font-medium text-slate-200">
                  Unified Processing
                </span>
                <span className="block mt-1">
                  Normalized findings can be stored, scored, displayed, and
                  processed by other components without requiring each component
                  to understand every scanner's original output format.
                </span>
              </li>

              <li>
                <span className="font-medium text-slate-200">
                  AI Integration
                </span>
                <span className="block mt-1">
                  The normalized structure also provides a consistent input
                  format for AI-assisted explanation and remediation workflows.
                </span>
              </li>
            </ul>
          </div>
        </section>
        {/* AI Assistance */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            AI Assistance
          </h2>

          <p className="mb-6 leading-8 text-slate-400">
            SecureReview AI uses artificial intelligence to help developers
            understand selected security and code-quality findings. The
            deterministic analysis tools remain responsible for detecting
            issues, while the AI layer focuses on explaining findings and
            providing remediation guidance.
          </p>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <ul className="space-y-4 text-slate-400">
              <li>
                <span className="font-medium text-slate-200">
                  Finding Explanation
                </span>
                <span className="block mt-1">
                  AI can explain a detected finding in clear, developer-friendly
                  language and describe why the issue matters.
                </span>
              </li>

              <li>
                <span className="font-medium text-slate-200">
                  Remediation Guidance
                </span>
                <span className="block mt-1">
                  AI can provide suggested approaches for fixing or reducing the
                  identified security or code-quality issue.
                </span>
              </li>

              <li>
                <span className="font-medium text-slate-200">
                  Context-Aware Assistance
                </span>
                <span className="block mt-1">
                  Relevant finding information and source-code context can be
                  provided to the AI so that its explanation is related to the
                  detected issue.
                </span>
              </li>

              <li>
                <span className="font-medium text-slate-200">
                  Structured Output
                </span>
                <span className="block mt-1">
                  AI responses are handled as structured application data so
                  they can be associated with the corresponding finding and
                  displayed through the platform.
                </span>
              </li>

              <li>
                <span className="font-medium text-slate-200">Human Review</span>
                <span className="block mt-1">
                  AI-generated explanations and recommendations are intended to
                  assist developers and should be reviewed before changes are
                  applied to production code.
                </span>
              </li>
            </ul>
          </div>
        </section>
        {/* Scoring & Health Metrics */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Scoring &amp; Health Metrics
          </h2>

          <p className="mb-6 leading-8 text-slate-400">
            SecureReview AI uses deterministic and explainable metrics to
            summarize the security, code quality, and technical debt of a
            repository. These metrics help developers understand the overall
            condition of a project and identify areas that require attention.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <h3 className="mb-2 font-semibold text-white">Security Score</h3>
              <p className="text-sm leading-6 text-slate-400">
                Represents the security condition of the repository based on
                detected security findings and their severity.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <h3 className="mb-2 font-semibold text-white">
                Code Quality Score
              </h3>
              <p className="text-sm leading-6 text-slate-400">
                Summarizes code-quality issues such as code smells, complexity,
                duplication, and maintainability problems.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <h3 className="mb-2 font-semibold text-white">
                Technical Debt Score
              </h3>
              <p className="text-sm leading-6 text-slate-400">
                Represents the estimated impact of accumulated code-quality and
                maintainability problems.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <h3 className="mb-2 font-semibold text-white">
                Repository Health Score
              </h3>
              <p className="text-sm leading-6 text-slate-400">
                Combines relevant security, quality, and technical-debt
                measurements into an overall repository health indicator.
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <h3 className="mb-3 font-semibold text-white">
              Explainable Scoring
            </h3>

            <p className="leading-7 text-slate-400">
              The scoring system uses documented formulas and defined weights so
              that developers can understand how a score was calculated. AI is
              not responsible for generating the underlying scores.
            </p>
          </div>
        </section>
        {/* Quality Gates */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Quality Gates
          </h2>

          <p className="mb-6 leading-8 text-slate-400">
            Quality gates allow SecureReview AI to evaluate analysis results
            against predefined security and code-quality conditions. They help
            determine whether a repository or pull request satisfies the
            required standards.
          </p>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <ul className="space-y-4 text-slate-400">
              <li>
                <span className="font-medium text-slate-200">
                  Security Conditions
                </span>
                <span className="block mt-1">
                  Quality gates can check for conditions such as unacceptable
                  security findings or high-severity vulnerabilities.
                </span>
              </li>

              <li>
                <span className="font-medium text-slate-200">
                  Code-Quality Conditions
                </span>
                <span className="block mt-1">
                  Code-quality and technical-debt measurements can be evaluated
                  against configured thresholds.
                </span>
              </li>

              <li>
                <span className="font-medium text-slate-200">
                  Pass or Fail Result
                </span>
                <span className="block mt-1">
                  The configured conditions produce a clear quality-gate result
                  that indicates whether the analyzed changes satisfy the
                  required standards.
                </span>
              </li>

              <li>
                <span className="font-medium text-slate-200">
                  Pull Request Integration
                </span>
                <span className="block mt-1">
                  Quality-gate results can be used as part of the pull request
                  review workflow to provide automated feedback before changes
                  are merged.
                </span>
              </li>

              <li>
                <span className="font-medium text-slate-200">
                  Configurable Thresholds
                </span>
                <span className="block mt-1">
                  Thresholds can be configured according to the requirements of
                  the project or development team.
                </span>
              </li>
            </ul>
          </div>
        </section>
        {/* Dashboard */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">Dashboard</h2>

          <p className="mb-6 leading-8 text-slate-400">
            The SecureReview AI dashboard provides a centralized view of
            repository security, code quality, technical debt, analysis history,
            and quality gate results. It allows developers and DevSecOps teams
            to understand detected issues and monitor improvements over time.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <h3 className="mb-2 font-semibold text-white">
                Security Findings
              </h3>
              <p className="text-sm leading-6 text-slate-400">
                Displays detected security vulnerabilities, their severity,
                locations, descriptions, and remediation information.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <h3 className="mb-2 font-semibold text-white">
                Dependency Findings
              </h3>
              <p className="text-sm leading-6 text-slate-400">
                Shows vulnerable third-party dependencies and relevant
                vulnerability information.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <h3 className="mb-2 font-semibold text-white">Technical Debt</h3>
              <p className="text-sm leading-6 text-slate-400">
                Presents technical debt measurements and identifies areas that
                may require refactoring or improvement.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <h3 className="mb-2 font-semibold text-white">Health Metrics</h3>
              <p className="text-sm leading-6 text-slate-400">
                Provides security, quality, technical-debt, and overall
                repository health metrics.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <h3 className="mb-2 font-semibold text-white">
                Analysis History
              </h3>
              <p className="text-sm leading-6 text-slate-400">
                Allows previous analysis runs to be reviewed and compared so
                that changes in project health can be monitored over time.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <h3 className="mb-2 font-semibold text-white">
                Quality Gate Status
              </h3>
              <p className="text-sm leading-6 text-slate-400">
                Clearly presents whether the analyzed repository or pull request
                passed or failed the configured quality conditions.
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <h3 className="mb-3 font-semibold text-white">
              AI-Assisted Findings
            </h3>

            <p className="leading-7 text-slate-400">
              When AI assistance is available for a finding, the dashboard can
              display its explanation and remediation guidance alongside the
              deterministic analysis results.
            </p>
          </div>
        </section>
        {/* Project Structure */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Project Structure
          </h2>

          <p className="mb-6 leading-8 text-slate-400">
            SecureReview AI is organized as a modular project so that the
            frontend, backend services, analysis workers, shared components, and
            configuration can be developed and maintained independently.
          </p>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <pre className="text-sm leading-7 text-slate-300">
              {`secure-code-review-platform/
│
├── apps/
│   ├── web/
│   │   ├── app/
│   │   ├── components/
│   │   └── lib/
│   │
│   ├── api/
│   │   ├── src/
│   │   └── prisma/
│   │
│   └── worker/
│       └── src/
│
├── packages/
│   ├── shared/
│   ├── analysis/
│   └── config/
│
├── rules/
│   ├── security/
│   └── quality/
│
├── docker/
│
├── .github/
│   └── workflows/
│
├── docker-compose.yml
├── package.json
└── README.md`}
            </pre>
          </div>

          <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <h3 className="mb-3 font-semibold text-white">Main Components</h3>

            <ul className="space-y-3 text-sm leading-6 text-slate-400">
              <li>
                <span className="font-medium text-slate-200">Web:</span>{" "}
                Provides the user interface, dashboard, documentation, and
                repository-related views.
              </li>

              <li>
                <span className="font-medium text-slate-200">API:</span>{" "}
                Provides backend application logic and communication between the
                frontend and analysis services.
              </li>

              <li>
                <span className="font-medium text-slate-200">Worker:</span>{" "}
                Performs background analysis tasks that may require more
                processing time.
              </li>

              <li>
                <span className="font-medium text-slate-200">Packages:</span>{" "}
                Contains shared functionality and configuration used across the
                application components.
              </li>

              <li>
                <span className="font-medium text-slate-200">Rules:</span>{" "}
                Contains security and code-quality analysis rules.
              </li>

              <li>
                <span className="font-medium text-slate-200">Docker:</span>{" "}
                Contains containerization and environment configuration used to
                run the platform consistently.
              </li>
            </ul>
          </div>
        </section>

        {/* Development Roadmap */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Development Roadmap
          </h2>

          <p className="mb-6 leading-8 text-slate-400">
            SecureReview AI will be developed incrementally. The core platform
            will be completed and validated first, followed by deployment
            engineering, testing, and optional future extensions.
          </p>

          <div className="space-y-4">
            {[
              {
                phase: "Phase 1",
                title: "Requirements",
                description:
                  "Define users, requirements, security requirements, supported languages, scoring, and the core project scope.",
              },
              {
                phase: "Phase 2",
                title: "System Design",
                description:
                  "Design the architecture, database, APIs, authentication, repository integration, asynchronous workflow, and AI service.",
              },
              {
                phase: "Phase 3",
                title: "Authentication & Multi-Tenancy",
                description:
                  "Implement authentication, organizations, repository ownership, role-based access control, tenant isolation, and sessions.",
              },
              {
                phase: "Phase 4",
                title: "Repository Integration",
                description:
                  "Implement OAuth, repository selection, webhook registration, signature verification, and pull request or commit extraction.",
              },
              {
                phase: "Phase 5",
                title: "Automated Code Analysis",
                description:
                  "Build the analysis worker and implement repository retrieval, changed-file analysis, security scanning, quality analysis, complexity, and duplication checks.",
              },
              {
                phase: "Phase 6",
                title: "Security Analysis",
                description:
                  "Implement vulnerability rules, secret detection, dependency analysis, severity classification, evidence, and recommendations.",
              },
              {
                phase: "Phase 7",
                title: "Technical Debt",
                description:
                  "Implement technical-debt categories, scoring, prioritization, hotspots, and historical tracking.",
              },
              {
                phase: "Phase 8",
                title: "Dashboard & Health",
                description:
                  "Build security, quality, and technical-debt metrics, repository health scores, trends, findings, filters, and hotspots.",
              },
              {
                phase: "Phase 9",
                title: "PR Review & Quality Gates",
                description:
                  "Implement quality and security gates, pull request comments or statuses, and notifications.",
              },
              {
                phase: "Phase 10",
                title: "AI Assistance",
                description:
                  "Add AI-powered explanations, summaries, prioritization, and remediation suggestions.",
              },
              {
                phase: "Phase 11",
                title: "Docker",
                description:
                  "Create Dockerfiles, Docker Compose configuration, a local multi-service environment, and container security controls.",
              },
              {
                phase: "Phase 12",
                title: "CI/CD",
                description:
                  "Implement GitHub Actions CI, Docker image builds, GHCR publishing, deployment, and health checks.",
              },
              {
                phase: "Phase 13",
                title: "Testing & Evaluation",
                description:
                  "Perform functional, security, AI, performance, regression, and end-to-end testing.",
              },
              {
                phase: "Phase 14",
                title: "Deployment & Documentation",
                description:
                  "Complete production deployment, architecture documentation, setup documentation, and final project evaluation.",
              },
              {
                phase: "Phase 15",
                title: "Future CyberMind Extensions",
                description:
                  "Optionally add CVE intelligence, MITRE ATT&CK mapping, Nmap or Nessus imports, log analysis, SOC capabilities, automated reports, and advanced risk prediction.",
              },
            ].map((item) => (
              <div
                key={item.phase}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-5"
              >
                <div className="mb-1 text-sm font-semibold text-cyan-400">
                  {item.phase}
                </div>

                <h3 className="mb-2 font-semibold text-white">{item.title}</h3>

                <p className="text-sm leading-6 text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
        {/* Docker & CI/CD */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Docker & CI/CD
          </h2>

          <p className="mb-6 leading-8 text-slate-400">
            SecureReview AI will use containerization and continuous integration
            practices to provide a consistent development, testing, and
            deployment environment.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Docker Containers",
                description:
                  "Package the web application, API, analysis worker, database, and supporting services into reproducible containers.",
              },
              {
                title: "Docker Compose",
                description:
                  "Provide a local multi-service environment for development and integration testing.",
              },
              {
                title: "Continuous Integration",
                description:
                  "Automatically run linting, type checking, tests, security checks, and build validation when code changes are pushed.",
              },
              {
                title: "Container Builds",
                description:
                  "Build and publish versioned Docker images through the CI pipeline.",
              },
              {
                title: "Deployment",
                description:
                  "Deploy validated application builds using container-based deployment workflows.",
              },
              {
                title: "Health Checks",
                description:
                  "Verify that deployed services are running correctly through application and infrastructure health checks.",
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
        {/* Security & Privacy Considerations */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Security & Privacy Considerations
          </h2>

          <p className="mb-6 leading-8 text-slate-400">
            Because SecureReview AI processes source code and security-sensitive
            information, security and privacy are considered throughout the
            platform.
          </p>

          <div className="space-y-4">
            {[
              {
                title: "Authentication & Authorization",
                description:
                  "Protect platform resources using authentication, role-based access control, and tenant isolation.",
              },
              {
                title: "Repository Access",
                description:
                  "Use secure repository integrations and limited permissions when accessing source code.",
              },
              {
                title: "Webhook Verification",
                description:
                  "Verify webhook signatures before accepting repository events.",
              },
              {
                title: "Secret Protection",
                description:
                  "Protect API keys, repository credentials, database credentials, and other sensitive configuration values.",
              },
              {
                title: "Isolated Analysis",
                description:
                  "Run source-code analysis in controlled worker environments to reduce the risk of executing untrusted repository content.",
              },
              {
                title: "Data Protection",
                description:
                  "Limit stored source-code information and protect analysis results and repository-related data.",
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
        {/* Testing & Evaluation */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Testing & Evaluation
          </h2>

          <p className="mb-6 leading-8 text-slate-400">
            The platform will be evaluated at multiple levels to verify
            functional correctness, security, reliability, and the usefulness of
            its analysis results.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Unit Testing",
                description:
                  "Test individual services, analysis components, scoring functions, utilities, and data-processing logic.",
              },
              {
                title: "Integration Testing",
                description:
                  "Verify communication between the API, database, worker, analysis tools, and external services.",
              },
              {
                title: "End-to-End Testing",
                description:
                  "Test complete workflows from repository submission through analysis and dashboard results.",
              },
              {
                title: "Security Testing",
                description:
                  "Test authentication, authorization, webhook validation, secret handling, and isolated analysis workflows.",
              },
              {
                title: "AI Evaluation",
                description:
                  "Evaluate AI-generated explanations and remediation guidance for relevance, consistency, and usefulness.",
              },
              {
                title: "Performance Testing",
                description:
                  "Measure analysis processing time, API response time, background-job behaviour, and system resource usage.",
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
        {/* Future Improvements */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Future Improvements
          </h2>

          <p className="mb-6 leading-8 text-slate-400">
            After the core SecureReview AI platform is completed and validated,
            additional CyberMind AI capabilities may be introduced as future
            extensions.
          </p>

          <div className="space-y-4">
            {[
              {
                title: "CVE Intelligence",
                description:
                  "Expand vulnerability intelligence using broader CVE information and vulnerability correlation.",
              },
              {
                title: "MITRE ATT&CK Mapping",
                description:
                  "Map relevant security findings to MITRE ATT&CK techniques to provide additional security context.",
              },
              {
                title: "Security Tool Integration",
                description:
                  "Import and correlate results from tools such as Nmap and Nessus.",
              },
              {
                title: "Log Analysis",
                description:
                  "Analyze application and infrastructure logs to identify suspicious behaviour and operational issues.",
              },
              {
                title: "SOC Capabilities",
                description:
                  "Extend the platform with security monitoring and security-operations-oriented workflows.",
              },
              {
                title: "Automated Security Reports",
                description:
                  "Generate structured security and technical-debt reports for development and security teams.",
              },
              {
                title: "Advanced Risk Prediction",
                description:
                  "Use historical findings and repository information to support more advanced risk analysis.",
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
        {/* Project Scope */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Project Scope
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-5">
              <h3 className="mb-3 font-semibold text-cyan-400">Core Scope</h3>

              <ul className="space-y-2 text-sm leading-6 text-slate-400">
                <li>• Repository integration</li>
                <li>• Automated code analysis</li>
                <li>• Security analysis</li>
                <li>• Dependency vulnerability analysis</li>
                <li>• Technical debt analysis</li>
                <li>• Finding normalization</li>
                <li>• AI-assisted analysis</li>
                <li>• Scoring and health metrics</li>
                <li>• Quality gates</li>
                <li>• Dashboard</li>
                <li>• Docker and CI/CD</li>
                <li>• Testing and evaluation</li>
              </ul>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <h3 className="mb-3 font-semibold text-white">
                Optional Future Scope
              </h3>

              <ul className="space-y-2 text-sm leading-6 text-slate-400">
                <li>• CVE intelligence</li>
                <li>• MITRE ATT&CK mapping</li>
                <li>• Nmap and Nessus integration</li>
                <li>• Log analysis</li>
                <li>• SOC capabilities</li>
                <li>• Automated security reports</li>
                <li>• Advanced risk prediction</li>
              </ul>
            </div>
          </div>

          <p className="mt-6 leading-8 text-slate-400">
            The core scope will be implemented and evaluated before optional
            CyberMind AI extensions are considered.
          </p>
        </section>
      </div>
    </main>
  );
}
