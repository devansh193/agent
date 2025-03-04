import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import mammoth from "mammoth";
import { parseS3Url } from "@/lib/s3";
import { streamToBuffer } from "../utils";
import { parsePDF } from "../../actions/pdf";

export type ResumeFileType =
  | "application/pdf"
  | "application/msword"
  | "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export async function parseResumeFromS3(
  fileUrl: string,
  fileType: ResumeFileType
): Promise<string> {
  try {
    const { bucket, key } = parseS3Url(fileUrl);

    const s3Client = new S3Client({
      region: process.env.AWS_REGION!,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
    const response = await s3Client.send(
      new GetObjectCommand({
        Bucket: bucket,
        Key: key,
      })
    );

    if (!response.Body) {
      throw new Error("Failed to fetch file from S3");
    }

    const buffer = await streamToBuffer(response.Body);
    let text = "";
    if (fileType === "application/pdf") {
      const pdfData = await parsePDF(buffer);
      text = pdfData.text;
    } else if (
      fileType === "application/msword" ||
      fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const arrayBuffer = buffer.buffer.slice(
        buffer.byteOffset,
        buffer.byteOffset + buffer.byteLength
      ) as ArrayBuffer;
      const result = await mammoth.extractRawText({ arrayBuffer });
      text = result.value;
    } else {
      throw new Error(`Unsupported file type: ${fileType}`);
    }

    return text.trim();
  } catch (error) {
    console.error("Error parsing resume from S3:", error);
    throw new Error(`Failed to parse resume: ${(error as Error).message}`);
  }
}
