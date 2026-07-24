import { PageHeader } from "@/components/layout/page-header";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Preferences and account settings will be added later."
      />
      <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-10 text-center text-slate-600">
        Settings experience will come in a later phase.
      </div>
    </div>
  );
}
