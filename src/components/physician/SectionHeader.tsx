
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock, AlertTriangle, MessageSquare } from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  complaint: string;
  entry: string;
  entryMethod: string;
  room: string;
  arrivalTime: string;
  arrivalTimestamp: string;
  lastUpdate: string;
  phone: string;
  status: string;
  physicianSeen: boolean;
  family: string;
  acuity?: number;
  section: string;
  test?: string;
  results?: string;
  triageTimestamp?: string;
  expectedTestCompletion?: string;
  vitalSigns?: {
    bloodPressure?: string;
    heartRate?: number;
    temperature?: number;
    oxygenSaturation?: number;
    painScale?: number;
    respiratoryRate?: number;
  };
  messageType?: 'request' | 'question' | 'concern';
}

interface SectionHeaderProps {
  title: string;
  count: number;
  bgColor: string;
  borderColor: string;
  textColor: string;
  patients: Patient[];
  isTriageSection?: boolean;
  isConciergeSection?: boolean;
  animationDelay?: string;
  darkMode: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  count,
  bgColor,
  borderColor,
  textColor,
  patients,
  isTriageSection = false,
  isConciergeSection = false,
  animationDelay = '0s',
  darkMode
}) => {
  const longWaitPatients = isTriageSection ? 
    patients.filter(p => (Date.now() - new Date(p.arrivalTimestamp).getTime()) / 60000 >= 7).length : 0;
  
  const overdueMessages = isConciergeSection ?
    patients.filter(p => (Date.now() - new Date(p.arrivalTimestamp).getTime()) / (60000 * 60) >= 24).length : 0;
  
  const getTargetTime = () => {
    if (isTriageSection) return "Target: <7 min";
    if (isConciergeSection) return "Target: <24 hrs";
    return "";
  };
  
  return (
    <div 
      className={`${bgColor} ${borderColor} border-l-4 rounded-t-lg px-4 py-3 shadow-sm animate-fade-in overflow-hidden`}
      style={{ animationDelay }}
    >
      {/* Mobile Layout - Compact Stacked */}
      <div className="flex flex-col space-y-2 lg:hidden">
        {/* Row 1: Title and Patient Count */}
        <div className="flex items-center justify-between gap-2 min-w-0">
          <h3 className={`text-sm font-medium tracking-tight ${textColor} truncate flex-1`}>
            {title}
          </h3>
          <Badge className={`${darkMode ? 'bg-white/15 text-white border-white/20' : 'bg-white/70 text-slate-700 border-slate-200/50'} text-xs px-2 py-0.5 font-normal flex-shrink-0 whitespace-nowrap`}>
            {count} {isConciergeSection ? 'message' : 'patient'}{count !== 1 ? 's' : ''}
          </Badge>
        </div>
        
        {/* Row 2: Alerts and Target Time - Only if needed */}
        {((longWaitPatients > 0 || overdueMessages > 0) || (isTriageSection || isConciergeSection)) && (
          <div className="flex items-center justify-between gap-2 min-w-0">
            {longWaitPatients > 0 && (
              <Badge className="bg-amber-100 text-amber-700 border-amber-200/50 border px-2 py-0.5 font-normal text-xs flex-shrink-0 whitespace-nowrap">
                <AlertTriangle className="w-3 h-3 mr-1" />
                {longWaitPatients} needs attention
              </Badge>
            )}
            
            {overdueMessages > 0 && (
              <Badge className="bg-amber-100 text-amber-700 border-amber-200/50 border px-2 py-0.5 font-normal text-xs flex-shrink-0 whitespace-nowrap">
                <MessageSquare className="w-3 h-3 mr-1" />
                {overdueMessages} overdue
              </Badge>
            )}
            
            {(isTriageSection || isConciergeSection) && (
              <div className={`flex items-center gap-1 ${
                isTriageSection 
                  ? (darkMode ? 'text-orange-200' : 'text-orange-600')
                  : (darkMode ? 'text-purple-200' : 'text-purple-600')
              } text-xs font-normal flex-shrink-0 whitespace-nowrap ml-auto`}>
                <Clock className="w-3 h-3" />
                <span>{getTargetTime()}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Desktop Layout - Compact Horizontal */}
      <div className="hidden lg:flex items-center justify-between gap-4 min-w-0">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <h3 className={`text-base font-medium tracking-tight ${textColor} truncate`}>
            {title}
          </h3>
          <Badge className={`${darkMode ? 'bg-white/15 text-white border-white/20' : 'bg-white/70 text-slate-700 border-slate-200/50'} text-sm px-2 py-0.5 font-normal flex-shrink-0 whitespace-nowrap`}>
            {count}
          </Badge>
          {longWaitPatients > 0 && (
            <Badge className="bg-amber-100 text-amber-700 border-amber-200/50 border px-2 py-0.5 font-normal text-sm flex-shrink-0 whitespace-nowrap">
              <AlertTriangle className="w-3 h-3 mr-1" />
              {longWaitPatients} needs attention
            </Badge>
          )}
          {overdueMessages > 0 && (
            <Badge className="bg-amber-100 text-amber-700 border-amber-200/50 border px-2 py-0.5 font-normal text-sm flex-shrink-0 whitespace-nowrap">
              <MessageSquare className="w-3 h-3 mr-1" />
              {overdueMessages} overdue
            </Badge>
          )}
        </div>
        {(isTriageSection || isConciergeSection) && (
          <div className={`flex items-center gap-2 ${
            isTriageSection 
              ? (darkMode ? 'text-orange-200' : 'text-orange-600')
              : (darkMode ? 'text-purple-200' : 'text-purple-600')
          } text-sm font-normal flex-shrink-0 whitespace-nowrap`}>
            <Clock className="w-4 h-4" />
            <span>{getTargetTime()}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionHeader;
