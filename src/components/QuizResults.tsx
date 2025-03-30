
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Check,
  X,
  AlertTriangle,
  AlertCircle,
  ShieldCheck
} from "lucide-react";

interface RiskAssessment {
  risk_level: string;
  advice: string;
  foods_to_eat: string[];
  foods_to_avoid: string[];
}

interface QuizResultsProps {
  score: number;
  riskAssessment: RiskAssessment | null;
  resetQuiz: () => void;
}

const QuizResults = ({ score, riskAssessment, resetQuiz }: QuizResultsProps) => {
  if (!riskAssessment) {
    return (
      <div className="bg-white rounded-xl border border-cancer-blue/10 shadow-sm p-6">
        <p className="text-center text-gray-600">
          Processing your results... Please wait.
        </p>
      </div>
    );
  }

  // Determine risk level color and icon
  const getRiskLevelInfo = (riskLevel: string) => {
    switch (riskLevel.toLowerCase()) {
      case 'low':
        return {
          color: 'bg-green-100 text-green-700',
          icon: <ShieldCheck className="w-6 h-6 text-green-700" />,
          textColor: 'text-green-700'
        };
      case 'moderate':
        return {
          color: 'bg-yellow-100 text-yellow-700',
          icon: <AlertTriangle className="w-6 h-6 text-yellow-700" />,
          textColor: 'text-yellow-700'
        };
      case 'high':
        return {
          color: 'bg-red-100 text-red-700',
          icon: <AlertCircle className="w-6 h-6 text-red-700" />,
          textColor: 'text-red-700'
        };
      default:
        return {
          color: 'bg-blue-100 text-blue-700',
          icon: <AlertCircle className="w-6 h-6 text-blue-700" />,
          textColor: 'text-blue-700'
        };
    }
  };

  const riskInfo = getRiskLevelInfo(riskAssessment.risk_level);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl border border-cancer-blue/10 shadow-sm p-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Your Risk Assessment</h2>
        <p className="text-gray-600">
          Based on your responses, we've generated the following risk assessment.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center mb-8 gap-6">
        <div className={`p-4 rounded-full ${riskInfo.color}`}>
          {riskInfo.icon}
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold mb-1">Your Score: {score}</h3>
          <div className={`text-lg font-medium ${riskInfo.textColor}`}>
            Risk Level: {riskAssessment.risk_level}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3">Advice</h3>
        <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
          {riskAssessment.advice}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <Check className="w-5 h-5 text-green-600 mr-2" />
            Foods to Include
          </h3>
          <ul className="bg-green-50 p-4 rounded-lg">
            {riskAssessment.foods_to_eat.map((food, index) => (
              <li key={index} className="flex items-start mb-2">
                <Check className="w-4 h-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                <span>{food}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <X className="w-5 h-5 text-red-600 mr-2" />
            Foods to Avoid
          </h3>
          <ul className="bg-red-50 p-4 rounded-lg">
            {riskAssessment.foods_to_avoid.map((food, index) => (
              <li key={index} className="flex items-start mb-2">
                <X className="w-4 h-4 text-red-600 mr-2 mt-1 flex-shrink-0" />
                <span>{food}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <Button 
          onClick={resetQuiz}
          className="bg-cancer-blue hover:bg-cancer-purple transition-colors"
        >
          Take the Quiz Again
        </Button>
      </div>
    </motion.div>
  );
};

export default QuizResults;
