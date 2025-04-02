
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, MemoryStick, RotateCcw } from 'lucide-react';
import { SubmissionData } from '@/types/submissions';

interface SubmissionDetailProps {
  submission: SubmissionData | null;
  onRevertSubmission: (id: string) => void;
  onRetryProblem: (problemId: string) => void;
}

const SubmissionDetail = ({ 
  submission,
  onRevertSubmission,
  onRetryProblem
}: SubmissionDetailProps) => {
  if (!submission) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          Select a submission to view details
        </CardContent>
      </Card>
    );
  }

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
    <Card>
      <CardHeader>
        <CardTitle>
          {submission.problemTitle}
          <Badge className={`ml-2 ${getStatusColor(submission.status)}`}>
            {submission.status}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4 text-sm text-muted-foreground">
          <div>Submitted: {new Date(submission.timestamp).toLocaleString()}</div>
          <div>Language: {submission.language}</div>
        </div>
        <div className="flex gap-4 mb-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" /> 
            <span>Runtime: {submission.runtime}</span>
          </div>
          <div className="flex items-center">
            <MemoryStick className="h-4 w-4 mr-1" /> 
            <span>Memory: {submission.memory}</span>
          </div>
        </div>
        <h3 className="text-sm font-medium mb-2">Code</h3>
        <pre className="bg-muted p-3 rounded-md text-xs overflow-auto max-h-96">
          {submission.code}
        </pre>
        <div className="flex justify-end mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="mr-2"
            onClick={() => onRevertSubmission(submission.id)}
          >
            <RotateCcw className="h-4 w-4 mr-1" /> 
            Revert to this Code
          </Button>
          <Button 
            variant="default" 
            size="sm"
            onClick={() => onRetryProblem(submission.problemId)}
          >
            Retry Problem
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubmissionDetail;
