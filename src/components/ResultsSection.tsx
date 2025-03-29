
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileCheck, AlertCircle, ArrowRight, Download, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";

interface ResultsProps {
  results: {
    timestamp: string;
    imageName?: string;
    detectionResult: string;
    confidence: string;
    biomarkers: {
      p53: number;
      ki67: number;
      her2: number;
    };
    recommendations: string[];
  } | null;
}

const ResultsSection = ({ results }: ResultsProps) => {
  const [showCard, setShowCard] = useState(false);
  
  useEffect(() => {
    if (results) {
      setShowCard(true);
    }
  }, [results]);
  
  if (!results) return null;
  
  const isAbnormal = results.detectionResult === "abnormal";
  
  const biomarkerData = [
    {
      name: "p53",
      value: parseFloat(results.biomarkers.p53.toString()),
      threshold: 0.5,
    },
    {
      name: "Ki-67",
      value: parseFloat(results.biomarkers.ki67.toString()),
      threshold: 0.3,
    },
    {
      name: "HER2",
      value: parseFloat(results.biomarkers.her2.toString()),
      threshold: 0.4,
    }
  ];
  
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  return (
    <AnimatePresence>
      {showCard && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl mx-auto p-6"
        >
          <Card className="overflow-hidden border-2 border-cancer-blue/20 shadow-lg">
            <CardHeader className={`${
              isAbnormal ? "bg-red-50" : "bg-green-50"
            }`}>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center text-2xl mb-2">
                    {isAbnormal ? (
                      <>
                        <AlertCircle className="w-6 h-6 text-red-500 mr-2" />
                        <span className="text-red-700">Abnormality Detected</span>
                      </>
                    ) : (
                      <>
                        <FileCheck className="w-6 h-6 text-green-500 mr-2" />
                        <span className="text-green-700">All Clear!</span>
                      </>
                    )}
                  </CardTitle>
                  <CardDescription>
                    Scan completed on {formatDate(results.timestamp)}
                  </CardDescription>
                </div>
                <div className="bg-white rounded-full h-12 w-12 flex items-center justify-center border border-gray-200 shadow-sm">
                  <span className="text-sm font-bold text-cancer-blue">
                    {results.confidence}
                  </span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              <div className="mb-6">
                <h4 className="text-lg font-bold mb-3">Biomarker Analysis</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={biomarkerData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 1]} />
                      <Tooltip 
                        formatter={(value) => [value.toFixed(2), 'Value']}
                        labelFormatter={(label) => `Biomarker: ${label}`}
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #ccc',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        {biomarkerData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`}
                            fill={entry.value > entry.threshold ? '#D946EF' : '#1EAEDB'} 
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-bold mb-3">Recommendations</h4>
                <ul className="space-y-2">
                  {results.recommendations.map((rec, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start"
                    >
                      <ArrowRight className="w-4 h-4 text-cancer-blue mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{rec}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </CardContent>
            
            <CardFooter className="bg-gray-50 px-6 py-4 flex justify-between">
              <div className="text-sm text-gray-500">
                {results.imageName && `File analyzed: ${results.imageName}`}
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex items-center">
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </Button>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Share className="w-4 h-4 mr-1" />
                  Share
                </Button>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResultsSection;
