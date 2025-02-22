import React, { useCallback } from 'react';
import { Upload, FileType } from 'lucide-react';

interface DataUploadProps {
  onUpload: (file: File) => void;
}

function DataUpload({ onUpload }: DataUploadProps) {
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) {
        onUpload(file);
      }
    },
    [onUpload]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onUpload(file);
      }
    },
    [onUpload]
  );

  return (
    <div className="text-center">
      <div
        className="max-w-xl mx-auto px-6 py-10 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 transition-colors duration-200 cursor-pointer"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => document.getElementById('fileInput')?.click()}
      >
        <input
          id="fileInput"
          type="file"
          className="hidden"
          accept=".csv,.xlsx"
          onChange={handleFileInput}
        />
        <div className="flex flex-col items-center">
          <Upload className="w-12 h-12 text-gray-400" />
          <p className="mt-4 text-lg font-medium text-gray-900">
            Upload your dataset
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Drag and drop your CSV or Excel file here, or click to browse
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Supported File Types
        </h3>
        <div className="flex justify-center space-x-6">
          {[
            { type: 'CSV', description: 'Comma-separated values' },
            { type: 'XLSX', description: 'Excel spreadsheet' },
          ].map((format) => (
            <div
              key={format.type}
              className="flex items-center p-4 bg-gray-50 rounded-lg"
            >
              <FileType className="w-6 h-6 text-indigo-500 mr-2" />
              <div className="text-left">
                <p className="font-medium text-gray-900">{format.type}</p>
                <p className="text-sm text-gray-500">{format.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DataUpload;