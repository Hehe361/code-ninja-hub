
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
  
  // Sample execution steps (would be generated based on the algorithm)
  const [executionSteps, setExecutionSteps] = useState<any[]>([]);
  
  useEffect(() => {
    if (problem) {
      // Initialize with the first test case
      setInputValues(problem.testCases[0]?.input || "");
      
      // Generate sample execution steps based on the problem type
      // This would be replaced with actual algorithm visualization
      generateExecutionSteps();
    }
  }, [problemId, problem]);
  
  const generateExecutionSteps = () => {
    // This is a simplified example of execution steps for array-based problems
    // In a real implementation, this would be based on the actual algorithm
    if (problem?.topics.includes("Array")) {
      const steps = [
        { 
          description: "Initialize variables", 
          code: "let result = [];\nlet left = 0, right = nums.length - 1;", 
          visualization: { type: "array", data: [2, 7, 11, 15], pointers: [] }
        },
        { 
          description: "First iteration: check if elements at pointers sum to target", 
          code: "if (nums[left] + nums[right] === target) {\n  return [left, right];\n}", 
          visualization: { type: "array", data: [2, 7, 11, 15], pointers: [{index: 0, label: "left"}, {index: 3, label: "right"}] }
        },
        { 
          description: "Sum is not target, adjust pointers", 
          code: "if (nums[left] + nums[right] < target) {\n  left++;\n} else {\n  right--;\n}", 
          visualization: { type: "array", data: [2, 7, 11, 15], pointers: [{index: 1, label: "left"}, {index: 3, label: "right"}] }
        },
        { 
          description: "Check if new elements sum to target", 
          code: "if (nums[left] + nums[right] === target) {\n  return [left, right];\n}", 
          visualization: { type: "array", data: [2, 7, 11, 15], pointers: [{index: 1, label: "left"}, {index: 2, label: "right"}] }
        },
        { 
          description: "Found solution", 
          code: "return [left, right];", 
          visualization: { type: "array", data: [2, 7, 11, 15], pointers: [{index: 1, label: "left", highlight: true}, {index: 2, label: "right", highlight: true}] }
        }
      ];
      setExecutionSteps(steps);
    } else if (problem?.topics.includes("Graph")) {
      // Graph problem sample execution steps
      const steps = [
        {
          description: "Initialize graph representation",
          code: "const graph = buildAdjList(edges);\nconst visited = new Set();",
          visualization: { type: "graph", nodes: [{id: 0}, {id: 1}, {id: 2}, {id: 3}], edges: [{source: 0, target: 1}, {source: 1, target: 2}, {source: 2, target: 3}] }
        },
        {
          description: "Start BFS from source node",
          code: "const queue = [start];\nvisited.add(start);",
          visualization: { type: "graph", nodes: [{id: 0, highlight: true}, {id: 1}, {id: 2}, {id: 3}], edges: [{source: 0, target: 1}, {source: 1, target: 2}, {source: 2, target: 3}] }
        },
        {
          description: "Process neighbors of current node",
          code: "for (const neighbor of graph[current]) {\n  if (!visited.has(neighbor)) {\n    queue.push(neighbor);\n    visited.add(neighbor);\n  }\n}",
          visualization: { type: "graph", nodes: [{id: 0, visited: true}, {id: 1, highlight: true}, {id: 2}, {id: 3}], edges: [{source: 0, target: 1, highlight: true}, {source: 1, target: 2}, {source: 2, target: 3}] }
        },
        {
          description: "Continue BFS traversal",
          code: "current = queue.shift();",
          visualization: { type: "graph", nodes: [{id: 0, visited: true}, {id: 1, visited: true}, {id: 2, highlight: true}, {id: 3}], edges: [{source: 0, target: 1, visited: true}, {source: 1, target: 2, highlight: true}, {source: 2, target: 3}] }
        },
        {
          description: "Complete traversal",
          code: "return distance;",
          visualization: { type: "graph", nodes: [{id: 0, visited: true}, {id: 1, visited: true}, {id: 2, visited: true}, {id: 3, visited: true}], edges: [{source: 0, target: 1, visited: true}, {source: 1, target: 2, visited: true}, {source: 2, target: 3, visited: true}] }
        }
      ];
      setExecutionSteps(steps);
    } else {
      // Default steps for other problem types
      const steps = [
        { 
          description: "Initialize solution", 
          code: "let result = 0;", 
          visualization: { type: "basic", value: "result = 0" } 
        },
        { 
          description: "Process input", 
          code: "for (let i = 0; i < input.length; i++) {\n  // Process each element\n}", 
          visualization: { type: "basic", value: "Processing..." } 
        },
        { 
          description: "Calculate result", 
          code: "result = calculateSolution(input);", 
          visualization: { type: "basic", value: "Calculating..." } 
        },
        { 
          description: "Return final answer", 
          code: "return result;", 
          visualization: { type: "basic", value: "Solution found!" } 
        }
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
  
  // Mobile view rendering
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
      
      <TabsList className="grid w-full grid-cols-3 my-2">
        <TabsTrigger value="statement" onClick={() => setActiveTab("statement")}>
          <BookOpen className="h-4 w-4 mr-1" />
          Problem
        </TabsTrigger>
        <TabsTrigger value="visualization" onClick={() => setActiveTab("visualization")}>
          <Info className="h-4 w-4 mr-1" />
          Visual
        </TabsTrigger>
        <TabsTrigger value="code" onClick={() => setActiveTab("code")}>
          <Code className="h-4 w-4 mr-1" />
          Code Flow
        </TabsTrigger>
      </TabsList>
      
      <div className="flex-grow overflow-hidden p-2">
        {activeTab === "statement" && (
          <ProblemStatement problem={problem} />
        )}
        
        {activeTab === "visualization" && (
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
        )}
        
        {activeTab === "code" && (
          <div className="h-full overflow-auto">
            <CodeExecutionFlow 
              steps={executionSteps} 
              currentStep={currentStep}
              inputValues={inputValues}
              onInputChange={handleInputChange}
            />
          </div>
        )}
      </div>
      
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
  
  // Desktop view rendering
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
