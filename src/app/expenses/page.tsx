import { PageHeader } from "@/components/layout/page-header";

export default function ExpensesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Expenses"
        description="A place to organize future expense tracking experiences."
      />
      <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-10 text-center text-slate-600">
        Expense management views will be added in a later phase.
      </div>
    </div>
  );
}
