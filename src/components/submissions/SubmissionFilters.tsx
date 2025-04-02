
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

interface SubmissionFiltersProps {
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  dateFilter: string;
  setDateFilter: (value: string) => void;
  titleFilter: string;
  setTitleFilter: (value: string) => void;
  onClearFilters: () => void;
}

const SubmissionFilters = ({
  statusFilter,
  setStatusFilter,
  dateFilter,
  setDateFilter,
  titleFilter,
  setTitleFilter,
  onClearFilters
}: SubmissionFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 items-end mb-4">
      <div className="w-full sm:w-auto flex-1">
        <div className="text-sm font-medium mb-1.5">Problem Title</div>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by title..."
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      
      <div className="w-full sm:w-auto">
        <div className="text-sm font-medium mb-1.5">Status</div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Accepted">Accepted</SelectItem>
            <SelectItem value="Wrong Answer">Wrong Answer</SelectItem>
            <SelectItem value="Time Limit Exceeded">Time Limit Exceeded</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="w-full sm:w-auto">
        <div className="text-sm font-medium mb-1.5">Date Range</div>
        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="All Time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">Past Week</SelectItem>
            <SelectItem value="month">Past Month</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button 
        variant="outline" 
        size="icon"
        onClick={onClearFilters}
        className="h-10 w-10"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default SubmissionFilters;
