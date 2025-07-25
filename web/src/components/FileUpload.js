import React, { useState, useCallback } from "react";
import { Card, CardContent } from "./ui/card";
import { Upload, FileText, CheckCircle, AlertCircle, Loader } from "lucide-react";
import { uploadDocument } from '../api';

export default function FileUpload({ onFileUpload, selectedDocument, boxSize }) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null); // 'uploading', 'success', 'error'
  const [uploadError, setUploadError] = useState('');

  const handleFileUpload = useCallback(async (file) => {
    // Process file locally for context only - no backend upload
    onFileUpload(file);
    
    setUploadStatus('processing');
    setUploadError('');
    
    // Simulate brief processing time for user feedback
    setTimeout(() => {
      setUploadStatus('success');
      console.log('File processed locally for context:', file.name);
    }, 500);
  }, [onFileUpload]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      files.forEach(file => handleFileUpload(file));
    }
  }, [handleFileUpload]);

  const handleFileSelect = useCallback((e) => {
    const files = Array.from(e.target.files);
    if (files && files.length > 0) {
      files.forEach(file => handleFileUpload(file));
    }
  }, [handleFileUpload]);

  return (
    <div className="space-y-4">
      <Card
        className={`border-2 border-dashed transition-all duration-300 cursor-pointer hover:scale-[1.01] w-full flex items-center justify-center ${
          isDragging
            ? "border-blue-400 bg-blue-50 dark:bg-blue-900/20 scale-[1.01]"
            : "border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 bg-white/80 dark:bg-slate-800/80"
        } min-h-[80px] p-2`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-upload').click()}
        tabIndex={0}
        role="button"
        aria-label="Upload Legal Document"
      >
        <CardContent className={`flex flex-col items-center justify-center text-center w-full h-full p-0 m-0`}>
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
            name="file-upload"
            multiple
          />
          <div className="mb-1">
            <Upload className="text-blue-600 dark:text-blue-400 w-5 h-5" />
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 text-center">
            Drop files or click
          </p>
        </CardContent>
      </Card>
      {selectedDocument && (
        <Card className="bg-white/90 dark:bg-slate-800/90 border border-slate-200/60 dark:border-slate-700/60 shadow-sm transition-all duration-300 animate-slide-in backdrop-blur-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg transition-colors duration-300">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-900 dark:text-slate-100 text-sm sm:text-base truncate">
                  {selectedDocument.name}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  {(selectedDocument.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="mt-3 p-3 bg-slate-50/80 dark:bg-slate-900/20 border border-slate-200/60 dark:border-slate-800/60 rounded-lg">
              {uploadStatus === 'processing' && (
                <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 text-sm">
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Processing file for local context...</span>
                </div>
              )}
              {uploadStatus === 'success' && (
                <div className="flex items-center gap-2 text-green-700 dark:text-green-300 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  <span>File upload is for local context only. No file is sent to the backend.</span>
                </div>
              )}
              {uploadStatus === 'error' && (
                <div className="flex items-center gap-2 text-red-700 dark:text-red-300 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>Processing failed: {uploadError}</span>
                </div>
              )}
              {!uploadStatus && (
                <p className="text-slate-700 dark:text-slate-300 text-sm">
                  File will be processed locally for context only.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 