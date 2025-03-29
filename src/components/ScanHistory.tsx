
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  AlertCircle,
  ChevronRight,
  Clock,
  Search,
  SortAsc,
  SortDesc,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for scan history
const mockHistory = [
  {
    id: "scan-001",
    timestamp: "2023-06-15T14:30:00Z",
    result: "normal",
    confidence: "98.7%",
    imageName: "lung-scan-1.jpg",
  },
  {
    id: "scan-002",
    timestamp: "2023-05-28T09:15:00Z",
    result: "abnormal",
    confidence: "89.2%",
    imageName: "brain-scan-3.jpg",
  },
  {
    id: "scan-003",
    timestamp: "2023-04-10T11:20:00Z",
    result: "normal",
    confidence: "97.5%",
    imageName: "chest-xray-2.jpg",
  },
  {
    id: "scan-004",
    timestamp: "2023-03-02T16:45:00Z",
    result: "abnormal",
    confidence: "92.1%",
    imageName: "skin-sample-8.jpg",
  },
];

const ScanHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };
  
  const filteredHistory = mockHistory
    .filter(scan => 
      scan.imageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formatDate(scan.timestamp).toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    });
  
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6">
        <span className="text-gradient bg-gradient-to-r from-cancer-purple to-cancer-pink bg-clip-text text-transparent">
          Scan History
        </span>
      </h2>
      
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search scans..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cancer-blue/30"
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
            className="flex items-center"
          >
            {sortDirection === "asc" ? (
              <SortAsc className="w-4 h-4 mr-1" />
            ) : (
              <SortDesc className="w-4 h-4 mr-1" />
            )}
            {sortDirection === "asc" ? "Oldest" : "Newest"}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="flex items-center"
          >
            <Filter className="w-4 h-4 mr-1" />
            Filter
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider grid grid-cols-12 gap-4">
          <div className="col-span-1">Status</div>
          <div className="col-span-3">Date</div>
          <div className="col-span-4">File Name</div>
          <div className="col-span-2">Confidence</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>
        
        <div className="divide-y divide-gray-100">
          {filteredHistory.length > 0 ? (
            filteredHistory.map((scan, index) => (
              <motion.div
                key={scan.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-gray-50"
              >
                <div className="col-span-1">
                  {scan.result === "normal" ? (
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-100">
                      <Check className="w-4 h-4 text-green-600" />
                    </span>
                  ) : (
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-100">
                      <AlertCircle className="w-4 h-4 text-red-600" />
                    </span>
                  )}
                </div>
                
                <div className="col-span-3 flex items-center">
                  <Clock className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">{formatDate(scan.timestamp)}</span>
                </div>
                
                <div className="col-span-4">
                  <span className="text-sm font-medium text-gray-700">{scan.imageName}</span>
                </div>
                
                <div className="col-span-2">
                  <span className={`text-sm font-medium ${
                    scan.result === "normal" 
                      ? "text-green-600" 
                      : "text-red-600"
                  }`}>
                    {scan.confidence}
                  </span>
                </div>
                
                <div className="col-span-2 text-right">
                  <Button variant="ghost" size="sm" className="text-cancer-blue hover:text-cancer-purple">
                    View Details
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="px-6 py-8 text-center">
              <p className="text-gray-500">No scan history found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScanHistory;
