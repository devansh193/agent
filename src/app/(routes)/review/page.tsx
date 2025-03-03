import { ResumePreviewSection } from "@/modules/resume/ui/sections/resume-preview-section";
import { ReviewSection } from "@/modules/review/ui/sections/review-section";

const Review = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 min-h-full">
      <ReviewSection className="col-span-2 p-4 pr-2 h-full" />
      <ResumePreviewSection className="hidden lg:block col-span-1 p-4 pl-2 h-full" />
    </div>
  );
};
export default Review;
