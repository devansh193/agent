import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { GetObjectCommandOutput } from "@aws-sdk/client-s3";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const streamToBuffer = async (
  stream: GetObjectCommandOutput["Body"]
): Promise<Buffer> => {
  if (!stream) throw new Error("Stream is undefined");
  return Buffer.from(await stream.transformToByteArray());
};
