import { CardContent } from "@/components/ui/card";
import { OverviewProps } from "@/types/properties";
import { createOverviewDetails } from "@/data/unit";
import { OverviewCard } from "./OverviewCard";

export default function Overview(props: OverviewProps) {
  const details = createOverviewDetails(props);

  return (
    <div className="p-4">
      <h6 className="text-xl font-semibold mb-4">Overview</h6>
      <CardContent className="grid grid-cols-4 gap-4">
        {details.map((detail, index) => (
          <OverviewCard key={index} detail={detail} />
        ))}
      </CardContent>
    </div>
  );
}
