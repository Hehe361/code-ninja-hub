
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SubmissionData } from '@/types/submissions';

interface SubmissionCompareProps {
  selectedSubmission: SubmissionData | null;
  comparisonSubmission: SubmissionData | null;
  onCloseComparison: () => void;
}

const SubmissionCompare = ({
  selectedSubmission,
  comparisonSubmission,
  onCloseComparison
}: SubmissionCompareProps) => {
  if (!selectedSubmission || !comparisonSubmission) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Code Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium mb-2">
              {comparisonSubmission.status} ({new Date(comparisonSubmission.timestamp).toLocaleDateString()})
            </h3>
            <pre className="bg-muted p-3 rounded-md text-xs overflow-auto max-h-96">
              {comparisonSubmission.code}
            </pre>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">
              {selectedSubmission.status} ({new Date(selectedSubmission.timestamp).toLocaleDateString()})
            </h3>
            <pre className="bg-muted p-3 rounded-md text-xs overflow-auto max-h-96">
              {selectedSubmission.code}
            </pre>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={onCloseComparison}
          >
            Close Comparison
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubmissionCompare;
