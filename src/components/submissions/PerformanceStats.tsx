
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SubmissionData } from '@/types/submissions';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  Cell
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

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
    status: sub.status,
    fullTitle: sub.problemTitle
  })).slice(0, 5); // Show only last 5 for better visibility

  // Calculate acceptance rate
  const totalSubmissions = submissions.length;
  const acceptedSubmissions = submissions.filter(sub => sub.status === 'Accepted').length;
  const acceptanceRate = totalSubmissions > 0 
    ? Math.round((acceptedSubmissions / totalSubmissions) * 100) 
    : 0;

  // Chart colors based on status
  const getBarColor = (entry: any) => {
    return entry.status === 'Accepted' ? '#9b87f5' : 
           entry.status === 'Wrong Answer' ? '#ff7070' : '#f0b775';
  };

  return (
    <Card className="col-span-full shadow-md overflow-hidden border-0">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-b">
        <CardTitle className="text-lg font-medium">Performance Insights</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 rounded-xl shadow-sm">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Total Submissions</h3>
            <p className="text-3xl font-bold text-slate-800 dark:text-slate-100">{totalSubmissions}</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 rounded-xl shadow-sm">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Acceptance Rate</h3>
            <p className="text-3xl font-bold text-slate-800 dark:text-slate-100">
              {acceptanceRate}%
            </p>
          </div>
          <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/40 dark:to-cyan-950/40 rounded-xl shadow-sm">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Avg. Runtime</h3>
            <p className="text-3xl font-bold text-slate-800 dark:text-slate-100">
              {validSubmissions.length > 0 
                ? Math.round(validSubmissions.reduce((acc, sub) => acc + parseInt(sub.runtime || '0'), 0) / validSubmissions.length) 
                : 0}ms
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">Recent Submissions Performance</h3>
          <div className="h-64">
            <ChartContainer 
              className="h-full w-full" 
              config={{
                runtime: { 
                  theme: { 
                    light: '#9b87f5', 
                    dark: '#a892ff' 
                  }
                }
              }}
            >
              <BarChart data={runtimeData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="runtimeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis 
                  dataKey="name" 
                  fontSize={12}
                  axisLine={{ stroke: '#e5e7eb', strokeWidth: 1 }}
                  tick={{ fill: 'var(--foreground)' }}
                />
                <YAxis 
                  fontSize={12}
                  axisLine={{ stroke: '#e5e7eb', strokeWidth: 1 }}
                  tick={{ fill: 'var(--foreground)' }}
                  label={{ 
                    value: 'Runtime (ms)', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { textAnchor: 'middle', fill: 'var(--muted-foreground)' },
                    dy: 50
                  }}
                />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-md">
                          <div className="font-medium">{payload[0].payload.fullTitle}</div>
                          <div className="text-sm text-muted-foreground">
                            <span className="font-medium text-primary">Runtime:</span> {payload[0].value} ms
                          </div>
                          <div className="text-xs text-muted-foreground">
                            <span className="font-medium">Status:</span> {payload[0].payload.status}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="runtime" 
                  name="Runtime (ms)" 
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                >
                  {runtimeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getBarColor(entry)} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </div>
          <div className="flex justify-end mt-2">
            <div className="flex items-center text-xs space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#9b87f5] mr-1"></div>
                <span className="text-muted-foreground">Accepted</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#ff7070] mr-1"></div>
                <span className="text-muted-foreground">Wrong Answer</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#f0b775] mr-1"></div>
                <span className="text-muted-foreground">Time Limit</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceStats;
