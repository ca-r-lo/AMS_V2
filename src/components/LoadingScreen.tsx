import { Loader2 } from "lucide-react";

interface LoadingScreenProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

const LoadingScreen = ({ message = "Loading data...", size = "md" }: LoadingScreenProps) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 bg-white/50 backdrop-blur-sm rounded-lg p-8">
      <div className="relative">
        <Loader2 className={`${sizeClasses[size]} animate-spin text-primary`} />
        <div className="absolute inset-0 animate-ping opacity-50">
          <Loader2 className={`${sizeClasses[size]} text-primary/30`} />
        </div>
      </div>
      <p className="text-muted-foreground font-medium">{message}</p>
    </div>
  );
};

export default LoadingScreen;