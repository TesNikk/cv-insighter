import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Loading from "./Loading";

interface CVData {
  id: number;
  email: string;
  name: string;
  experience: string[];
  summary: string;
  phone: string;
  education: string[];
  skill: string[];
}

const AllCV = () => {
  const router = useRouter();
  const [cvData, setCvData] = useState<CVData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchCVData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}`, {
          method: "GET",
          headers: new Headers({
            "ngrok-skip-browser-warning": "69420",
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setCvData(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCVData();
  }, []);

  const handleCardClick = (id: number) => {
    router.push(`/review/${id}`);
  };

  const toggleSelection = (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); // Prevent triggering the card click

    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const clearSelection = () => {
    setSelectedIds([]);
  };

  const handleCompareClick = () => {
    // Save selected IDs to local storage
    localStorage.setItem("selectedCVIds", JSON.stringify(selectedIds));
    // Navigate to the BestSuited page
    router.push("/bestSuited");
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center text-red-500">
        Error loading profiles: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All CV Profiles</h1>
        {selectedIds.length > 0 && (
          <div className="flex space-x-2">
            <span className="py-2 px-3 bg-gray-100 rounded">
              {selectedIds.length} selected
            </span>
            <button
              onClick={clearSelection}
              className="py-2 px-3 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
            >
              Clear
            </button>
            <button
              onClick={handleCompareClick}
              className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Compare
            </button>
          </div>
        )}
      </div>

      {cvData.length === 0 ? (
        <p className="text-center">No CV profiles found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cvData.map((cv) => (
            <div
              key={cv.id}
              className={`relative bg-gray-200 shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer ${
                selectedIds.includes(cv.id) ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => handleCardClick(cv.id)}
            >
              <div
                className="absolute top-4 right-4 w-5 h-5 rounded border border-gray-400 flex items-center justify-center bg-white"
                onClick={(e) => toggleSelection(e, cv.id)}
              >
                {selectedIds.includes(cv.id) && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-blue-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {cv.name}
              </h2>
              <p className="text-gray-600">{cv.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllCV;
