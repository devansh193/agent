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
import { Progress } from "@/components/ui/progress";
import { getUploadUrl } from "@/actions/uploadFile";

type FileStatus = "idle" | "uploading" | "success" | "error";

interface FileWithStatus {
  file: File;
  status: FileStatus;
  progress: number;
  error?: string;
}

export default function FileUploader() {
  const [file, setFile] = useState<FileWithStatus | null>(null);
  const [parsedText, setParsedText] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile({ file: acceptedFiles[0], status: "idle", progress: 0 });
    }
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
    multiple: false, // Restrict to one file
  });

  const handleUpload = async () => {
    if (!file || file.status === "uploading") return;

    const formData = new FormData();
    formData.append("FILE", file.file);
    setFile({ ...file, status: "uploading", progress: 0 });

    try {
      // Step 1: Upload the file to the storage service
      const { url, key } = await getUploadUrl(file.file.name, file.file.type);
      if (!url || !key) throw new Error("Failed to get upload URL");

      const uploadResponse = await fetch(url, {
        method: "PUT",
        body: file.file,
        headers: { "Content-Type": file.file.type },
      });

      if (!uploadResponse.ok) throw new Error("Upload failed");
      const parseResponse = await fetch("/api/parse-data", {
        method: "POST",
        body: formData,
      });

      if (!parseResponse.ok) {
        const errorData = await parseResponse.json();
        throw new Error(errorData.error || "Failed to upload file.");
      }

      const result = await parseResponse.json();
      setParsedText(result.parsedText);
      setFile({ ...file, status: "success", progress: 100 });
      return result;
    } catch (error) {
      setFile({
        ...file,
        status: "error",
        progress: 0,
        error: error instanceof Error ? error.message : "Upload failed",
      });
      throw error; // Re-throw the error if you want to handle it outside this function
    }
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
            {isDragActive ? "Drop file here" : "Drag & drop file here"}
          </p>
          <p className="text-sm text-gray-500">or click to browse</p>
          <p className="text-xs text-gray-400">
            Supports PDF, DOC, and DOCX (max 10MB)
          </p>
        </div>
      </div>

      {file && (
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium truncate max-w-[300px]">
                  {file.file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(file.file.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {file.status === "idle" && (
                <Button size="sm" onClick={handleUpload}>
                  Upload
                </Button>
              )}
              {file.status === "uploading" && (
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span className="text-sm">Uploading...</span>
                </div>
              )}
              {file.status === "success" && (
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm">Uploaded</span>
                </div>
              )}
              {file.status === "error" && (
                <div className="flex items-center space-x-2 text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">Failed</span>
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFile(null)}
                className="text-gray-500 hover:text-red-600"
              >
                Remove
              </Button>
            </div>
          </div>
          {file.status === "uploading" && (
            <Progress value={file.progress} className="h-2" />
          )}
          {file.status === "error" && file.error && (
            <p className="text-sm text-red-600 mt-1">{file.error}</p>
          )}
        </div>
      )}
      <div>
        {parsedText && (
          <div className="mt-4 p-4 border rounded bg-gray-100">
            <h3 className="font-semibold">Parsed Text:</h3>
            <pre className="text-sm whitespace-pre-wrap">{parsedText}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
