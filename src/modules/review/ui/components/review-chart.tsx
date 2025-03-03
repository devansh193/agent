export const ReviewChart = () => {
  return (
    <div className="rounded-lg p-4">
      <div className="">
        <h2 className="text-2xl font-semibold tracking-tight">Resume Score</h2>
        <p className="text-sm text-muted-foreground">
          Overall assessment of your resume
        </p>
      </div>

      <div className="flex items-center justify-center py-8">
        <div className="relative h-48 w-48 flex items-center justify-center">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              className="stroke-muted/20"
              strokeWidth="12"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
            />
            {/* Score circle */}
            <circle
              className="stroke-primary transition-all duration-300 ease-in-out"
              strokeWidth="12"
              strokeLinecap="round"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              strokeDasharray={`${2 * Math.PI * 40}`}
              strokeDashoffset={`${2 * Math.PI * 40 * (1 - 78 / 100)}`}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-5xl font-bold">78</span>
            <span className="text-sm text-muted-foreground">out of 100</span>
          </div>
        </div>
      </div>
    </div>
  );
};
