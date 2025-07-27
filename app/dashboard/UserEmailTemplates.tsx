"use client";
import { useState } from "react";
import EmailTemplates from "../admin/EmailTemplates";

export default function UserEmailTemplates() {
  const [globalAttachments, setGlobalAttachments] = useState<File[]>([]);

  const handleGlobalAttachmentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setGlobalAttachments([...globalAttachments, ...Array.from(e.target.files)]);
    }
  };

  const removeAttachment = (idx: number) => {
    setGlobalAttachments(globalAttachments.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-6">
      {/* Global Attachment Upload */}
      <div className="bg-white rounded-xl shadow-sm p-6 card-shadow">
        <h3 className="text-lg font-semibold mb-2 flex items-center">
          <i className="ri-attachment-2 text-blue-600 mr-2"></i>
          Attachments for Every Email
        </h3>
        <p className="text-sm text-gray-600 mb-2">
          Files uploaded here will be sent with <b>every email</b> you send from any template.
        </p>
        <div className="flex items-center space-x-4 mb-2">
          <input
            type="file"
            multiple
            id="global-attachment-upload"
            className="hidden"
            onChange={handleGlobalAttachmentUpload}
          />
          <label
            htmlFor="global-attachment-upload"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors flex items-center"
          >
            <i className="ri-upload-2-line mr-2"></i>
            Upload Attachment
          </label>
        </div>
        {globalAttachments.length > 0 && (
          <div className="space-y-2 mt-2">
            {globalAttachments.map((file, idx) => (
              <div key={idx} className="flex items-center justify-between bg-gray-50 rounded p-2">
                <span className="text-sm text-gray-800">{file.name}</span>
                <button
                  className="text-red-500 hover:text-red-700 ml-2"
                  onClick={() => removeAttachment(idx)}
                >
                  <i className="ri-close-line"></i>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Email Templates (admin logic reused) */}
      <EmailTemplates />
    </div>
  );
}
