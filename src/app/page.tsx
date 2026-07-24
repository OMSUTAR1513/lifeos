import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { SummaryCard } from "@/components/dashboard/summary-card";
import { activityFeed, dashboardStats } from "@/lib/mock-data";

export default function Home() {
  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title="Dashboard"
          description="A polished starting point for LifeOS with mock financial snapshots and a premium SaaS layout."
        />

        <section className="grid gap-4 md:grid-cols-3">
          {dashboardStats.map((item) => (
            <SummaryCard key={item.title} {...item} />
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">This week</h2>
                <p className="text-sm text-slate-500">Mock spending activity for the foundation build.</p>
              </div>
              <div className="rounded-full bg-white px-3 py-1 text-sm font-medium text-slate-600 shadow-sm">
                Live mock data
              </div>
            </div>
            <div className="space-y-3">
              {activityFeed.map((item) => (
                <div key={item.title} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <div>
                    <p className="font-medium text-slate-800">{item.title}</p>
                    <p className="text-sm text-slate-500">{item.note}</p>
                  </div>
                  <p className="text-sm font-semibold text-slate-700">{item.amount}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-950 p-5 text-white">
            <p className="text-sm font-medium text-slate-300">Foundation status</p>
            <h2 className="mt-2 text-2xl font-semibold">Ready for the next phase</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              The shell, navigation, and reusable layout pieces are now in place for the LifeOS experience.
            </p>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/10 p-4">
              <p className="text-sm font-medium">Included now</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                <li>• Responsive dashboard shell</li>
                <li>• Desktop and mobile nav</li>
                <li>• Reusable layout building blocks</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
