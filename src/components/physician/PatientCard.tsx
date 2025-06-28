
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Video, Phone, MessageSquare, Clock, AlertTriangle } from 'lucide-react';

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

interface PatientCardProps {
  patient: Patient;
  darkMode: boolean;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient, darkMode }) => {
  const waitMins = (Date.now() - new Date(patient.arrivalTimestamp).getTime()) / 60000;
  const isLongerWait = patient.section === 'triage' && waitMins >= 6;

  const getWaitTime = () => {
    if (waitMins >= 60) {
      const hours = Math.floor(waitMins / 60);
      const mins = Math.floor(waitMins % 60);
      return `${hours}h ${mins}m`;
    }
    return `${Math.floor(waitMins)}m`;
  };

  const getWaitTimeColor = () => {
    if (patient.section !== 'triage') return darkMode ? 'text-slate-400' : 'text-slate-600';
    if (waitMins >= 6) return 'text-orange-600 font-semibold';
    if (waitMins >= 4) return 'text-amber-600 font-medium';
    return 'text-emerald-600 font-medium';
  };

  // Get background color based on acuity for subtle visual cues
  const getAcuityBackgroundColor = () => {
    if (isLongerWait) {
      return darkMode 
        ? 'bg-gradient-to-r from-orange-900/20 to-orange-800/10 border-orange-300/30 border-l-4 border-l-orange-400' 
        : 'bg-gradient-to-r from-orange-50 to-orange-25 border-orange-200 border-l-4 border-l-orange-400';
    }
    
    // Subtle acuity-based left border colors
    const acuityBorderColor = patient.acuity === 1 ? 'border-l-purple-400' :
                             patient.acuity === 2 ? 'border-l-cyan-400' :
                             patient.acuity === 3 ? 'border-l-emerald-400' :
                             'border-l-slate-400';
    
    return darkMode 
      ? `bg-gradient-to-r from-gray-800/80 to-gray-700/60 border-gray-600/50 hover:from-gray-700/80 hover:to-gray-600/60 border-l-2 ${acuityBorderColor}` 
      : `bg-white border-gray-200/60 hover:bg-gradient-to-r hover:from-gray-50 hover:to-white border-l-2 ${acuityBorderColor}`;
  };

  const handleStartVideoCall = async () => {
    alert(`🎥 Starting video session for ${patient.name}...\n\nVideo link will be sent to: ${patient.phone}\nPatient will join via SMS link`);
  };

  const handleRespond = () => {
    if (patient.section === 'triage') {
      alert(`📋 Responding to new patient: ${patient.name}\n\nOptions:\n• Start video consultation\n• Call patient directly\n• Send triage questionnaire`);
    } else {
      alert(`💬 Continuing care for: ${patient.name}\n\nLast contact: ${patient.lastUpdate}`);
    }
  };

  // Truncate complaint text for better space usage
  const truncatedComplaint = patient.complaint.length > 80 ? 
    patient.complaint.substring(0, 80) + '...' : patient.complaint;

  return (
    <div className={`group p-3 rounded-lg border transition-all duration-200 hover:shadow-md overflow-hidden ${getAcuityBackgroundColor()}`}>
      {/* Mobile Layout - Compact Stacked */}
      <div className="flex flex-col space-y-2 lg:hidden">
        {/* Row 1: Patient Name and Wait Time */}
        <div className="flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1">
            <div className={`font-bold text-sm leading-tight ${darkMode ? 'text-white' : 'text-gray-900'} truncate`}>
              {patient.entry} {patient.name}, {patient.age}{patient.gender}
            </div>
            <div className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-0.5`}>
              Room #{patient.room}
            </div>
          </div>
          <Badge 
            variant="outline" 
            className={`${getWaitTimeColor()} border-current text-xs px-2 py-0.5 font-semibold bg-white/80 flex-shrink-0`}
          >
            <Clock className="w-3 h-3 mr-1" />
            {getWaitTime()}
          </Badge>
        </div>

        {/* Row 2: Complaint */}
        <div className={`text-sm leading-relaxed ${darkMode ? 'text-gray-200' : 'text-gray-800'} break-words`}>
          {truncatedComplaint}
        </div>

        {/* Row 3: Status and Results */}
        <div className="flex flex-col gap-1">
          <div className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'} truncate`}>
            {patient.status}
          </div>
          {(patient.test || patient.results || isLongerWait) && (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {patient.test && (
                <span className={`${darkMode ? 'text-blue-300' : 'text-blue-600'} font-medium`}>
                  🧪 {patient.test}
                </span>
              )}
              {patient.results && (
                <span className="text-emerald-600 font-medium">
                  ✅ {patient.results}
                </span>
              )}
              {isLongerWait && (
                <span className="text-orange-600 font-semibold flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  Alert
                </span>
              )}
            </div>
          )}
        </div>

        {/* Row 4: Action Buttons */}
        <div className="flex gap-2 pt-1">
          <Button 
            size="sm"
            onClick={handleStartVideoCall}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-3 py-1.5 text-xs flex-1 min-w-0"
          >
            <Video className="w-3 h-3 mr-1" />
            Video
          </Button>
          
          <Button 
            size="sm"
            onClick={handleRespond}
            className="bg-sky-600 hover:bg-sky-700 text-white font-medium px-3 py-1.5 text-xs flex-1 min-w-0"
          >
            {patient.entryMethod === 'phone' ? (
              <Phone className="w-3 h-3 mr-1" />
            ) : (
              <MessageSquare className="w-3 h-3 mr-1" />
            )}
            Respond
          </Button>
        </div>
      </div>

      {/* Desktop Layout - Compact Horizontal Grid */}
      <div className="hidden lg:grid lg:grid-cols-12 lg:gap-3 lg:items-center">
        {/* Column 1-3: Patient Info */}
        <div className="lg:col-span-3 min-w-0">
          <div className={`font-bold text-sm leading-tight ${darkMode ? 'text-white' : 'text-gray-900'} truncate`}>
            {patient.entry} {patient.name}, {patient.age}{patient.gender}
          </div>
          <div className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-0.5`}>
            Room #{patient.room}
          </div>
        </div>

        {/* Column 4-6: Complaint */}
        <div className="lg:col-span-4 min-w-0">
          <div className={`text-sm leading-relaxed ${darkMode ? 'text-gray-200' : 'text-gray-800'} line-clamp-2`}>
            {truncatedComplaint}
          </div>
        </div>

        {/* Column 7-8: Status */}
        <div className="lg:col-span-2 min-w-0">
          <div className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'} truncate`}>
            {patient.status}
          </div>
          {(patient.test || patient.results) && (
            <div className="flex flex-col gap-0.5 mt-1">
              {patient.test && (
                <div className={`text-xs ${darkMode ? 'text-blue-300' : 'text-blue-600'} font-medium truncate`}>
                  🧪 {patient.test}
                </div>
              )}
              {patient.results && (
                <div className="text-xs text-emerald-600 font-medium truncate">
                  ✅ {patient.results}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Column 9: Wait Time */}
        <div className="lg:col-span-1 text-center min-w-0">
          <Badge 
            variant="outline" 
            className={`${getWaitTimeColor()} border-current text-xs px-2 py-1 font-semibold bg-white/80 whitespace-nowrap`}
          >
            <Clock className="w-3 h-3 mr-1" />
            {getWaitTime()}
          </Badge>
          {isLongerWait && (
            <div className="text-xs text-orange-600 font-semibold mt-1 flex items-center justify-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              <span className="truncate">Alert</span>
            </div>
          )}
        </div>

        {/* Column 10-12: Actions */}
        <div className="lg:col-span-2 flex gap-2 justify-end">
          <Button 
            size="sm"
            onClick={handleStartVideoCall}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-2 py-1.5 text-xs whitespace-nowrap"
          >
            <Video className="w-3 h-3 mr-1" />
            Video
          </Button>
          
          <Button 
            size="sm"
            onClick={handleRespond}
            className="bg-sky-600 hover:bg-sky-700 text-white font-medium px-2 py-1.5 text-xs whitespace-nowrap"
          >
            {patient.entryMethod === 'phone' ? (
              <Phone className="w-3 h-3 mr-1" />
            ) : (
              <MessageSquare className="w-3 h-3 mr-1" />
            )}
            Respond
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PatientCard;
