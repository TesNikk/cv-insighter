import React, { useState, useEffect } from "react";

interface BestSuitedProps {
  selectedIds: number[];
  onClose: () => void;
}

interface IndustryRecommendation {
  cv_index: number;
  industry: string;
}

interface AnalysisResponse {
  industry_recommendations: IndustryRecommendation[];
  summary_analysis: string;
}

const BestSuited: React.FC<BestSuitedProps> = ({ selectedIds, onClose }) => {
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComparison = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}compare_cv`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "ngrok-skip-browser-warning": "69420",
            },
            body: JSON.stringify({ cv_list: selectedIds }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setResult(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchComparison();
  }, [selectedIds]);

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
      <h2 className="text-2xl font-bold mb-6">Comparison Results</h2>

      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
          <p className="mt-2">Analyzing CVs...</p>
        </div>
      ) : error ? (
        <div className="text-red-500 p-4 bg-red-50 rounded">
          <p className="font-semibold">Error</p>
          <p>{error}</p>
        </div>
      ) : result ? (
        <div>
          <h3 className="text-lg font-semibold mb-3">
            Industry Recommendations
          </h3>
          <ul className="list-disc list-inside space-y-1 mb-6">
            {result.industry_recommendations.map((rec, index) => (
              <li key={index} className="ml-2">
                CV {selectedIds[rec.cv_index]}:{" "}
                <span className="font-medium">{rec.industry}</span>
              </li>
            ))}
          </ul>

          <h3 className="text-lg font-semibold mb-2">Analysis Summary</h3>
          <p className="text-gray-700">{result.summary_analysis}</p>
        </div>
      ) : (
        <p className="text-center py-4">No data available</p>
      )}

      <div className="mt-6 text-center">
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BestSuited;
