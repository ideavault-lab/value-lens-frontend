import ResultView from "@/modules/valuation-result/views/ResultView";

export default function ValuationPage({params}: {params: {vehicleType: string, draftId: string}}) {

  const { draftId } = params;
  return (
    <div className="min-h-screen flex items-center justify-center">
      <ResultView draftId={draftId} />
    </div>
  );
}