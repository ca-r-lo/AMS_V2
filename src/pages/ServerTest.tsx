import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "@/config/api";
import { Loader2, ServerCrash, CheckCircle2 } from "lucide-react";

const ServerTest = () => {
  const [status, setStatus] = useState<"testing" | "success" | "error">("testing");
  const navigate = useNavigate();

  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/health`);
        if (response.ok) {
          setStatus("success");
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        } else {
          setStatus("error");
        }
      } catch (error) {
        setStatus("error");
      }
    };

    testConnection();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-900">Testing Server Connection</h1>
        
        <div className="flex flex-col items-center space-y-4">
          {status === "testing" && (
            <>
              <Loader2 className="w-16 h-16 animate-spin text-primary" />
              <p className="text-gray-600">Testing connection to server...</p>
            </>
          )}
          
          {status === "success" && (
            <>
              <CheckCircle2 className="w-16 h-16 text-green-500" />
              <p className="text-gray-600">Connection successful! Redirecting...</p>
            </>
          )}
          
          {status === "error" && (
            <>
              <ServerCrash className="w-16 h-16 text-red-500" />
              <p className="text-red-600">Unable to connect to server</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90"
              >
                Retry Connection
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServerTest;