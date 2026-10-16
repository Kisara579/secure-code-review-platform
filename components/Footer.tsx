import Link from "next/link";
import { Globe, ExternalLink, Share2 } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Features", href: "/#features" },
    { label: "Security Scanner", href: "/dashboard" },
    { label: "Documentation", href: "/documentation" },
    { label: "Changelog", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Resources: [
    { label: "API Reference", href: "/documentation" },
    { label: "Guides", href: "/documentation" },
    { label: "Community", href: "#" },
    { label: "Support", href: "#" },
  ],
};

const socialLinks = [
  { icon: Globe, href: "#", label: "Website" },
  { icon: ExternalLink, href: "#", label: "Blog" },
  { icon: Share2, href: "#", label: "Share" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/50 bg-slate-950/80 px-6 pt-16 pb-8">
      <div className="mx-auto max-w-6xl">
        {/* Top section */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="text-xl font-bold text-white">
                SecureReview AI
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              AI-powered secure code review platform for modern DevSecOps teams.
              Detect vulnerabilities before they reach production.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 text-slate-400 transition-all hover:border-slate-600 hover:bg-white/5 hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                {category}
              </h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-slate-800/50 pt-8 sm:flex-row">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} SecureReview AI. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-sm text-slate-500 transition-colors hover:text-slate-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm text-slate-500 transition-colors hover:text-slate-300"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
