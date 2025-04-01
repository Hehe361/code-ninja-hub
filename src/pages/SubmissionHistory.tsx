
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Clock, MemoryStick, ArrowLeft, ArrowRight, GitCompareArrows, RotateCcw } from 'lucide-react';

// Mock data for submissions
const mockSubmissions = [
  {
    id: "sub-1",
    problemId: "1",
    problemTitle: "Two Sum",
    timestamp: "2023-11-23T14:20:00Z",
    status: "Accepted",
    runtime: "56ms",
    memory: "42.1MB",
    language: "JavaScript",
    code: "function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}"
  },
  {
    id: "sub-2",
    problemId: "1",
    problemTitle: "Two Sum",
    timestamp: "2023-11-23T14:15:00Z",
    status: "Wrong Answer",
    runtime: "58ms",
    memory: "42.3MB",
    language: "JavaScript",
    code: "function twoSum(nums, target) {\n  const map = {};\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map[complement] !== undefined) {\n      return [map[complement], i];\n    }\n    map[nums[i]] = i;\n  }\n  return null;\n}"
  },
  {
    id: "sub-3",
    problemId: "2",
    problemTitle: "Merge Intervals",
    timestamp: "2023-11-22T10:30:00Z",
    status: "Accepted",
    runtime: "68ms",
    memory: "36.5MB",
    language: "JavaScript",
    code: "function merge(intervals) {\n  if (intervals.length <= 1) return intervals;\n  \n  intervals.sort((a, b) => a[0] - b[0]);\n  \n  const result = [intervals[0]];\n  \n  for (let i = 1; i < intervals.length; i++) {\n    const current = intervals[i];\n    const lastMerged = result[result.length - 1];\n    \n    if (current[0] <= lastMerged[1]) {\n      lastMerged[1] = Math.max(lastMerged[1], current[1]);\n    } else {\n      result.push(current);\n    }\n  }\n  \n  return result;\n}"
  },
  {
    id: "sub-4",
    problemId: "3",
    problemTitle: "LRU Cache",
    timestamp: "2023-11-21T16:45:00Z",
    status: "Time Limit Exceeded",
    runtime: "N/A",
    memory: "N/A",
    language: "JavaScript",
    code: "class LRUCache {\n  constructor(capacity) {\n    this.capacity = capacity;\n    this.cache = new Map();\n  }\n\n  get(key) {\n    if (!this.cache.has(key)) return -1;\n    \n    const value = this.cache.get(key);\n    this.cache.delete(key);\n    this.cache.set(key, value);\n    return value;\n  }\n\n  put(key, value) {\n    if (this.cache.has(key)) {\n      this.cache.delete(key);\n    } else if (this.cache.size >= this.capacity) {\n      const firstKey = this.cache.keys().next().value;\n      this.cache.delete(firstKey);\n    }\n    \n    this.cache.set(key, value);\n  }\n}"
  }
];

const SubmissionHistory = () => {
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null);
  const [comparisonSubmission, setComparisonSubmission] = useState<string | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const { toast } = useToast();

  const handleSelectSubmission = (submissionId: string) => {
    setSelectedSubmission(submissionId);
    if (compareMode && submissionId !== selectedSubmission) {
      setComparisonSubmission(submissionId);
    }
  };

  const handleRevertToSubmission = (submissionId: string) => {
    toast({
      title: "Code Restored",
      description: "Successfully restored code from selected submission.",
    });
  };

  const toggleCompareMode = () => {
    setCompareMode(!compareMode);
    if (!compareMode) {
      setComparisonSubmission(null);
    }
  };

  const getSubmissionById = (id: string) => {
    return mockSubmissions.find(sub => sub.id === id);
  };

  const selectedSubmissionData = selectedSubmission ? getSubmissionById(selectedSubmission) : null;
  const comparisonSubmissionData = comparisonSubmission ? getSubmissionById(comparisonSubmission) : null;

  // Get status color for badges
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Accepted': return 'bg-green-500 hover:bg-green-600';
      case 'Wrong Answer': return 'bg-red-500 hover:bg-red-600';
      case 'Time Limit Exceeded': return 'bg-orange-500 hover:bg-orange-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto pt-20 px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Submissions Table */}
          <div className="lg:w-2/3">
            <h1 className="text-3xl font-bold mb-6">Submission History</h1>
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle>Your Submissions</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={toggleCompareMode}
                    className={compareMode ? "bg-muted" : ""}
                  >
                    <GitCompareArrows className="mr-2 h-4 w-4" />
                    {compareMode ? "Cancel Compare" : "Compare Submissions"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Problem</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Runtime</TableHead>
                        <TableHead>Memory</TableHead>
                        <TableHead>Language</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockSubmissions.map((submission) => (
                        <TableRow 
                          key={submission.id}
                          className={`cursor-pointer ${selectedSubmission === submission.id ? 'bg-muted' : ''} ${comparisonSubmission === submission.id ? 'bg-muted/50' : ''}`}
                          onClick={() => handleSelectSubmission(submission.id)}
                        >
                          <TableCell className="font-medium">{submission.problemTitle}</TableCell>
                          <TableCell>{new Date(submission.timestamp).toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(submission.status)}>
                              {submission.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {submission.runtime}
                          </TableCell>
                          <TableCell className="flex items-center gap-1">
                            <MemoryStick className="h-3 w-3" /> {submission.memory}
                          </TableCell>
                          <TableCell>{submission.language}</TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRevertToSubmission(submission.id);
                              }}
                            >
                              <RotateCcw className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Submission Details Panel */}
          <div className="lg:w-1/3">
            <div className="sticky top-24">
              <h2 className="text-2xl font-bold mb-4">Submission Details</h2>
              
              {compareMode && selectedSubmission && comparisonSubmission ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Code Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium mb-2">
                          {comparisonSubmissionData?.status} ({new Date(comparisonSubmissionData?.timestamp || "").toLocaleDateString()})
                        </h3>
                        <pre className="bg-muted p-3 rounded-md text-xs overflow-auto max-h-96">
                          {comparisonSubmissionData?.code}
                        </pre>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium mb-2">
                          {selectedSubmissionData?.status} ({new Date(selectedSubmissionData?.timestamp || "").toLocaleDateString()})
                        </h3>
                        <pre className="bg-muted p-3 rounded-md text-xs overflow-auto max-h-96">
                          {selectedSubmissionData?.code}
                        </pre>
                      </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mr-2"
                        onClick={() => setCompareMode(false)}
                      >
                        Close Comparison
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : selectedSubmission ? (
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {selectedSubmissionData?.problemTitle}
                      <Badge className={`ml-2 ${getStatusColor(selectedSubmissionData?.status || "")}`}>
                        {selectedSubmissionData?.status}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between mb-4 text-sm text-muted-foreground">
                      <div>Submitted: {new Date(selectedSubmissionData?.timestamp || "").toLocaleString()}</div>
                      <div>Language: {selectedSubmissionData?.language}</div>
                    </div>
                    <div className="flex gap-4 mb-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" /> 
                        <span>Runtime: {selectedSubmissionData?.runtime}</span>
                      </div>
                      <div className="flex items-center">
                        <MemoryStick className="h-4 w-4 mr-1" /> 
                        <span>Memory: {selectedSubmissionData?.memory}</span>
                      </div>
                    </div>
                    <h3 className="text-sm font-medium mb-2">Code</h3>
                    <pre className="bg-muted p-3 rounded-md text-xs overflow-auto max-h-96">
                      {selectedSubmissionData?.code}
                    </pre>
                    <div className="flex justify-end mt-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mr-2"
                        onClick={() => handleRevertToSubmission(selectedSubmission)}
                      >
                        <RotateCcw className="h-4 w-4 mr-1" /> 
                        Revert to this Code
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm"
                      >
                        Submit New Solution
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center text-muted-foreground">
                    Select a submission to view details
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SubmissionHistory;
