import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, X, Image, AlertCircle, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";

const UploadSection = ({ onUploadComplete }: { onUploadComplete: (result: any) => void }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, etc.)",
      });
      return;
    }
    
    setError(null);
    
    setFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setUploading(true);
    setProgress(0);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          variant: "destructive",
          title: "Authentication required",
          description: "Please sign in to save scan results",
        });
        setUploading(false);
        return;
      }
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;
      
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 5;
        setProgress(Math.min(currentProgress, 95));
        
        if (currentProgress >= 95) {
          clearInterval(interval);
        }
      }, 150);
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('scan_images')
        .upload(filePath, file);
      
      if (uploadError) {
        throw new Error(uploadError.message);
      }
      
      const { data: { publicUrl } } = supabase.storage
        .from('scan_images')
        .getPublicUrl(filePath);
      
      const result = await simulateAnalysis(file.name, publicUrl, user.id);
      
      setProgress(100);
      
      setTimeout(() => {
        setUploading(false);
        onUploadComplete(result);
        toast({
          title: "Analysis complete!",
          description: "Your scan has been successfully analyzed and saved.",
        });
      }, 1000);
      
    } catch (error: any) {
      console.error("Upload error:", error);
      setError(error.message || "Failed to upload and analyze image");
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: error.message || "An error occurred during upload and analysis",
      });
      setUploading(false);
    }
  };

  const simulateAnalysis = async (imageName: string, imageUrl: string, userId: string) => {
    const result = {
      timestamp: new Date().toISOString(),
      imageName: imageName,
      detectionResult: Math.random() > 0.7 ? "abnormal" : "normal",
      confidence: (Math.random() * 20 + 80).toFixed(2) + "%",
      biomarkers: {
        p53: Math.random().toFixed(2),
        ki67: Math.random().toFixed(2),
        her2: Math.random().toFixed(2),
      },
      recommendations: [
        "Review with healthcare provider",
        "Consider follow-up scan in 3 months",
        "Maintain regular screening schedule"
      ],
      imageUrl: imageUrl
    };
    
    const { data, error } = await supabase
      .from('scan_results')
      .insert({
        user_id: userId,
        image_name: imageName,
        detection_result: result.detectionResult,
        confidence: result.confidence,
        biomarkers: result.biomarkers,
        recommendations: result.recommendations,
        image_url: imageUrl
      })
      .select();
    
    if (error) {
      console.error("Error saving scan results:", error);
      throw new Error("Failed to save scan results to database");
    }
    
    return result;
  };

  const resetUpload = () => {
    setFile(null);
    setPreview(null);
    setProgress(0);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        <span className="text-gradient bg-gradient-to-r from-cancer-blue to-cancer-purple bg-clip-text text-transparent">
          Upload & Diagnose
        </span>
      </h2>
      
      {!file ? (
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            isDragging
              ? "border-cancer-blue bg-cancer-blue/5"
              : "border-gray-300 hover:border-cancer-blue/50 hover:bg-gray-50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInput}
            className="hidden"
            accept="image/*"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className="mb-4 w-20 h-20 rounded-full bg-cancer-blue/10 flex items-center justify-center">
              <Upload className="w-10 h-10 text-cancer-blue" />
            </div>
            
            <h3 className="text-xl font-bold mb-2">Drop your image here</h3>
            <p className="text-gray-500 mb-4">or click to browse</p>
            
            <p className="text-sm text-gray-400">
              Supports JPG, PNG, and TIFF (max 10MB)
            </p>
          </motion.div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-cancer-blue/20 overflow-hidden"
        >
          <div className="bg-cancer-blue/5 p-4 flex justify-between items-center">
            <div className="flex items-center">
              <Image className="w-5 h-5 text-cancer-blue mr-2" />
              <span className="font-medium truncate max-w-[200px]">
                {file.name}
              </span>
            </div>
            <button 
              onClick={resetUpload}
              className="p-1 rounded-full hover:bg-white/50 text-gray-500"
            >
              <X size={18} />
            </button>
          </div>
          
          <div className="p-4 bg-black/5 flex justify-center">
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="max-h-64 rounded-lg object-contain"
              />
            )}
          </div>
          
          {error && (
            <div className="p-3 bg-red-50 flex items-center text-red-700 text-sm">
              <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
              {error}
            </div>
          )}
          
          {uploading && (
            <div className="p-4 bg-white">
              <div className="flex justify-between text-sm mb-1">
                <span>Analyzing image...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
          
          <div className="p-4 bg-white flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={resetUpload}
              className="mr-2"
              disabled={uploading}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleUpload}
              disabled={uploading || !!error}
              className="bg-cancer-blue hover:bg-cancer-teal"
            >
              {uploading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center">
                  <Check className="mr-2 h-4 w-4" />
                  Analyze Image
                </span>
              )}
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default UploadSection;
