import { PageHeader } from "@/components/layout/page-header";
import { requireAuth } from "@/lib/require-auth";

export default async function SubscriptionsPage() {
  await requireAuth();
  return (
    <div className="space-y-6">
      <PageHeader
        title="Subscriptions"
        description="Subscription management will live here when the feature is ready."
      />
      <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-10 text-center text-slate-600">
        Subscription tracking will be implemented later.
      </div>
    </div>
  );
}
