import { ReviewChart } from "./review-chart";
import { OverviewDetails } from "./overview-details";

export const Overview = () => {
  return (
    <div className="h-full flex flex-col border border-gray-300 rounded-md overflow-auto">
      <div className="flex-1">
        <div>
          <ReviewChart />
          <OverviewDetails />
        </div>
      </div>
    </div>
  );
};
