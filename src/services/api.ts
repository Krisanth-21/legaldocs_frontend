const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-url.onrender.com' 
  : 'http://localhost:8000';

export interface BackendAnalysisResponse {
  filename: string;
  analysis: {
    summary: string;
    key_clauses: string[];
    risks: string[];
    next_steps: string[];
  };
}

export const analyzeDocument = async (file: File): Promise<BackendAnalysisResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/analyze/`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Analysis failed: ${response.statusText}`);
  }

  return response.json();
};