import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <div className="flex items-center justify-center">
      <h1 className={cn("text-2xl font-semibold font-sans", className)}>
        Elevate
      </h1>
      <span
        className={cn(
          "text-2xl font-semibold font-sans rotate-[-10deg] pb-0.5",
          className
        )}
      >
        AI
      </span>
    </div>
  );
};
