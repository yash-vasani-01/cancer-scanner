
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface QuestionOption {
  min?: number;
  max?: number;
  step?: number;
  options?: string[];
}

interface Question {
  id: number;
  question_text: string;
  question_type: string;
  options: QuestionOption;
  weight: number;
}

interface QuizComponentProps {
  question: Question;
  onResponse: (questionId: number, response: any) => void;
  currentQuestion: number;
  totalQuestions: number;
}

const QuizComponent = ({ 
  question, 
  onResponse, 
  currentQuestion, 
  totalQuestions 
}: QuizComponentProps) => {
  const [response, setResponse] = useState<any>(null);
  const [sliderValue, setSliderValue] = useState<number[]>([1]);
  const [isValid, setIsValid] = useState<boolean>(false);

  // Reset response when question changes
  useEffect(() => {
    setResponse(null);
    setIsValid(false);
    
    // Set default slider value
    if (question.question_type === 'range' && question.options) {
      setSliderValue([question.options.min || 1]);
    }
  }, [question]);

  // Validate response
  useEffect(() => {
    if (question.question_type === 'boolean' || question.question_type === 'select') {
      setIsValid(response !== null);
    } else if (question.question_type === 'range') {
      setIsValid(true); // Range always has a value
    }
  }, [response, question.question_type]);

  // Handle submit
  const handleSubmit = () => {
    if (isValid) {
      if (question.question_type === 'range') {
        onResponse(question.id, sliderValue[0]);
      } else {
        onResponse(question.id, response);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl border border-cancer-blue/10 shadow-sm p-6"
    >
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-cancer-blue h-2.5 rounded-full" 
            style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
          ></div>
        </div>
        <p className="text-right text-sm text-gray-500 mt-1">
          Question {currentQuestion} of {totalQuestions}
        </p>
      </div>

      <h2 className="text-xl font-semibold mb-6">{question.question_text}</h2>

      <div className="mb-6">
        {question.question_type === 'boolean' && (
          <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
            {question.options?.options?.map((option) => (
              <Button
                key={option}
                variant={response === option ? "default" : "outline"}
                className={`px-6 py-4 text-base ${
                  response === option ? "bg-cancer-blue text-white" : ""
                }`}
                onClick={() => setResponse(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        )}

        {question.question_type === 'range' && (
          <div className="px-4 py-8">
            <Slider
              value={sliderValue}
              min={question.options?.min || 1}
              max={question.options?.max || 10}
              step={question.options?.step || 1}
              onValueChange={setSliderValue}
            />
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-500">
                {question.options?.min || 1}
              </span>
              <span className="text-lg font-medium">{sliderValue[0]}</span>
              <span className="text-sm text-gray-500">
                {question.options?.max || 10}
              </span>
            </div>
          </div>
        )}

        {question.question_type === 'select' && (
          <Select onValueChange={(value) => setResponse(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {question.options?.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={!isValid}
          className="bg-cancer-blue hover:bg-cancer-purple transition-colors"
        >
          Next Question
        </Button>
      </div>
    </motion.div>
  );
};

export default QuizComponent;
