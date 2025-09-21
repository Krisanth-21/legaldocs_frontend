import React from 'react';
import { 
  Download, 
  Users, 
  Target, 
  Calendar, 
  Shield, 
  Scale, 
  AlertTriangle, 
  CheckCircle,
  FileText,
  Clock
} from 'lucide-react';
import { DocumentAnalysis } from '../types/document';
import { generatePDF } from '../utils/pdfGenerator';

interface ResultsDashboardProps {
  analysis: DocumentAnalysis;
}

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ analysis }) => {
  const handleDownloadPDF = () => {
    generatePDF(analysis);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Analysis Complete</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                <span className="flex items-center space-x-1">
                  <FileText className="w-4 h-4" />
                  <span>{analysis.fileName}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span>{formatFileSize(analysis.fileSize)}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{analysis.uploadDate.toLocaleDateString()}</span>
                </span>
              </div>
            </div>
          </div>
          
          <button
            onClick={handleDownloadPDF}
            className="flex items-center space-x-2 bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors"
          >
            <Download className="w-5 h-5" />
            <span>Download Report</span>
          </button>
        </div>
      </div>

      {/* AI Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">AI Summary</h2>
            <p className="text-gray-700 leading-relaxed">{analysis.summary}</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
        {/* Key Clauses */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Key Clauses & Important Points</h3>
          </div>
          <div className="space-y-3">
            {analysis.key_clauses.map((clause, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-blue-800">{clause}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Risks and Next Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Risks */}
        <div className="bg-white rounded-xl border border-red-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <h3 className="text-lg font-semibold text-gray-900">Potential Risks & Concerns</h3>
          </div>
          <div className="space-y-3">
            {analysis.risks.map((risk, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg border border-red-100">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <span className="text-red-800">{risk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-xl border border-green-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Recommended Next Steps</h3>
          </div>
          <div className="space-y-3">
            {analysis.next_steps.map((step, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-100">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-green-800">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDashboard;