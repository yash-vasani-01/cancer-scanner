
import React from 'react';
import { safeToFixed } from '@/utils/typeUtils';

interface ResultData {
  probability: number | string;
  diagnosis: string;
  confidence: number | string;
  recommendation: string;
}

interface ResultsSectionProps {
  results: ResultData | null;
  isLoading?: boolean;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ 
  results, 
  isLoading = false 
}) => {
  if (isLoading) {
    return (
      <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="space-y-4 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
        <p className="text-center text-gray-500">
          No results to display. Upload an image to get started.
        </p>
      </div>
    );
  }

  const { probability, diagnosis, confidence, recommendation } = results;

  return (
    <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-md">
      <h3 className="text-xl font-bold mb-4 text-gradient bg-gradient-to-r from-cancer-purple to-cancer-pink bg-clip-text text-transparent">
        Scan Results
      </h3>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Probability:</span>
          <span className="font-bold">{safeToFixed(probability)}%</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Diagnosis:</span>
          <span 
            className={`font-bold ${
              diagnosis.toLowerCase().includes("normal") 
                ? "text-green-600" 
                : "text-red-600"
            }`}
          >
            {diagnosis}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Confidence:</span>
          <span className="font-bold">{safeToFixed(confidence)}%</span>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-100">
          <h4 className="font-medium text-gray-800 mb-2">Recommendation:</h4>
          <p className="text-gray-600">{recommendation}</p>
        </div>
      </div>
    </div>
  );
};

export default ResultsSection;
