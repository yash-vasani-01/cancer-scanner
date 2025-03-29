
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import {
  Home,
  User,
  FileText,
  Settings,
  Bell,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Activity
} from "lucide-react";

interface DashboardSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

const DashboardSidebar = ({ isCollapsed, setIsCollapsed }: DashboardSidebarProps) => {
  // Get username from localStorage
  const userData = JSON.parse(localStorage.getItem("user") || '{"name":"Guest"}');
  
  const navItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: Activity, label: "Scans", path: "/dashboard" },
    { icon: FileText, label: "Reports", path: "/dashboard" },
    { icon: User, label: "Profile", path: "/dashboard" },
    { icon: Bell, label: "Notifications", path: "/dashboard" },
    { icon: Settings, label: "Settings", path: "/dashboard" },
    { icon: HelpCircle, label: "Help", path: "/dashboard" },
  ];

  const handleLogout = () => {
    toast({
      title: "Logging out...",
      description: "You've been successfully logged out.",
    });
    localStorage.removeItem("user");
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };

  return (
    <div
      className={`h-screen bg-white border-r border-cancer-blue/10 shadow-sm flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-cancer-blue/10">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cancer-blue to-cancer-purple flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-lg">CS</span>
          </div>
          {!isCollapsed && (
            <span className="text-lg font-exo font-bold text-cancer-dark">
              Cell<span className="text-cancer-blue">Scan</span>
            </span>
          )}
        </Link>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* User info */}
      <div className={`p-4 border-b border-cancer-blue/10 ${isCollapsed ? "flex justify-center" : ""}`}>
        {isCollapsed ? (
          <div className="w-10 h-10 rounded-full bg-cancer-purple/10 flex items-center justify-center">
            <span className="text-cancer-purple font-bold">{userData.name.charAt(0)}</span>
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-cancer-purple/10 flex items-center justify-center">
              <span className="text-cancer-purple font-bold">{userData.name.charAt(0)}</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Hey, {userData.name}!</h4>
              <p className="text-xs text-gray-500">Ready to scan & conquer?</p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-cancer-blue/5 text-gray-700 hover:text-cancer-blue transition-colors"
              >
                <item.icon size={20} />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout button */}
      <div className="p-4 border-t border-cancer-blue/10">
        <button
          onClick={handleLogout}
          className={`flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-500 transition-colors ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <LogOut size={20} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
