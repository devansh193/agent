import { ReviewChart } from "./review-chart";
import { OverviewDetails } from "./overview-details";

export const Overview = () => {
  return (
    <div className="border border-gray-300 rounded-md  h-full">
      <ReviewChart />
      <OverviewDetails />
    </div>
  );
};
