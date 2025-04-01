
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Problem from '../problems';

interface ProblemStatementProps {
  problem: Problem;
}

const ProblemStatement: React.FC<ProblemStatementProps> = ({ problem }) => {
  return (
    <ScrollArea className="h-full">
      <div className="space-y-4 p-1">
        <div>
          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <p className="text-sm text-muted-foreground">
            {problem.description}
          </p>
        </div>
        
        <div>
          <h3 className="text-md font-semibold mb-2">Examples</h3>
          <div className="space-y-3">
            {problem.examples.map((example, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <h4 className="text-xs font-medium mb-1">Input:</h4>
                      <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                        {example.input}
                      </pre>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium mb-1">Output:</h4>
                      <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                        {example.output}
                      </pre>
                    </div>
                  </div>
                  
                  {example.explanation && (
                    <div className="mt-2">
                      <h4 className="text-xs font-medium mb-1">Explanation:</h4>
                      <p className="text-xs text-muted-foreground">
                        {example.explanation}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-md font-semibold mb-2">Constraints</h3>
          <ul className="list-disc pl-5 space-y-1">
            {problem.constraints.map((constraint, index) => (
              <li key={index} className="text-xs text-muted-foreground">
                {constraint}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="text-md font-semibold mb-2">Solution Approach</h3>
          <Card className="overflow-hidden">
            <CardContent className="p-3">
              <p className="text-sm text-muted-foreground">
                {problem.topics.includes("Array") && (
                  "This problem can be solved efficiently using the two-pointer technique. Start by sorting the array (if needed), then use two pointers to navigate through the array and find the required elements."
                )}
                {problem.topics.includes("Hash Table") && (
                  "A hash table/map is perfect for this problem, as it allows O(1) lookups. Store elements in the hash map and check for the required complementary elements."
                )}
                {problem.topics.includes("Graph") && (
                  "Consider representing the problem as a graph and use breadth-first search (BFS) or depth-first search (DFS) to find the optimal path or solution."
                )}
                {problem.topics.includes("Dynamic Programming") && (
                  "This is a classic dynamic programming problem. Break it down into overlapping subproblems and build up the solution incrementally."
                )}
                {!problem.topics.some(topic => 
                  ["Array", "Hash Table", "Graph", "Dynamic Programming"].includes(topic)
                ) && (
                  "Analyze the problem carefully to identify the most efficient algorithm. Consider time and space complexity when designing your solution."
                )}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
};

export default ProblemStatement;
