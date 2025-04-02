
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { GitCompareArrows } from 'lucide-react';
import { SubmissionData } from '@/types/submissions';

// Import new components
import SubmissionList from '@/components/submissions/SubmissionList';
import SubmissionDetail from '@/components/submissions/SubmissionDetail';
import SubmissionCompare from '@/components/submissions/SubmissionCompare';
import SubmissionFilters from '@/components/submissions/SubmissionFilters';
import PerformanceStats from '@/components/submissions/PerformanceStats';

// Mock data for submissions
const mockSubmissions = [
  {
    id: "sub-1",
    problemId: "1",
    problemTitle: "Two Sum",
    timestamp: "2023-11-23T14:20:00Z",
    status: "Accepted",
    runtime: "56",
    memory: "42.1",
    language: "JavaScript",
    code: "function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}"
  },
  {
    id: "sub-2",
    problemId: "1",
    problemTitle: "Two Sum",
    timestamp: "2023-11-23T14:15:00Z",
    status: "Wrong Answer",
    runtime: "58",
    memory: "42.3",
    language: "JavaScript",
    code: "function twoSum(nums, target) {\n  const map = {};\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map[complement] !== undefined) {\n      return [map[complement], i];\n    }\n    map[nums[i]] = i;\n  }\n  return null;\n}"
  },
  {
    id: "sub-3",
    problemId: "2",
    problemTitle: "Merge Intervals",
    timestamp: "2023-11-22T10:30:00Z",
    status: "Accepted",
    runtime: "68",
    memory: "36.5",
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
  },
  {
    id: "sub-5",
    problemId: "4",
    problemTitle: "Binary Tree Maximum Path Sum",
    timestamp: "2023-11-20T09:15:00Z",
    status: "Accepted",
    runtime: "72",
    memory: "45.2",
    language: "JavaScript",
    code: "function maxPathSum(root) {\n  let maxSum = -Infinity;\n  \n  const findMaxPath = (node) => {\n    if (!node) return 0;\n    \n    const leftMax = Math.max(0, findMaxPath(node.left));\n    const rightMax = Math.max(0, findMaxPath(node.right));\n    \n    maxSum = Math.max(maxSum, node.val + leftMax + rightMax);\n    \n    return node.val + Math.max(leftMax, rightMax);\n  };\n  \n  findMaxPath(root);\n  return maxSum;\n}"
  }
];

const SubmissionHistory = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState<SubmissionData[]>(mockSubmissions);
  const [filteredSubmissions, setFilteredSubmissions] = useState<SubmissionData[]>(mockSubmissions);
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null);
  const [comparisonSubmission, setComparisonSubmission] = useState<string | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  
  // Filters
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [titleFilter, setTitleFilter] = useState('');

  // Apply filters
  useEffect(() => {
    let filtered = [...submissions];
    
    // Filter by status
    if (statusFilter) {
      filtered = filtered.filter(sub => sub.status === statusFilter);
    }
    
    // Filter by date
    if (dateFilter) {
      const now = new Date();
      let cutoffDate = new Date();
      
      if (dateFilter === 'today') {
        cutoffDate.setHours(0, 0, 0, 0);
      } else if (dateFilter === 'week') {
        cutoffDate.setDate(now.getDate() - 7);
      } else if (dateFilter === 'month') {
        cutoffDate.setMonth(now.getMonth() - 1);
      }
      
      filtered = filtered.filter(sub => new Date(sub.timestamp) >= cutoffDate);
    }
    
    // Filter by title
    if (titleFilter) {
      filtered = filtered.filter(sub => 
        sub.problemTitle.toLowerCase().includes(titleFilter.toLowerCase())
      );
    }
    
    setFilteredSubmissions(filtered);
  }, [submissions, statusFilter, dateFilter, titleFilter]);

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

  const handleRetryProblem = (problemId: string) => {
    navigate(`/editor/${problemId}`);
  };

  const toggleCompareMode = () => {
    setCompareMode(!compareMode);
    if (!compareMode) {
      setComparisonSubmission(null);
    }
  };

  const clearFilters = () => {
    setStatusFilter('');
    setDateFilter('');
    setTitleFilter('');
  };

  const getSubmissionById = (id: string | null) => {
    if (!id) return null;
    return submissions.find(sub => sub.id === id) || null;
  };

  const selectedSubmissionData = getSubmissionById(selectedSubmission);
  const comparisonSubmissionData = getSubmissionById(comparisonSubmission);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto pt-16 px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Performance Stats (Appears at the top on mobile, spans full width) */}
          <div className="col-span-full lg:col-span-3">
            <PerformanceStats submissions={submissions} />
          </div>
          
          {/* Submissions Table */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold">Submission History</h1>
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
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Your Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                <SubmissionFilters 
                  statusFilter={statusFilter}
                  setStatusFilter={setStatusFilter}
                  dateFilter={dateFilter}
                  setDateFilter={setDateFilter}
                  titleFilter={titleFilter}
                  setTitleFilter={setTitleFilter}
                  onClearFilters={clearFilters}
                />
                
                <SubmissionList 
                  submissions={filteredSubmissions}
                  selectedSubmissionId={selectedSubmission}
                  comparisonSubmissionId={comparisonSubmission}
                  compareMode={compareMode}
                  onSelectSubmission={handleSelectSubmission}
                  onRevertSubmission={handleRevertToSubmission}
                />
              </CardContent>
            </Card>
          </div>

          {/* Submission Details Panel */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold mb-4">Submission Details</h2>
            <div className="sticky top-24">
              {compareMode && selectedSubmission && comparisonSubmission ? (
                <SubmissionCompare 
                  selectedSubmission={selectedSubmissionData}
                  comparisonSubmission={comparisonSubmissionData}
                  onCloseComparison={() => setCompareMode(false)}
                />
              ) : (
                <SubmissionDetail 
                  submission={selectedSubmissionData}
                  onRevertSubmission={handleRevertToSubmission}
                  onRetryProblem={handleRetryProblem}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SubmissionHistory;
