
import { useState } from "react";
import { motion } from "framer-motion";
import DashboardSidebar from "@/components/DashboardSidebar";
import UploadSection from "@/components/UploadSection";
import ResultsSection from "@/components/ResultsSection";
import ScanHistory from "@/components/ScanHistory";

const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [scanResults, setScanResults] = useState<any>(null);
  
  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem("user") || '{"name":"Guest"}');
  
  const handleUploadComplete = (results: any) => {
    setScanResults(results);
    
    // Scroll to results section after a short delay
    setTimeout(() => {
      const resultsSection = document.getElementById("results-section");
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 500);
  };
  
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <DashboardSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="p-6">
          <div className="flex flex-col gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-xl border border-cancer-blue/10 shadow-sm p-6">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  <span className="text-gray-800">Hey, </span>
                  <span className="text-gradient bg-gradient-to-r from-cancer-blue to-cancer-purple bg-clip-text text-transparent">
                    {userData.name}!
                  </span>
                </h1>
                <p className="text-gray-600">
                  Ready to Scan and Conquer? Upload your images for quirky yet powerful cancer detection.
                </p>
              </div>
            </motion.div>
            
            <UploadSection onUploadComplete={handleUploadComplete} />
            
            <div id="results-section">
              <ResultsSection results={scanResults} />
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl border border-cancer-blue/10 shadow-sm p-6"
            >
              <ScanHistory />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
