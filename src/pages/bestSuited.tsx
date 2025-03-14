// 
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import BestSuited from "@/app/components/BestSuited";
import Layout from "@/app/components/Layout";

interface SelectedCV {
  id: number;
  name: string;
}

const BestSuitedPage = () => {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectedCVs, setSelectedCVs] = useState<SelectedCV[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark that we're on the client
    setIsClient(true);
    
    // Retrieve selected CVs with names from localStorage
    const storedCVsWithNames = localStorage.getItem('selectedCVsWithNames');
    if (storedCVsWithNames) {
      const parsedCVs = JSON.parse(storedCVsWithNames) as SelectedCV[];
      setSelectedCVs(parsedCVs);
      // Also set the IDs for backward compatibility
      setSelectedIds(parsedCVs.map(cv => cv.id));
    } else {
      // Fallback to original method
      const storedIds = localStorage.getItem('selectedCVIds');
      if (storedIds) {
        setSelectedIds(JSON.parse(storedIds));
      } else {
        // For testing purposes, provide default IDs
        setSelectedIds([34, 35]);
        
        // Uncomment this for production to redirect if no IDs found
        // router.push('/');
      }
    }
  }, []);

  const handleClose = () => {
    localStorage.removeItem('selectedCVIds');
    localStorage.removeItem('selectedCVsWithNames');
    router.push('/all-cv');
  };

  // Initial SSR render - show a simple loading state
  if (!isClient) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
            <p className="mt-2">Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex items-center justify-center py-10">
        {selectedIds.length > 0 ? (
          <BestSuited
            selectedIds={selectedIds}
            selectedCVs={selectedCVs}
            onClose={handleClose}
          />
        ) : (
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <p className="text-lg text-gray-700">No CVs selected for comparison.</p>
            <button
              onClick={() => router.push('/')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Return to CV List
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BestSuitedPage;