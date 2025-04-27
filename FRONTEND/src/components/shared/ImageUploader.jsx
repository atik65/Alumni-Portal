"use client";
import { useState, useRef, useCallback } from "react";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Upload, X, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { cn } from "../../lib/utils";

// export interface ImageUploaderProps {
//   onUpload?: (files: File[]) => Promise<void> | void
//   onRemove?: (fileIndex: number) => void
//   maxFiles?: number
//   maxSizeMB?: number
//   acceptedFileTypes?: string[]
//   className?: string
//   disabled?: boolean
//   showPreview?: boolean
//   previewMaxHeight?: number
//   label?: string
//   description?: string
// }

const ImageUploader = ({
  onUpload,
  onRemove,
  maxFiles = 1,
  maxSizeMB = 5,
  acceptedFileTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"],
  className,
  disabled = false,
  showPreview = true,
  previewMaxHeight = 200,
  label = "Upload Images",
  description = "Drag and drop your images here or click to browse",
}) => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragEnter = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) setIsDragging(true);
    },
    [disabled]
  );

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) setIsDragging(true);
    },
    [disabled]
  );

  const validateFiles = (fileList) => {
    const validFiles = [];
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    Array.from(fileList).forEach((file) => {
      // Check file type
      if (!acceptedFileTypes.includes(file.type)) {
        setErrorMessage(`File type not supported: ${file.type}`);
        return;
      }

      // Check file size
      if (file.size > maxSizeBytes) {
        setErrorMessage(
          `File too large: ${file.name}. Maximum size is ${maxSizeMB}MB`
        );
        return;
      }

      validFiles.push(file);
    });

    // Check max files
    if (files.length + validFiles.length > maxFiles) {
      setErrorMessage(
        `You can only upload up to ${maxFiles} file${maxFiles > 1 ? "s" : ""}`
      );
      return validFiles.slice(0, maxFiles - files.length);
    }

    return validFiles;
  };

  const createPreviews = (newFiles) => {
    return newFiles.map((file) => URL.createObjectURL(file));
  };

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (disabled) return;

      setErrorMessage(null);
      const droppedFiles = e.dataTransfer.files;
      const validFiles = validateFiles(droppedFiles);

      if (validFiles.length > 0) {
        const newPreviews = createPreviews(validFiles);
        setFiles((prev) => [...prev, ...validFiles]);
        setPreviews((prev) => [...prev, ...newPreviews]);
        handleUpload(validFiles);
      }
    },
    [disabled, files.length, maxFiles, maxSizeMB, acceptedFileTypes]
  );

  const handleFileInputChange = (e) => {
    if (!e.target.files?.length || disabled) return;

    setErrorMessage(null);
    const selectedFiles = e.target.files;
    const validFiles = validateFiles(selectedFiles);

    if (validFiles.length > 0) {
      const newPreviews = createPreviews(validFiles);
      setFiles((prev) => [...prev, ...validFiles]);
      setPreviews((prev) => [...prev, ...newPreviews]);
      handleUpload(validFiles);
    }

    // Reset the input value so the same file can be selected again
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUpload = async (filesToUpload) => {
    if (!onUpload) return;

    try {
      setUploadStatus("uploading");

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval);
            return 95;
          }
          return prev + 5;
        });
      }, 100);

      await onUpload(filesToUpload);

      clearInterval(interval);
      setUploadProgress(100);
      setUploadStatus("success");

      // Reset progress after a delay
      setTimeout(() => {
        setUploadProgress(0);
        setUploadStatus("idle");
      }, 2000);
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("error");
      setErrorMessage("Failed to upload images. Please try again.");

      // Reset status after a delay
      setTimeout(() => {
        setUploadStatus("idle");
        setErrorMessage(null);
      }, 3000);
    }
  };

  const handleRemoveFile = (index) => {
    // Revoke object URL to prevent memory leaks
    URL.revokeObjectURL(previews[index]);

    const newFiles = [...files];
    const newPreviews = [...previews];

    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);

    setFiles(newFiles);
    setPreviews(newPreviews);

    if (onRemove) onRemove(index);
  };

  const handleBrowseClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-2">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </p>
      </div>

      <div
        className={cn(
          "relative border-2 border-dashed rounded-lg p-6 transition-all",
          "flex flex-col items-center justify-center text-center",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50",
          disabled &&
            "opacity-60 cursor-not-allowed bg-gray-100 dark:bg-gray-800/30",
          uploadStatus === "error" &&
            "border-red-500 dark:border-red-500 bg-red-50 dark:bg-red-900/10"
        )}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept={acceptedFileTypes.join(",")}
          multiple={maxFiles > 1}
          onChange={handleFileInputChange}
          disabled={disabled || files.length >= maxFiles}
        />

        <div className="space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Upload className="h-6 w-6 text-primary" />
          </div>

          <div className="space-y-2">
            <p className="text-base font-medium text-gray-700 dark:text-gray-300">
              {description}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {acceptedFileTypes.map((type) => type.split("/")[1]).join(", ")}{" "}
              up to {maxSizeMB}MB
              {maxFiles > 1 ? ` (max ${maxFiles} files)` : ""}
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={handleBrowseClick}
            disabled={disabled || files.length >= maxFiles}
          >
            Browse Files
          </Button>
        </div>
      </div>

      {/* Error message */}
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 flex items-center gap-2 text-sm text-red-600 dark:text-red-400"
          >
            <AlertCircle className="h-4 w-4" />
            <span>{errorMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload progress */}
      {uploadStatus === "uploading" && (
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Uploading...
            </span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {uploadProgress}%
            </span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
        </div>
      )}

      {/* Success message */}
      <AnimatePresence>
        {uploadStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 flex items-center gap-2 text-sm text-green-600 dark:text-green-400"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>Upload successful!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image previews */}
      {showPreview && previews.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            {previews.length} {previews.length === 1 ? "image" : "images"}{" "}
            selected
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {previews.map((preview, index) => (
              <div
                key={index}
                className="group relative rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div
                  className="relative aspect-square w-full overflow-hidden bg-gray-100 dark:bg-gray-800"
                  style={{ maxHeight: previewMaxHeight }}
                >
                  <Image
                    src={preview || "/placeholder.svg"}
                    alt={`Preview ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  className="absolute right-1 top-1 rounded-full bg-gray-900/60 p-1 text-white opacity-0 transition-opacity hover:bg-gray-900/80 group-hover:opacity-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
