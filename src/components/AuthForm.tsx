
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff, Check, X } from "lucide-react";

interface AuthFormProps {
  isLogin?: boolean;
}

const AuthForm = ({ isLogin = false }: AuthFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, boolean>>({});
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear validation errors when user types
    if (validationErrors[name]) {
      setValidationErrors({ ...validationErrors, [name]: false });
    }
  };

  const validateForm = () => {
    const errors: Record<string, boolean> = {};
    
    if (!isLogin && !formData.name.trim()) {
      errors.name = true;
    }
    
    if (!formData.email.trim()) {
      errors.email = true;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = true;
    }
    
    if (!formData.password) {
      errors.password = true;
    } else if (formData.password.length < 6) {
      errors.password = true;
    }
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      errors.confirmPassword = true;
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Shake form on validation error
      const form = document.getElementById("auth-form");
      if (form) {
        form.classList.add("animate-shake");
        setTimeout(() => {
          form.classList.remove("animate-shake");
        }, 500);
      }
      
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please check the form for errors.",
      });
      return;
    }
    
    // In a real app, we would make an API call here
    // For now, we'll simulate a successful login/signup
    toast({
      title: isLogin ? "Login Successful" : "Account Created",
      description: isLogin 
        ? "Welcome back to CellScan!" 
        : "Your account has been created successfully.",
    });
    
    // Store user data in localStorage (for demo purposes)
    localStorage.setItem("user", JSON.stringify({
      name: formData.name || "User",
      email: formData.email,
    }));
    
    // Redirect to dashboard
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full p-8 glassmorphism rounded-xl"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">
          {isLogin ? "Welcome Back!" : "Join CellScan"}
        </h2>
        <p className="text-gray-600">
          {isLogin 
            ? "Log in to continue your quirky cancer detection journey" 
            : "Sign up to start your quirky cancer detection journey"}
        </p>
      </div>
      
      <form id="auth-form" onSubmit={handleSubmit} className="space-y-5">
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`form-input ${validationErrors.name ? "border-red-500" : ""}`}
                placeholder="Your Name Here"
              />
              {validationErrors.name && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                  <X size={18} />
                </div>
              )}
            </div>
            {validationErrors.name && (
              <p className="mt-1 text-sm text-red-500">Name is required</p>
            )}
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${validationErrors.email ? "border-red-500" : ""}`}
              placeholder="your.email@example.com"
            />
            {validationErrors.email ? (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                <X size={18} />
              </div>
            ) : formData.email && !validationErrors.email && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
                <Check size={18} />
              </div>
            )}
          </div>
          {validationErrors.email && (
            <p className="mt-1 text-sm text-red-500">Valid email is required</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`form-input pr-10 ${validationErrors.password ? "border-red-500" : ""}`}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {validationErrors.password && (
            <p className="mt-1 text-sm text-red-500">Password must be at least 6 characters</p>
          )}
        </div>
        
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`form-input pr-10 ${validationErrors.confirmPassword ? "border-red-500" : ""}`}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {validationErrors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">Passwords don't match</p>
            )}
          </div>
        )}
        
        {isLogin && (
          <div className="flex justify-end">
            <Link to="#" className="text-sm text-cancer-blue hover:text-cancer-purple">
              Forgot password?
            </Link>
          </div>
        )}
        
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-primary w-full mt-6"
        >
          {isLogin ? "Login!" : "Sign Up!"}
        </motion.button>
        
        <div className="mt-6 text-center text-sm">
          {isLogin ? (
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="text-cancer-blue hover:text-cancer-purple font-medium">
                Sign up
              </Link>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-cancer-blue hover:text-cancer-purple font-medium">
                Log in
              </Link>
            </p>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default AuthForm;
