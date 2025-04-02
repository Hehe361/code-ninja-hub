
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SubmissionData } from '@/types/submissions';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PerformanceStatsProps {
  submissions: SubmissionData[];
}

const PerformanceStats = ({ submissions }: PerformanceStatsProps) => {
  // Filter only the submissions with a numeric runtime
  const validSubmissions = submissions.filter(
    sub => sub.runtime !== 'N/A' && !isNaN(parseInt(sub.runtime))
  );

  // Prepare data for runtime chart
  const runtimeData = validSubmissions.map(sub => ({
    name: sub.problemTitle.substring(0, 10) + '...',
    runtime: parseInt(sub.runtime),
    memory: parseFloat(sub.memory),
    status: sub.status
  })).slice(0, 5); // Show only last 5 for better visibility

  // Calculate acceptance rate
  const totalSubmissions = submissions.length;
  const acceptedSubmissions = submissions.filter(sub => sub.status === 'Accepted').length;
  const acceptanceRate = totalSubmissions > 0 
    ? Math.round((acceptedSubmissions / totalSubmissions) * 100) 
    : 0;

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Performance Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold">Total Submissions</h3>
            <p className="text-3xl font-bold">{totalSubmissions}</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold">Acceptance Rate</h3>
            <p className="text-3xl font-bold">{acceptanceRate}%</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold">Avg. Runtime</h3>
            <p className="text-3xl font-bold">
              {validSubmissions.length > 0 
                ? Math.round(validSubmissions.reduce((acc, sub) => acc + parseInt(sub.runtime || '0'), 0) / validSubmissions.length) 
                : 0}ms
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Recent Submissions Performance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={runtimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey="runtime" 
                  name="Runtime (ms)" 
                  fill="#8884d8" 
                  radius={[4, 4, 0, 0]}
                  fillOpacity={0.8}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceStats;
