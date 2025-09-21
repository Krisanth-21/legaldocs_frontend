import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import FileUpload from './components/FileUpload';
import AnalysisProgress from './components/AnalysisProgress';
import ResultsDashboard from './components/ResultsDashboard';
import { DocumentAnalysis, AnalysisStep } from './types/document';
import { createAnalysisFromBackend, getAnalysisSteps } from './utils/mockAnalysis';
import { analyzeDocument } from './services/api';

function App() {
  const [currentView, setCurrentView] = useState<'upload' | 'analyzing' | 'results' | 'error'>('upload');
  const [analysis, setAnalysis] = useState<DocumentAnalysis | null>(null);
  const [analysisSteps, setAnalysisSteps] = useState<AnalysisStep[]>([]);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (file: File) => {
    setUploadedFileName(file.name);
    setCurrentView('analyzing');
    setAnalysisSteps(getAnalysisSteps());
    
    // Perform real analysis
    performAnalysis(file);
  };

  const performAnalysis = async (file: File) => {
    const steps = getAnalysisSteps();
    let currentStepIndex = 0;

    // Start progress animation
    const progressInterval = setInterval(() => {
      if (currentStepIndex < steps.length) {
        setAnalysisSteps(prevSteps => 
          prevSteps.map((step, index) => ({
            ...step,
            completed: index < currentStepIndex,
            current: index === currentStepIndex
          }))
        );
        currentStepIndex++;
      } else {
        clearInterval(progressInterval);
      }
    }, 800);

    try {
      // Call the real API
      const backendResponse = await analyzeDocument(file);
      
      // Clear the progress interval
      clearInterval(progressInterval);
      
      // Mark all steps as completed
      setAnalysisSteps(prevSteps => 
        prevSteps.map(step => ({
          ...step,
          completed: true,
          current: false
        }))
      );

      // Create analysis from backend response
      const analysisResult = createAnalysisFromBackend(file, backendResponse);
      setAnalysis(analysisResult);
      setCurrentView('results');
      
    } catch (error) {
      clearInterval(progressInterval);
      console.error('Analysis failed:', error);
      
      setError(error instanceof Error ? error.message : 'Unknown error occurred');
      setCurrentView('error');
    }
  };

  const handleStartOver = () => {
    setCurrentView('upload');
    setAnalysis(null);
    setAnalysisSteps([]);
    setUploadedFileName('');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        {currentView === 'upload' && (
          <FileUpload onFileUpload={handleFileUpload} />
        )}
        
        {currentView === 'analyzing' && (
          <AnalysisProgress 
            steps={analysisSteps} 
            fileName={uploadedFileName}
          />
        )}
        
        {currentView === 'results' && analysis && (
          <div>
            <div className="mb-6 text-center">
              <button
                onClick={handleStartOver}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Analyze Another Document
              </button>
            </div>
            <ResultsDashboard analysis={analysis} />
          </div>
        )}

        {currentView === 'error' && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Analysis Failed</h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={handleStartOver}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;