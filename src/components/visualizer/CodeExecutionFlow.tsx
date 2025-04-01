
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CodeExecutionFlowProps {
  steps: Array<{
    description: string;
    code: string;
    visualization?: any;
  }>;
  currentStep: number;
  inputValues: string;
  onInputChange: (newInput: string) => void;
}

const CodeExecutionFlow: React.FC<CodeExecutionFlowProps> = ({
  steps,
  currentStep,
  inputValues,
  onInputChange
}) => {
  const [localInput, setLocalInput] = useState(inputValues);
  
  const handleInputSubmit = () => {
    onInputChange(localInput);
  };
  
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-3">Input Values</h3>
          <div className="flex items-center gap-2">
            <Input
              value={localInput}
              onChange={(e) => setLocalInput(e.target.value)}
              placeholder="Enter input values (e.g., [2,7,11,15], target=9)"
              className="flex-grow"
            />
            <Button onClick={handleInputSubmit}>Update</Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Modify input values to see how the algorithm behaves with different inputs.
          </p>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-3">Code Execution Flow</h3>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded-lg transition-colors ${
                    index === currentStep 
                      ? 'bg-primary/10 border border-primary/30' 
                      : index < currentStep 
                        ? 'bg-muted/50' 
                        : 'bg-muted/20'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className={`text-sm font-medium ${
                      index === currentStep ? 'text-primary' : ''
                    }`}>
                      Step {index + 1}: {step.description}
                    </h4>
                    <span className={`text-xs px-2 py-1 rounded ${
                      index === currentStep 
                        ? 'bg-primary/20 text-primary' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {index === currentStep ? 'Current' : index < currentStep ? 'Completed' : 'Pending'}
                    </span>
                  </div>
                  
                  <pre className="bg-black text-white dark:bg-white/10 p-3 rounded text-xs overflow-x-auto">
                    <code>{step.code}</code>
                  </pre>
                  
                  {index === currentStep && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      <p>This step is currently being executed.</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-2">Code Explanation</h3>
          <p className="text-sm text-muted-foreground">
            This visualization shows a step-by-step execution of an algorithm to solve the problem. 
            Each step highlights the corresponding code and shows the state of the data structure 
            being manipulated. You can modify the input values to see how the algorithm would 
            work with different inputs.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CodeExecutionFlow;
