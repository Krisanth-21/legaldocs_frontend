import React from 'react';
import { CheckCircle, Clock, FileText } from 'lucide-react';
import { AnalysisStep } from '../types/document';

interface AnalysisProgressProps {
  steps: AnalysisStep[];
  fileName: string;
}

const AnalysisProgress: React.FC<AnalysisProgressProps> = ({ steps, fileName }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Analyzing Document</h2>
        <p className="text-gray-600">Processing: {fileName}</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                {step.completed ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : step.current ? (
                  <div className="w-6 h-6 border-2 border-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  </div>
                ) : (
                  <Clock className="w-6 h-6 text-gray-300" />
                )}
              </div>
              
              <div className="flex-1">
                <p className={`font-medium ${
                  step.completed 
                    ? 'text-green-700' 
                    : step.current 
                      ? 'text-blue-700' 
                      : 'text-gray-400'
                }`}>
                  {step.label}
                </p>
              </div>

              {step.current && (
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8">
          <div className="bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ 
                width: `${(steps.filter(s => s.completed).length / steps.length) * 100}%` 
              }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2 text-center">
            {steps.filter(s => s.completed).length} of {steps.length} steps completed
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalysisProgress;