"use server";
import { parseResumeFromS3, ResumeFileType } from "@/lib/parsers";
import { analyzeResume } from "./analyze-resume";

interface AnalyzerProps {
  fileUrl: string;
  fileType: ResumeFileType;
}

export const analyzer = async ({ fileUrl, fileType }: AnalyzerProps) => {
  try {
    if (
      ![
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(fileType)
    ) {
      throw new Error("Unsupported file type");
    }
    const resumeText = await parseResumeFromS3(fileUrl, fileType);
    const result = await analyzeResume(resumeText);
    return {
      success: true,
      result,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: `Resume analysis failed: ${(error as Error).message}`,
    };
  }
};
