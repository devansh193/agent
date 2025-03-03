import { cn } from "@/lib/utils";

interface ResumePreviewSectionProps {
  className?: string;
}
export const ResumePreviewSection = ({
  className,
}: ResumePreviewSectionProps) => {
  return (
    <div className={cn(className)}>
      <div className="flex items-center justify-center h-full rounded-md border border-gray-300">
        <h1>Right side</h1>
      </div>
    </div>
  );
};
