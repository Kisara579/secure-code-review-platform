import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-slate-950 overflow-hidden">
      {/* Animated gradient mesh background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="absolute -top-1/2 -left-1/2 h-full w-full rounded-full opacity-15 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, #06b6d4 0%, transparent 70%)",
            animation: "float-slow 20s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -right-1/4 top-1/4 h-3/4 w-3/4 rounded-full opacity-10 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, #3b82f6 0%, transparent 70%)",
            animation: "float-slow 25s ease-in-out infinite reverse",
          }}
        />
        <div
          className="absolute bottom-0 left-1/3 h-1/2 w-1/2 rounded-full opacity-10 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, #8b5cf6 0%, transparent 70%)",
            animation: "float-slow 22s ease-in-out infinite 5s",
          }}
        />
      </div>

      <div className="relative z-10">
        <Header />
        <Hero />
        <Features />
        <Footer />
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
      `}</style>
    </main>
  );
}
