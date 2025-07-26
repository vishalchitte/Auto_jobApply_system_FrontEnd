
'use client';

import { useState, useRef } from 'react';

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.includes('sheet')) {
      setFile(droppedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Upload Section */}
      <div className="bg-gray-800/50 rounded-xl shadow-sm p-6 card-shadow border border-gray-700/50">
        <h2 className="text-xl font-semibold mb-4 flex items-center text-white">
          <i className="ri-upload-cloud-line mr-2 text-purple-400"></i>
          Upload Excel File
        </h2>
        
        <div
          className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-purple-400 transition-colors cursor-pointer bg-gray-700/30"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="floating-animation">
            <i className="ri-file-excel-line text-6xl text-green-400 mb-4"></i>
          </div>
          <p className="text-gray-300 mb-2">Drop your Excel file here or click to browse</p>
          <p className="text-sm text-gray-500">Supports .xlsx, .xls files</p>
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {file && (
          <div className="mt-4 p-4 bg-gray-700/50 rounded-lg border border-gray-600/50">
            <div className="flex items-center">
              <i className="ri-file-excel-line text-green-400 text-2xl mr-3"></i>
              <div>
                <p className="font-medium text-white">{file.name}</p>
                <p className="text-sm text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
          </div>
        )}

        {uploadProgress > 0 && (
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-400 mb-1">
              <span>Upload Progress</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full transition-all duration-200"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!file || isUploading}
          className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all !rounded-button flex items-center justify-center"
        >
          {isUploading ? (
            <>
              <i className="ri-loader-4-line animate-spin mr-2"></i>
              Uploading...
            </>
          ) : (
            <>
              <i className="ri-upload-line mr-2"></i>
              Upload & Process
            </>
          )}
        </button>
      </div>

      {/* Instructions */}
      <div className="bg-gray-800/50 rounded-xl shadow-sm p-6 card-shadow border border-gray-700/50">
        <h2 className="text-xl font-semibold mb-4 flex items-center text-white">
          <i className="ri-information-line mr-2 text-purple-400"></i>
          Instructions
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center mr-3 mt-1 border border-purple-500/50">
              <span className="text-purple-400 font-semibold text-sm">1</span>
            </div>
            <div>
              <h3 className="font-semibold text-white">Prepare Excel File</h3>
              <p className="text-gray-400 text-sm">Create an Excel file with columns: Name, Email, Company</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center mr-3 mt-1 border border-purple-500/50">
              <span className="text-purple-400 font-semibold text-sm">2</span>
            </div>
            <div>
              <h3 className="font-semibold text-white">Upload File</h3>
              <p className="text-gray-400 text-sm">Drag and drop or click to select your Excel file</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center mr-3 mt-1 border border-purple-500/50">
              <span className="text-purple-400 font-semibold text-sm">3</span>
            </div>
            <div>
              <h3 className="font-semibold text-white">Process & Send</h3>
              <p className="text-gray-400 text-sm">System will automatically send emails to all recipients</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center mr-3 mt-1 border border-purple-500/50">
              <span className="text-purple-400 font-semibold text-sm">4</span>
            </div>
            <div>
              <h3 className="font-semibold text-white">Monitor Status</h3>
              <p className="text-gray-400 text-sm">Check email status and delivery reports</p>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-500/20 rounded-lg border border-yellow-500/50">
          <div className="flex items-center">
            <i className="ri-lightbulb-line text-yellow-400 mr-2"></i>
            <h4 className="font-semibold text-yellow-400">Pro Tip</h4>
          </div>
          <p className="text-yellow-300 text-sm mt-1">
            The system automatically sends emails daily at 9 AM. You can also trigger manual sends.
          </p>
        </div>
      </div>
    </div>
  );
}
