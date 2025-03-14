import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Loading from "./Loading";

const AllCV = () => {
  const router = useRouter();
  const [cvData, setCvData] = useState<CVData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center">
        {/* <h1 className="mb-2 text-2xl"> Loading CV profiles</h1> */}
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
      <h1 className="flex text-2xl font-bold mb-6 justify-center">All CV Profiles</h1>
      {cvData.length === 0 ? (
        <p className="text-center">No CV profiles found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cvData.map((cv) => (
            <div
              key={cv.id}
              className="bg-gray-200 shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => handleCardClick(cv.id)}
            >
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
