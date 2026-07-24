import { PageHeader } from "@/components/layout/page-header";

export default function InsightsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Insights"
        description="AI-driven spending insights will appear here in the future."
      />
      <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-10 text-center text-slate-600">
        Insight views are intentionally placeholder-only right now.
      </div>
    </div>
  );
}
