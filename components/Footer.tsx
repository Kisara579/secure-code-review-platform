export default function Footer() {
  return (
    <footer className="border-t border-slate-800 px-6 py-8">
      <div className="mx-auto flex max-w-5xl flex-col  gap-2 text-center sm:flex-row sm:justify-between">
        <p className="font-semibold text-white">SecureReview AI</p>

        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} SecureReview AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
