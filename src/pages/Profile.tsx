
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User, Mail, Calendar, Edit } from "lucide-react";

const Profile = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    created_at: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          setUserData({
            id: user.id,
            name: user.user_metadata?.full_name || "User",
            email: user.email || "",
            created_at: user.created_at || "",
          });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load user profile",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    getUserProfile();
  }, [toast]);
  
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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
                  <span className="text-gradient bg-gradient-to-r from-cancer-blue to-cancer-purple bg-clip-text text-transparent">
                    My Profile
                  </span>
                </h1>
                <p className="text-gray-600">
                  Manage your account details and preferences.
                </p>
              </div>
            </motion.div>
            
            {isLoading ? (
              <div className="bg-white rounded-xl border border-cancer-blue/10 shadow-sm p-6 flex justify-center">
                <div className="w-8 h-8 border-4 border-t-cancer-blue border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-white rounded-xl border border-cancer-blue/10 shadow-sm p-6"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cancer-blue to-cancer-purple flex items-center justify-center text-white text-3xl font-bold">
                      {userData.name.charAt(0)}
                    </div>
                    
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-1">{userData.name}</h2>
                      <div className="flex items-center text-gray-500 mb-4">
                        <Mail className="w-4 h-4 mr-2" />
                        <span>{userData.email}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-500">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>Member since {formatDate(userData.created_at)}</span>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="flex items-center">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white rounded-xl border border-cancer-blue/10 shadow-sm p-6"
                >
                  <h2 className="text-xl font-semibold mb-6">Account Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Full Name</p>
                      <div className="flex items-center p-3 border border-gray-200 rounded-lg">
                        <User className="w-5 h-5 text-gray-400 mr-3" />
                        <span>{userData.name}</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Email Address</p>
                      <div className="flex items-center p-3 border border-gray-200 rounded-lg">
                        <Mail className="w-5 h-5 text-gray-400 mr-3" />
                        <span>{userData.email}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white rounded-xl border border-cancer-blue/10 shadow-sm p-6"
                >
                  <h2 className="text-xl font-semibold mb-6">Account Statistics</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Total Scans</p>
                      <p className="text-2xl font-bold mt-1">16</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Normal Results</p>
                      <p className="text-2xl font-bold text-green-600 mt-1">12</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Abnormal Results</p>
                      <p className="text-2xl font-bold text-red-600 mt-1">4</p>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
