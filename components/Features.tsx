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
      "Analyze source code for security weaknesses and coding issues.",
    icon: ShieldCheck,
  },
  {
    title: "Secret Detection",
    description:
      "Identify accidentally exposed credentials, API keys, and secrets.",
    icon: KeyRound,
  },
  {
    title: "Dependency Scanning",
    description: "Detect known vulnerabilities in third-party dependencies.",
    icon: PackageSearch,
  },
  {
    title: "Technical Debt Analysis",
    description:
      "Track maintainability issues and technical debt across the codebase.",
    icon: ClipboardCheck,
  },
];

export default function Features() {
  return (
    <section className="px-6 py-16">
      <h2 className="text-center text-3xl font-bold text-white">
        Core Features
      </h2>

      <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 transition hover:border-cyan-500/50 hover:bg-slate-900/80"
            >
              <Icon className="mb-4 h-8 w-8 text-cyan-400" />
              <h3 className="text-xl font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-3 text-slate-400">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
