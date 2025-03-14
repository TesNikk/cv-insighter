import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface ReportData {
  id: number;
  name: string;
  email: string;
}

const Report = () => {
  const router = useRouter();
  const { id } = router.query; // Get the dynamic ID from URL
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; // Ensure ID is available before fetching
    console.log("Fetching report with ID:", id);
    const fetchReport = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}cv/${id}`, {
          method: "GET", 
          headers: new Headers({
            "ngrok-skip-browser-warning": "69420", 
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch report: ${response.status}`);
        }

        const data = await response.json();
        console.log("Report data:", data);

        setReportData(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchReport();
  }, [id]);

  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!reportData) return <p>Loadinghhd a...</p>;

  return (
    <div>
      <h2>Report Details</h2>
      <p>
        <strong>ID:</strong> {reportData.id}
      </p>
      <p>
        <strong>Name:</strong> {reportData.name}
      </p>
      <p>
        <strong>Email:</strong> {reportData.email}
      </p>
    </div>
  );
};

export default Report;
