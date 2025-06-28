
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock, AlertTriangle } from 'lucide-react';

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
  acuity: number;
  section: string;
  test?: string;
  results?: string;
}

interface SectionHeaderProps {
  title: string;
  count: number;
  bgColor: string;
  borderColor: string;
  textColor: string;
  patients: Patient[];
  isTriageSection?: boolean;
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
  animationDelay = '0s',
  darkMode
}) => {
  const longWaitPatients = isTriageSection ? 
    patients.filter(p => (Date.now() - new Date(p.arrivalTimestamp).getTime()) / 60000 >= 6).length : 0;
  
  return (
    <div 
      className={`${bgColor} ${borderColor} border-l-8 rounded-t-xl px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-5 shadow-sm animate-fade-in overflow-hidden`}
      style={{ animationDelay }}
    >
      {/* Mobile Layout - Stacked */}
      <div className="flex flex-col space-y-3 lg:hidden">
        {/* Row 1: Title and Patient Count */}
        <div className="flex items-center justify-between gap-2 min-w-0">
          <h3 className={`text-base sm:text-lg font-bold tracking-tight ${textColor} truncate flex-1`}>
            {title}
          </h3>
          <Badge className={`${darkMode ? 'bg-white/20 text-white' : 'bg-white/80 text-gray-800'} border-0 text-xs px-2 py-1 font-semibold flex-shrink-0 whitespace-nowrap`}>
            {count} patient{count !== 1 ? 's' : ''}
          </Badge>
        </div>
        
        {/* Row 2: Alerts and Target Time */}
        {(longWaitPatients > 0 || isTriageSection) && (
          <div className="flex items-center justify-between gap-2 min-w-0">
            {longWaitPatients > 0 && (
              <Badge className="bg-orange-100 text-orange-800 border-orange-200 border px-2 py-1 font-medium text-xs flex-shrink-0 whitespace-nowrap">
                <AlertTriangle className="w-3 h-3 mr-1" />
                {longWaitPatients} longer wait
              </Badge>
            )}
            
            {isTriageSection && (
              <div className={`flex items-center gap-1 ${darkMode ? 'text-emerald-100' : 'text-emerald-700'} text-xs font-medium flex-shrink-0 whitespace-nowrap ml-auto`}>
                <Clock className="w-3 h-3" />
                <span>Target: &lt;7 min</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Desktop Layout - Horizontal */}
      <div className="hidden lg:flex items-center justify-between gap-4 min-w-0">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
          <h3 className={`text-xl xl:text-2xl font-bold tracking-tight ${textColor} truncate`}>
            {title}
          </h3>
          <Badge className={`${darkMode ? 'bg-white/20 text-white' : 'bg-white/80 text-gray-800'} border-0 text-sm px-3 py-1 font-semibold flex-shrink-0 whitespace-nowrap`}>
            {count} patient{count !== 1 ? 's' : ''}
          </Badge>
          {longWaitPatients > 0 && (
            <Badge className="bg-orange-100 text-orange-800 border-orange-200 border px-3 py-1 font-medium flex-shrink-0 whitespace-nowrap">
              <AlertTriangle className="w-3 h-3 mr-1" />
              {longWaitPatients} longer wait
            </Badge>
          )}
        </div>
        {isTriageSection && (
          <div className={`flex items-center gap-2 ${darkMode ? 'text-emerald-100' : 'text-emerald-700'} text-sm font-medium flex-shrink-0 whitespace-nowrap`}>
            <Clock className="w-4 h-4" />
            <span>Target: &lt;7 min</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionHeader;
