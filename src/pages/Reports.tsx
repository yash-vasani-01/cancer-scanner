
import { useState } from "react";
import { motion } from "framer-motion";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  Legend 
} from 'recharts';
import { Download, Calendar, Filter } from "lucide-react";

const Reports = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Sample data for charts
  const scanTypeData = [
    { name: 'Normal', value: 12, color: '#10b981' },
    { name: 'Abnormal', value: 4, color: '#ef4444' },
  ];
  
  const scanHistoryData = [
    { month: 'Jan', scans: 2 },
    { month: 'Feb', scans: 3 },
    { month: 'Mar', scans: 1 },
    { month: 'Apr', scans: 4 },
    { month: 'May', scans: 2 },
    { month: 'Jun', scans: 4 },
  ];
  
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
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">
                      <span className="text-gradient bg-gradient-to-r from-cancer-blue to-cancer-purple bg-clip-text text-transparent">
                        Reports & Analytics
                      </span>
                    </h1>
                    <p className="text-gray-600">
                      View insights from your scan history.
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <Button variant="outline" className="flex items-center">
                      <Calendar size={16} className="mr-2" />
                      Time Range
                    </Button>
                    <Button variant="outline" className="flex items-center">
                      <Download size={16} className="mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-xl border border-cancer-blue/10 shadow-sm p-6"
              >
                <h2 className="text-lg font-semibold mb-6">Scan Results Overview</h2>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={scanTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {scanTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl border border-cancer-blue/10 shadow-sm p-6"
              >
                <h2 className="text-lg font-semibold mb-6">Scan Activity Over Time</h2>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={scanHistoryData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="scans" fill="#6366f1" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl border border-cancer-blue/10 shadow-sm p-6"
            >
              <h2 className="text-lg font-semibold mb-6">Detailed Analytics</h2>
              <p className="text-gray-500 text-center py-12">
                More detailed analytics will be available based on your scan history.
                <br />Continue scanning to get personalized insights.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
