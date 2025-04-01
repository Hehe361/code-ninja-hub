
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Play, Code, Info, BookOpen, ChevronRight, ChevronLeft } from "lucide-react";
import DarkModeToggle from "@/components/DarkModeToggle";
import { useIsMobile } from "@/hooks/use-mobile";
import AlgorithmVisualizer from "@/components/visualizer/AlgorithmVisualizer";
import CodeExecutionFlow from "@/components/visualizer/CodeExecutionFlow";
import ProblemStatement from "@/components/visualizer/ProblemStatement";
import { problems } from "@/components/problems";

const ProblemVisualization = () => {
  const { problemId } = useParams();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("statement");
  const [visualizationSpeed, setVisualizationSpeed] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [inputValues, setInputValues] = useState<string>("");
  
  // Find the problem by ID
  const problem = problems.find(p => p.id === problemId);
  
  const [executionSteps, setExecutionSteps] = useState<any[]>([]);
  
  useEffect(() => {
    if (problem) {
      // Initialize with the first test case
      setInputValues(problem.testCases[0]?.input || "");
      
      // Use problem-specific visualization steps if available
      if (problem.visualization?.steps) {
        setExecutionSteps(problem.visualization.steps);
      } else {
        // Fallback to dynamically generate steps based on problem type
        generateExecutionSteps();
      }
    }
  }, [problemId, problem]);
  
  const generateExecutionSteps = () => {
    // This is a fallback for problems that don't have predefined visualization steps
    if (problem?.topics.includes("Array")) {
      const steps = [
        { 
          description: "Initialize variables", 
          code: "let result = [];\nlet left = 0, right = nums.length - 1;", 
          visualization: { type: "array", data: [2, 7, 11, 15], pointers: [] }
        },
        // ... generic array algorithm steps
      ];
      setExecutionSteps(steps);
    } else if (problem?.topics.includes("Graph")) {
      // Generic graph visualization
      const steps = [
        {
          description: "Initialize graph representation",
          code: "const graph = buildAdjList(edges);\nconst visited = new Set();",
          visualization: { type: "graph", nodes: [{id: 0}, {id: 1}, {id: 2}, {id: 3}], edges: [{source: 0, target: 1}, {source: 1, target: 2}, {source: 2, target: 3}] }
        },
        // ... generic graph algorithm steps
      ];
      setExecutionSteps(steps);
    } else {
      // Default generic steps
      const steps = [
        { 
          description: "Initialize solution", 
          code: "let result = 0;", 
          visualization: { type: "basic", value: "result = 0" } 
        },
        // ... generic algorithm steps
      ];
      setExecutionSteps(steps);
    }
  };
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    
    if (!isPlaying && currentStep >= executionSteps.length - 1) {
      setCurrentStep(0); // Reset to beginning if at the end
    }
  };
  
  const handleStepForward = () => {
    if (currentStep < executionSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handleStepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleInputChange = (newInput: string) => {
    setInputValues(newInput);
    // In a real implementation, this would re-generate the execution steps
    // based on the new input values
    toast({
      title: "Input Updated",
      description: "Visualization will be regenerated with new input",
    });
  };
  
  const handleTryItNow = () => {
    toast({
      title: "Opening Code Editor",
      description: "Redirecting to start solving this problem",
    });
  };
  
  useEffect(() => {
    let intervalId: number;
    
    if (isPlaying) {
      intervalId = window.setInterval(() => {
        setCurrentStep((prevStep) => {
          if (prevStep >= executionSteps.length - 1) {
            setIsPlaying(false);
            return prevStep;
          }
          return prevStep + 1;
        });
      }, 5000 - (visualizationSpeed * 45)); // Speed between 500ms and 4500ms
    }
    
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPlaying, visualizationSpeed, executionSteps.length]);
  
  if (!problem) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Problem Not Found</h2>
            <p className="text-muted-foreground mb-4">
              The problem you're looking for doesn't exist or has been moved.
            </p>
            <Button asChild>
              <Link to="/problems">Back to Problems</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const renderMobileView = () => (
    <div className="h-screen flex flex-col">
      <header className="border-b p-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/problems">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-sm font-semibold truncate max-w-[180px]">{problem.title}</h1>
        </div>
        <div className="flex items-center gap-1">
          <DarkModeToggle />
        </div>
      </header>
      
      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 my-2">
          <TabsTrigger value="statement">
            <BookOpen className="h-4 w-4 mr-1" />
            Problem
          </TabsTrigger>
          <TabsTrigger value="visualization">
            <Info className="h-4 w-4 mr-1" />
            Visual
          </TabsTrigger>
          <TabsTrigger value="code">
            <Code className="h-4 w-4 mr-1" />
            Code Flow
          </TabsTrigger>
        </TabsList>
        
        <div className="flex-grow overflow-hidden p-2">
          <TabsContent value="statement" className="h-full">
            <ProblemStatement problem={problem} />
          </TabsContent>
          
          <TabsContent value="visualization" className="h-full">
            <div className="h-full flex flex-col">
              <div className="mb-4 p-2 bg-muted/30 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium">Visualization Controls</h3>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleStepBackward}
                      disabled={currentStep === 0}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handlePlayPause}
                    >
                      {isPlaying ? "Pause" : "Play"}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleStepForward}
                      disabled={currentStep === executionSteps.length - 1}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs">Slow</span>
                  <Slider
                    value={[visualizationSpeed]}
                    min={1}
                    max={100}
                    step={1}
                    onValueChange={(values) => setVisualizationSpeed(values[0])}
                    className="flex-grow"
                  />
                  <span className="text-xs">Fast</span>
                </div>
              </div>
              
              <div className="flex-grow overflow-hidden">
                <AlgorithmVisualizer 
                  step={executionSteps[currentStep]?.visualization || {}} 
                  description={executionSteps[currentStep]?.description || ""}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="code" className="h-full">
            <div className="h-full overflow-auto">
              <CodeExecutionFlow 
                steps={executionSteps} 
                currentStep={currentStep}
                inputValues={inputValues}
                onInputChange={handleInputChange}
              />
            </div>
          </TabsContent>
        </div>
      </Tabs>
      
      <div className="p-2 border-t">
        <Button 
          className="w-full" 
          onClick={() => window.location.href = `/editor/${problemId}`}
        >
          <Play className="h-4 w-4 mr-2" />
          Try It Now
        </Button>
      </div>
    </div>
  );
  
  const renderDesktopView = () => (
    <div className="min-h-screen bg-background">
      <header className="border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/problems">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold">{problem.title}</h1>
          <span className={`px-2 py-1 text-xs rounded-full ${
            problem.difficulty === 'easy' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
              : problem.difficulty === 'medium'
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <DarkModeToggle />
          <Button 
            variant="default" 
            onClick={() => window.location.href = `/editor/${problemId}`}
          >
            <Play className="h-4 w-4 mr-2" />
            Try It Now
          </Button>
        </div>
      </header>
      
      <div className="container mx-auto py-6 px-4">
        <Tabs defaultValue="statement" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-6">
            <TabsTrigger value="statement">
              <BookOpen className="h-4 w-4 mr-2" />
              Problem Statement
            </TabsTrigger>
            <TabsTrigger value="visualization">
              <Info className="h-4 w-4 mr-2" />
              Visualization
            </TabsTrigger>
            <TabsTrigger value="code">
              <Code className="h-4 w-4 mr-2" />
              Code Execution
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="statement" className="mt-6">
            <ProblemStatement problem={problem} />
          </TabsContent>
          
          <TabsContent value="visualization" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Algorithm Visualization</h2>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleStepBackward}
                      disabled={currentStep === 0}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant={isPlaying ? "outline" : "default"}
                      size="sm" 
                      onClick={handlePlayPause}
                    >
                      {isPlaying ? "Pause" : "Play"}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleStepForward}
                      disabled={currentStep === executionSteps.length - 1}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="mb-6 flex items-center gap-4">
                  <span>Speed:</span>
                  <Slider
                    value={[visualizationSpeed]}
                    min={1}
                    max={100}
                    step={1}
                    onValueChange={(values) => setVisualizationSpeed(values[0])}
                    className="w-[200px]"
                  />
                </div>
                
                <div className="h-[400px]">
                  <AlgorithmVisualizer 
                    step={executionSteps[currentStep]?.visualization || {}} 
                    description={executionSteps[currentStep]?.description || ""}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="code" className="mt-6">
            <CodeExecutionFlow 
              steps={executionSteps} 
              currentStep={currentStep}
              inputValues={inputValues}
              onInputChange={handleInputChange}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
  
  return isMobile ? renderMobileView() : renderDesktopView();
};

export default ProblemVisualization;

