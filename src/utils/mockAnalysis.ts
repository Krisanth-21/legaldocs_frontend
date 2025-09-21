import { DocumentAnalysis, AnalysisStep } from '../types/document';
import { BackendAnalysisResponse } from '../services/api';

export const createAnalysisFromBackend = (file: File, backendResponse: BackendAnalysisResponse): DocumentAnalysis => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    fileName: file.name,
    fileSize: file.size,
    uploadDate: new Date(),
    analysisComplete: true,
    summary: backendResponse.analysis.summary,
    key_clauses: backendResponse.analysis.key_clauses,
    risks: backendResponse.analysis.risks,
    next_steps: backendResponse.analysis.next_steps,
  };
};

export const getAnalysisSteps = (): AnalysisStep[] => [
  {
    id: '1',
    label: 'Uploading and parsing document structure',
    completed: false,
    current: false
  },
  {
    id: '2',
    label: 'Extracting text and identifying key sections',
    completed: false,
    current: false
  },
  {
    id: '3',
    label: 'Analyzing parties and stakeholders',
    completed: false,
    current: false
  },
  {
    id: '4',
    label: 'Identifying terms, conditions, and obligations',
    completed: false,
    current: false
  },
  {
    id: '5',
    label: 'Assessing legal risks and compliance issues',
    completed: false,
    current: false
  },
  {
    id: '6',
    label: 'Generating comprehensive summary and insights',
    completed: false,
    current: false
  }
];