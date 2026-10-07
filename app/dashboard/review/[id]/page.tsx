export default async function ReviewResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="px-6 py-10">
      <h1 className="text-3xl font-bold text-white">
        Review Result
      </h1>

      <p className="mt-4 text-slate-400">
        Review ID: {id}
      </p>
    </main>
  );
}