
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, MemoryStick, RotateCcw } from 'lucide-react';
import { SubmissionData } from '@/types/submissions';

interface SubmissionListProps {
  submissions: SubmissionData[];
  selectedSubmissionId: string | null;
  comparisonSubmissionId: string | null;
  compareMode: boolean;
  onSelectSubmission: (id: string) => void;
  onRevertSubmission: (id: string) => void;
}

const SubmissionList = ({
  submissions,
  selectedSubmissionId,
  comparisonSubmissionId,
  compareMode,
  onSelectSubmission,
  onRevertSubmission,
}: SubmissionListProps) => {
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
          {submissions.map((submission) => (
            <TableRow 
              key={submission.id}
              className={`cursor-pointer ${selectedSubmissionId === submission.id ? 'bg-muted' : ''} ${comparisonSubmissionId === submission.id ? 'bg-muted/50' : ''}`}
              onClick={() => onSelectSubmission(submission.id)}
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
                    onRevertSubmission(submission.id);
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
  );
};

export default SubmissionList;
