import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "./Loading";

interface UserInfo {
  //id: number;
  name: string;
  email: string;
}

interface CVReport {
  rating: number;
  rating_analysis: string;
  profession_recommendation: string;
}

const Report = () => {
  const router = useRouter();
  const { id } = router.query; // Get the dynamic ID from URL
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [cvReport, setCvReport] = useState<CVReport | null>(null);
  const [error, setError] = useState<string | null> (null);

  useEffect(() => {
    if (!id) return; // Ensure ID is available before fetching
    console.log("Fetching data with ID:", id);

    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}cv/${id}`, {
          method: "GET",
          headers: new Headers({
            "ngrok-skip-browser-warning": "69420",
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch user info: ${response.status}`);
        }

        const data = await response.json();
        console.log("User info:", data);

        setUserInfo(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    const fetchCVReport = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}review_cv/${id}`, {
          method: "GET",
          headers: new Headers({
            "ngrok-skip-browser-warning": "69420",
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch CV report: ${response.status}`);
        }

        const data = await response.json();
        console.log("CV Report:", data);

        setCvReport(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchUserInfo();
    fetchCVReport();
  }, [id]);

  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!userInfo || !cvReport) {
    return (
      <Loading />
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="shadow-lg rounded-lg p-6 max-w-md w-full bg-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 align-middle flex justify-center">Report Details</h2>
        <div className="space-y-2">
          {/* <p><b>ID:</b> {userInfo.id}</p> */}
          <p><b>Name:</b> {userInfo.name}</p>
          <p><b>Email:</b> {userInfo.email}</p>
          <p><b>Rating:</b> {cvReport.rating} / 10</p>
          <p><b>Rating Analysis:</b> {cvReport.rating_analysis}</p>
          <p><b>Profession Recommendation:</b> {cvReport.profession_recommendation}</p>
        </div>
      </div>
    </div>
  );
};

export default Report;
