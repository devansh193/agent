interface S3Location {
  bucket: string;
  key: string;
}

export const parseS3Url = (url: string): S3Location => {
  try {
    if (url.startsWith("s3://")) {
      const parts = url.replace("s3://", "").split("/");
      const bucket = parts.shift()!;
      const key = parts.join("/");
      return { bucket, key };
    }

    if (url.includes(".s3.") && url.includes("amazonaws.com")) {
      const urlObj = new URL(url);
      const bucket = urlObj.hostname.split(".")[0];
      const key = urlObj.pathname.substring(1);
      return { bucket, key };
    }

    throw new Error("Invalid S3 URL format");
  } catch (error) {
    console.error("Error parsing S3 URL:", error);
    throw new Error(`Failed to parse S3 URL: ${url}`);
  }
};
