import {
  ShieldCheck,
  KeyRound,
  PackageSearch,
  ClipboardCheck,
} from "lucide-react";

const features = [
  {
    title: "Secure Code Analysis",
    description:
      "Analyze source code for security weaknesses, coding anti-patterns, and potential exploits with AI-powered static analysis.",
    icon: ShieldCheck,
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    title: "Secret Detection",
    description:
      "Identify accidentally exposed credentials, API keys, tokens, and secrets before they reach production.",
    icon: KeyRound,
    gradient: "from-violet-500 to-purple-500",
  },
  {
    title: "Dependency Scanning",
    description:
      "Detect known vulnerabilities in third-party dependencies and get actionable remediation guidance.",
    icon: PackageSearch,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    title: "Technical Debt Analysis",
    description:
      "Track maintainability issues, code complexity, and technical debt metrics across your entire codebase.",
    icon: ClipboardCheck,
    gradient: "from-emerald-500 to-teal-500",
  },
];

export default function Features() {
  return (
    <section className="relative px-6 py-24 sm:py-32">
      {/* Dot pattern background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #06b6d4 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Features
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Everything you need to{" "}
            <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              secure your code
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
            Comprehensive security analysis tools designed for modern
            development workflows.
          </p>
        </div>

        {/* Feature cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group relative rounded-2xl border border-slate-800/80 bg-slate-900/50 p-8 backdrop-blur transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/80"
              >
                {/* Gradient glow on hover */}
                <div
                  className={`absolute -inset-px rounded-2xl bg-linear-to-r ${feature.gradient} opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-10`}
                />

                <div className="relative">
                  {/* Icon with background */}
                  <div
                    className={`mb-5 inline-flex rounded-xl bg-linear-to-br ${feature.gradient} p-3 shadow-lg`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  <h3 className="text-xl font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-slate-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
