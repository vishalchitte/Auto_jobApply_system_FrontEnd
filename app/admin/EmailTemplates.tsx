'use client';

import { useState } from 'react';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  isDefault: boolean;
  lastModified: string;
}

export default function EmailTemplates() {
  const [templates, setTemplates] = useState<EmailTemplate[]>([
    {
      id: '1',
      name: 'Job Application Default',
      subject: 'Job Application - {{name}}',
      content: `Dear Hiring Manager,

I am writing to express my interest in opportunities within your organization. Please find my resume attached for your review.

I would welcome the opportunity to discuss how my skills and experience can contribute to your team.

Thank you for your time and consideration.

Best regards,
{{name}}`,
      isDefault: true,
      lastModified: '2024-01-15 10:30:00'
    },
    {
      id: '2',
      name: 'Tech Position Template',
      subject: 'Software Developer Application - {{name}}',
      content: `Dear {{company}} Team,

I am excited to apply for software development positions at {{company}}. With my technical expertise and passion for innovation, I believe I would be a valuable addition to your team.

Please find my resume and cover letter attached. I would appreciate the opportunity to discuss how I can contribute to {{company}}'s continued success.

Best regards,
{{name}}`,
      isDefault: false,
      lastModified: '2024-01-14 16:45:00'
    }
  ]);

  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    content: ''
  });

  const handleAddTemplate = () => {
    setEditingTemplate(null);
    setFormData({ name: '', subject: '', content: '' });
    setShowModal(true);
  };

  const handleEditTemplate = (template: EmailTemplate) => {
    setEditingTemplate(template);
    setFormData({
      name: template.name,
      subject: template.subject,
      content: template.content
    });
    setShowModal(true);
  };

  const handleSaveTemplate = () => {
    if (formData.name && formData.subject && formData.content) {
      if (editingTemplate) {
        setTemplates(templates.map(template => 
          template.id === editingTemplate.id 
            ? { ...template, ...formData, lastModified: new Date().toISOString().replace('T', ' ').substring(0, 19) }
            : template
        ));
      } else {
        const newTemplate: EmailTemplate = {
          id: Date.now().toString(),
          ...formData,
          isDefault: false,
          lastModified: new Date().toISOString().replace('T', ' ').substring(0, 19)
        };
        setTemplates([...templates, newTemplate]);
      }
      setShowModal(false);
      setEditingTemplate(null);
      setFormData({ name: '', subject: '', content: '' });
    }
  };

  const handleDeleteTemplate = (templateId: string) => {
    if (confirm('Are you sure you want to delete this template?')) {
      setTemplates(templates.filter(template => template.id !== templateId));
    }
  };

  const handleSetDefault = (templateId: string) => {
    setTemplates(templates.map(template => ({
      ...template,
      isDefault: template.id === templateId
    })));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Email Templates</h2>
        <button
          onClick={handleAddTemplate}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors !rounded-button"
        >
          <i className="ri-add-line mr-2"></i>
          Add Template
        </button>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {templates.map((template) => (
          <div key={template.id} className="bg-white rounded-xl shadow-sm p-6 card-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center">
                  <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                  {template.isDefault && (
                    <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Last modified: {template.lastModified}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEditTemplate(template)}
                  className="text-blue-600 hover:text-blue-800 !rounded-button"
                >
                  <i className="ri-edit-line text-lg"></i>
                </button>
                {!template.isDefault && (
                  <button
                    onClick={() => handleSetDefault(template.id)}
                    className="text-green-600 hover:text-green-800 !rounded-button"
                  >
                    <i className="ri-star-line text-lg"></i>
                  </button>
                )}
                <button
                  onClick={() => handleDeleteTemplate(template.id)}
                  className="text-red-600 hover:text-red-800 !rounded-button"
                >
                  <i className="ri-delete-bin-line text-lg"></i>
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <div className="p-3 bg-gray-50 rounded-lg border">
                  <p className="text-sm text-gray-900">{template.subject}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content Preview</label>
                <div className="p-3 bg-gray-50 rounded-lg border max-h-32 overflow-y-auto">
                  <p className="text-sm text-gray-900 whitespace-pre-wrap">{template.content}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Template Variables Info */}
      <div className="bg-white rounded-xl shadow-sm p-6 card-shadow">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <i className="ri-code-line mr-2 text-blue-600"></i>
          Available Variables
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <code className="text-blue-800 font-medium">{'{{name}}'}</code>
            <p className="text-sm text-blue-600 mt-1">Recipient's name</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <code className="text-green-800 font-medium">{'{{email}}'}</code>
            <p className="text-sm text-green-600 mt-1">Recipient's email</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <code className="text-purple-800 font-medium">{'{{company}}'}</code>
            <p className="text-sm text-purple-600 mt-1">Company name</p>
          </div>
          <div className="p-3 bg-yellow-50 rounded-lg">
            <code className="text-yellow-800 font-medium">{'{{date}}'}</code>
            <p className="text-sm text-yellow-600 mt-1">Current date</p>
          </div>
          <div className="p-3 bg-red-50 rounded-lg">
            <code className="text-red-800 font-medium">{'{{position}}'}</code>
            <p className="text-sm text-red-600 mt-1">Position applying for</p>
          </div>
          <div className="p-3 bg-indigo-50 rounded-lg">
            <code className="text-indigo-800 font-medium">{'{{sender}}'}</code>
            <p className="text-sm text-indigo-600 mt-1">Sender's name</p>
          </div>
        </div>
      </div>

      {/* Add/Edit Template Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              {editingTemplate ? 'Edit Template' : 'Add New Template'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Template Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter template name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject Line</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter email subject"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  rows={10}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter email content..."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingTemplate(null);
                  setFormData({ name: '', subject: '', content: '' });
                }}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors !rounded-button"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTemplate}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors !rounded-button"
              >
                {editingTemplate ? 'Update' : 'Save'} Template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}