import { ArrowUpRight, CircleDollarSign, ReceiptText } from "lucide-react";

export function SummaryCard({
  title,
  value,
  detail,
  accent,
}: {
  title: string;
  value: string;
  detail: string;
  accent: "indigo" | "emerald" | "slate";
}) {
  const accentStyles = {
    indigo: "bg-indigo-50 text-indigo-700",
    emerald: "bg-emerald-50 text-emerald-700",
    slate: "bg-slate-100 text-slate-700",
  };

  const iconMap = {
    indigo: <CircleDollarSign className="h-5 w-5" />,
    emerald: <ReceiptText className="h-5 w-5" />,
    slate: <ArrowUpRight className="h-5 w-5" />,
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">{value}</p>
        </div>
        <div className={`rounded-2xl p-2 ${accentStyles[accent]}`}>{iconMap[accent]}</div>
      </div>
      <p className="mt-4 text-sm text-slate-500">{detail}</p>
    </div>
  );
}
