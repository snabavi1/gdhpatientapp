
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
      className={`${bgColor} ${borderColor} border-l-8 rounded-t-xl px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 shadow-sm animate-fade-in`}
      style={{ animationDelay }}
    >
      {/* Mobile Layout - Stacked */}
      <div className="flex flex-col space-y-3 sm:space-y-4 lg:hidden">
        <div className="flex items-center justify-between">
          <h3 className={`text-lg sm:text-xl font-bold tracking-tight ${textColor}`}>
            {title}
          </h3>
          <Badge className={`${darkMode ? 'bg-white/20 text-white' : 'bg-white/80 text-gray-800'} border-0 text-xs px-2 py-1 font-semibold`}>
            {count} patient{count !== 1 ? 's' : ''}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          {longWaitPatients > 0 && (
            <Badge className="bg-orange-100 text-orange-800 border-orange-200 border px-2 py-1 font-medium text-xs">
              <AlertTriangle className="w-3 h-3 mr-1" />
              {longWaitPatients} longer wait
            </Badge>
          )}
          
          {isTriageSection && (
            <div className={`flex items-center space-x-2 ${darkMode ? 'text-emerald-100' : 'text-emerald-700'} text-xs font-medium ml-auto`}>
              <Clock className="w-3 h-3" />
              <span>Target: &lt;7 min</span>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Layout - Horizontal */}
      <div className="hidden lg:flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h3 className={`text-2xl font-bold tracking-tight ${textColor}`}>
            {title}
          </h3>
          <Badge className={`${darkMode ? 'bg-white/20 text-white' : 'bg-white/80 text-gray-800'} border-0 text-sm px-3 py-1 font-semibold`}>
            {count} patient{count !== 1 ? 's' : ''}
          </Badge>
          {longWaitPatients > 0 && (
            <Badge className="bg-orange-100 text-orange-800 border-orange-200 border px-3 py-1 font-medium">
              <AlertTriangle className="w-3 h-3 mr-1" />
              {longWaitPatients} longer wait
            </Badge>
          )}
        </div>
        {isTriageSection && (
          <div className={`flex items-center space-x-2 ${darkMode ? 'text-emerald-100' : 'text-emerald-700'} text-sm font-medium`}>
            <Clock className="w-4 h-4" />
            <span>Target: &lt;7 min</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionHeader;
