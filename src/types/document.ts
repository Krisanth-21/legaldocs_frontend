export interface DocumentAnalysis {
  id: string;
  fileName: string;
  fileSize: number;
  uploadDate: Date;
  summary: string;
  key_clauses: string[];
  risks: string[];
  next_steps: string[];
  analysisComplete: boolean;
}

export interface AnalysisStep {
  id: string;
  label: string;
  completed: boolean;
  current: boolean;
}