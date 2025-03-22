import { OverviewDetail } from "@/types/properties";

export const OverviewCard = ({ detail }: { detail: OverviewDetail }) => {
  const { label, value, icon: Icon, suffix } = detail;
  const displayValue = suffix ? `${value} ${suffix}` : value;

  return (
    <div className="flex items-center gap-3">
      <div className="rounded-lg border p-5">
        <Icon className="size-6 text-primary" />
      </div>
      <div>
        <span className="text-sm text-gray-500">{label}</span>
        <p className="text-base font-medium">{displayValue}</p>
      </div>
    </div>
  );
};
