import ResultView from "@/modules/valuation-result/views/ResultView";

export default async function ValuationPage({
  params,
}: {
  params: Promise<{ vehicleType: string; draftId: string }>;
}) {
  const { draftId } = await params;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <ResultView draftId={draftId} />
    </div>
  );
}