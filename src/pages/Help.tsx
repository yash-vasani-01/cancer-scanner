
import { useState } from "react";
import { motion } from "framer-motion";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { 
  HelpCircle, 
  MessageSquare, 
  Book, 
  Search, 
  ChevronDown, 
  ChevronUp,
  Mail,
  PlusCircle
} from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        className="w-full text-left p-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      
      {isOpen && (
        <div className="p-4 bg-white">
          <p className="text-gray-600">{answer}</p>
        </div>
      )}
    </div>
  );
};

const Help = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  const handleContactSupport = () => {
    toast({
      title: "Support Request Sent",
      description: "We've received your request and will get back to you soon!",
    });
  };
  
  const faqs = [
    {
      question: "How accurate is the cancer detection?",
      answer: "Our cancer detection system utilizes advanced AI algorithms trained on large datasets of medical images. The accuracy typically ranges from 85-95% depending on the type of scan and quality of the image. However, all results should be verified by healthcare professionals."
    },
    {
      question: "How do I interpret the scan results?",
      answer: "Scan results include a classification (Normal or Abnormal) along with a confidence percentage. If a scan is classified as Abnormal, you should consult with a healthcare professional for further diagnosis. The system may also provide biomarkers identified in the image and recommendations for next steps."
    },
    {
      question: "Can I share my scan results with my doctor?",
      answer: "Yes, you can download your scan results from the scan details page and share them with your healthcare provider. We recommend discussing all results with medical professionals regardless of the outcome."
    },
    {
      question: "What types of images can I upload?",
      answer: "Currently, our system supports common medical imaging formats including JPEG, PNG, and DICOM files. For best results, ensure the images are clear, well-lit, and properly focused on the area of interest."
    },
    {
      question: "How is my data protected?",
      answer: "We take data security very seriously. All your personal information and scan images are encrypted and stored securely. We comply with healthcare data regulations and never share your data with third parties without your explicit consent."
    }
  ];
  
  const filteredFAQs = searchQuery 
    ? faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;
  
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
                    Help & Support
                  </span>
                </h1>
                <p className="text-gray-600">
                  Find answers to common questions or get in touch with our support team.
                </p>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="md:col-span-1"
              >
                <div className="bg-white rounded-xl border border-cancer-blue/10 shadow-sm p-6 space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold mb-4">Help Topics</h2>
                    
                    <div className="space-y-2">
                      <Button variant="ghost" className="w-full justify-start text-cancer-blue bg-cancer-blue/5">
                        <HelpCircle className="w-5 h-5 mr-3" />
                        FAQs
                      </Button>
                      
                      <Button variant="ghost" className="w-full justify-start">
                        <Book className="w-5 h-5 mr-3" />
                        User Guide
                      </Button>
                      
                      <Button variant="ghost" className="w-full justify-start">
                        <MessageSquare className="w-5 h-5 mr-3" />
                        Contact Support
                      </Button>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-100">
                    <h3 className="font-medium mb-3">Need more help?</h3>
                    <Button 
                      className="w-full"
                      onClick={handleContactSupport}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Contact Support
                    </Button>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="md:col-span-2"
              >
                <div className="bg-white rounded-xl border border-cancer-blue/10 shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-6 flex items-center">
                    <HelpCircle className="w-5 h-5 mr-2 text-cancer-blue" />
                    Frequently Asked Questions
                  </h2>
                  
                  <div className="mb-6 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search FAQs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cancer-blue/30"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    {filteredFAQs.length > 0 ? (
                      filteredFAQs.map((faq, index) => (
                        <FAQItem key={index} question={faq.question} answer={faq.answer} />
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No FAQs found matching your search.</p>
                        <Button 
                          variant="outline" 
                          className="mt-4 flex items-center"
                          onClick={() => setSearchQuery("")}
                        >
                          <PlusCircle className="w-4 h-4 mr-2" />
                          Ask a new question
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
