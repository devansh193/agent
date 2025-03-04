"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  FileText,
  Upload,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"; // Import getUploadUrl function
import { getUploadUrl } from "@/actions/uploadFile";
import { analyzer } from "@/actions/analyzer";
import { ResumeFileType } from "@/lib/parsers";

type FileStatus = "idle" | "uploading" | "success" | "error";

interface FileWithStatus {
  file: File;
  status: FileStatus;
  progress: number;
  error?: string;
}

export default function FileUploader() {
  const [files, setFiles] = useState<FileWithStatus[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      status: "idle" as FileStatus,
      progress: 0,
    }));

    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const handleUpload = async (
    fileWithStatus: FileWithStatus,
    index: number
  ) => {
    if (fileWithStatus.status === "uploading") return;

    // Set file status to "uploading"
    setFiles((prev) => {
      const newFiles = [...prev];
      newFiles[index] = {
        ...newFiles[index],
        status: "uploading",
        progress: 0,
      };
      return newFiles;
    });

    try {
      // Get pre-signed URL for upload
      const { url, key } = await getUploadUrl(
        fileWithStatus.file.name,
        fileWithStatus.file.type
      );

      if (!url) throw new Error("Failed to get upload URL");

      console.log("Uploading to:", url, "S3 Key:", key);

      // Upload file to S3
      const response = await fetch(url, {
        method: "PUT",
        body: fileWithStatus.file,
        headers: { "Content-Type": fileWithStatus.file.type },
      });

      if (!response.ok) throw new Error("Upload failed");

      // Construct the file URL (removing query params)
      const fileUrl = url.split("?")[0];

      console.log("File uploaded successfully:", fileUrl);

      // Update file status to "success"
      setFiles((prev) => {
        const newFiles = [...prev];
        newFiles[index] = {
          ...newFiles[index],
          status: "success",
          progress: 100,
        };
        return newFiles;
      });

      // **Call Analyzer Function**
      // console.log("Analyzing resume...");
      // const analysisResult = await analyzer({
      //   fileUrl,
      //   fileType: fileWithStatus.file.type as ResumeFileType,
      // });

      // console.log("Analysis result:", analysisResult);

      setFiles((prev) => {
        const newFiles = [...prev];
        newFiles[index] = {
          ...newFiles[index],
        };
        return newFiles;
      });
    } catch (error) {
      console.error("Upload or analysis error:", error);

      // Update file status to "error"
      setFiles((prev) => {
        const newFiles = [...prev];
        newFiles[index] = {
          ...newFiles[index],
          status: "error",
          progress: 0,
          error:
            error instanceof Error ? error.message : "Upload/Analysis failed",
        };
        return newFiles;
      });
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-gray-300 hover:border-primary"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-3">
          <Upload className="h-10 w-10 text-gray-400" />
          <p className="text-lg font-medium">
            {isDragActive ? "Drop files here" : "Drag & drop files here"}
          </p>
          <p className="text-sm text-gray-500">or click to browse files</p>
          <p className="text-xs text-gray-400">
            Supports PDF, DOC, and DOCX files (max 10MB)
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Files</h3>
          <div className="space-y-3">
            {files.map((fileWithStatus, index) => (
              <div
                key={`${fileWithStatus.file.name}-${index}`}
                className="border rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium truncate max-w-[200px] sm:max-w-[300px]">
                        {fileWithStatus.file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(fileWithStatus.file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {fileWithStatus.status === "idle" && (
                      <Button
                        size="sm"
                        onClick={() => handleUpload(fileWithStatus, index)}
                      >
                        Upload
                      </Button>
                    )}
                    {fileWithStatus.status === "uploading" && (
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 animate-spin text-primary" />
                        <span className="text-sm">Uploading...</span>
                      </div>
                    )}
                    {fileWithStatus.status === "success" && (
                      <div className="flex items-center space-x-2 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm">Uploaded</span>
                      </div>
                    )}
                    {fileWithStatus.status === "error" && (
                      <div className="flex items-center space-x-2 text-red-600">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">Failed</span>
                      </div>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="text-gray-500 hover:text-red-600"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
                {fileWithStatus.status === "uploading" && (
                  <Progress value={fileWithStatus.progress} className="h-2" />
                )}
                {fileWithStatus.status === "error" && fileWithStatus.error && (
                  <p className="text-sm text-red-600 mt-1">
                    {fileWithStatus.error}
                  </p>
                )}
              </div>
            ))}
          </div>
          {files.some((f) => f.status === "idle") && (
            <Button
              onClick={() => {
                files.forEach((file, index) => {
                  if (file.status === "idle") {
                    handleUpload(file, index);
                  }
                });
              }}
            >
              Upload All
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
