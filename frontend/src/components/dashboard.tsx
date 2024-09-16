import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BackgroundLines } from "@/components/ui/background-lines";

export function BackgroundLinesDemo() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    console.log("Navigating to /dashboard");
    navigate("/dashboard");
  };

  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        Deploy Mate
      </h2>
      <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
        Easily deploy React web pages made by Yogesh.
      </p>
      
Copy code
<button
  className="mt-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md py-2 px-6 text-lg font-medium transition-all duration-300 ease-in-out"
  onClick={handleNavigate}
>
  Go to Dashboard
</button>
    </BackgroundLines>
  );
}
