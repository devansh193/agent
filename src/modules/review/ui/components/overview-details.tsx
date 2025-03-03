import { SUMMARY } from "@/lib/constants";
import { CheckIcon, CircleAlertIcon } from "lucide-react";

// interface OverviewDetailsProps {
//   summary: string;
//   strength: string;
//   improvements: string;
// }
export const OverviewDetails = () => {
  return (
    <div className="w-full max-w-5xl mx-auto p-4 space-y-8">
      {/* Summary Section */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold">Summary</h2>
        <p className="text-gray-600 leading-relaxed">{SUMMARY.message}</p>
      </div>

      {/* Strength and Improvements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Strengths Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Strengths</h2>
          <div className="space-y-3">
            {SUMMARY.strength.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Improvements Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Areas of Improvement</h2>
          <div className="space-y-3">
            {SUMMARY.improvement.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <CircleAlertIcon className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
