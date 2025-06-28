
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

  const getAcuityColor = () => {
    switch (patient.acuity) {
      case 1: return 'bg-purple-500 hover:bg-purple-600';
      case 2: return 'bg-cyan-500 hover:bg-cyan-600';
      case 3: return 'bg-emerald-500 hover:bg-emerald-600';
      case 4: return 'bg-slate-500 hover:bg-slate-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const getAcuityLabel = () => {
    switch (patient.acuity) {
      case 1: return 'Critical';
      case 2: return 'Urgent';
      case 3: return 'Semi-urgent';
      case 4: return 'Routine';
      default: return 'Unknown';
    }
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

  return (
    <div className={`group p-3 sm:p-4 lg:p-6 rounded-xl border transition-all duration-300 hover:shadow-lg hover:scale-[1.01] ${
      isLongerWait 
        ? darkMode 
          ? 'bg-gradient-to-r from-orange-900/20 to-orange-800/10 border-orange-300/30 shadow-md border-l-4 border-l-orange-400' 
          : 'bg-gradient-to-r from-orange-50 to-orange-25 border-orange-200 shadow-md border-l-4 border-l-orange-400'
        : darkMode 
          ? 'bg-gradient-to-r from-gray-800/80 to-gray-700/60 border-gray-600/50 hover:from-gray-700/80 hover:to-gray-600/60' 
          : 'bg-white border-gray-200/60 hover:bg-gradient-to-r hover:from-gray-50 hover:to-white shadow-sm'
    }`}>
      {/* Mobile Layout - Stacked */}
      <div className="flex flex-col space-y-3 sm:space-y-4 lg:hidden">
        {/* Top Row - Acuity, Name, Room */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <Badge 
              className={`${getAcuityColor()} text-white text-xs font-semibold px-2 py-1 transition-colors duration-200 shadow-sm flex-shrink-0`}
            >
              {getAcuityLabel()}
            </Badge>
            <div className="min-w-0 flex-1">
              <div className={`font-bold text-sm leading-tight ${darkMode ? 'text-white' : 'text-gray-900'} truncate`}>
                {patient.entry} {patient.name}, {patient.age}{patient.gender}
              </div>
              <div className={`text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'} mt-0.5`}>
                Room #{patient.room}
              </div>
            </div>
          </div>
          <Badge 
            variant="outline" 
            className={`${getWaitTimeColor()} border-current text-xs px-2 py-1 font-semibold bg-white/80 flex-shrink-0`}
          >
            <Clock className="w-3 h-3 mr-1" />
            {getWaitTime()}
          </Badge>
        </div>

        {/* Complaint */}
        <div className={`text-sm font-medium leading-relaxed ${darkMode ? 'text-gray-200' : 'text-gray-800'} break-words`}>
          {patient.complaint}
        </div>

        {/* Status and Tests */}
        <div className="flex items-center justify-between">
          <div className="text-left">
            <div className={`text-sm font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              {patient.status}
            </div>
            {patient.test && (
              <div className={`text-xs ${darkMode ? 'text-blue-300' : 'text-blue-600'} font-medium mt-1`}>
                🧪 {patient.test}
              </div>
            )}
            {patient.results && (
              <div className="text-xs text-emerald-600 font-medium mt-1">
                ✅ {patient.results}
              </div>
            )}
          </div>
          {isLongerWait && (
            <div className="text-xs text-orange-600 font-semibold flex items-center">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Longer wait
            </div>
          )}
        </div>

        {/* Action Buttons - Stacked on mobile */}
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
          <Button 
            size="sm"
            onClick={handleStartVideoCall}
            className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold px-3 py-2 transition-all duration-200 shadow-md hover:shadow-lg text-xs"
          >
            <Video className="w-3 h-3 mr-2" />
            Video Call
          </Button>
          
          <Button 
            size="sm"
            onClick={handleRespond}
            className="bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white font-semibold px-3 py-2 transition-all duration-200 shadow-md hover:shadow-lg text-xs"
          >
            {patient.entryMethod === 'phone' ? (
              <Phone className="w-3 h-3 mr-2" />
            ) : (
              <MessageSquare className="w-3 h-3 mr-2" />
            )}
            Respond
          </Button>
        </div>
      </div>

      {/* Desktop Layout - Horizontal */}
      <div className="hidden lg:flex items-center justify-between">
        {/* Patient Info */}
        <div className="flex items-center space-x-6 flex-grow min-w-0">
          <div className="flex items-center space-x-4">
            <Badge 
              className={`${getAcuityColor()} text-white text-sm font-semibold px-3 py-1.5 transition-colors duration-200 shadow-sm`}
            >
              {getAcuityLabel()}
            </Badge>
            <div className="min-w-0">
              <div className={`font-bold text-lg leading-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {patient.entry} {patient.name}, {patient.age}{patient.gender}
              </div>
              <div className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'} mt-1`}>
                Room #{patient.room}
              </div>
            </div>
          </div>

          <div className="flex-grow min-w-0 px-4">
            <div className={`text-base font-medium leading-relaxed ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              {patient.complaint}
            </div>
          </div>
        </div>

        {/* Status and Actions */}
        <div className="flex items-center space-x-8 flex-shrink-0">
          <div className="text-center">
            <div className={`text-sm font-semibold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              {patient.status}
            </div>
            {patient.test && (
              <div className={`text-xs ${darkMode ? 'text-blue-300' : 'text-blue-600'} font-medium`}>
                🧪 {patient.test}
              </div>
            )}
            {patient.results && (
              <div className="text-xs text-emerald-600 font-medium mt-1">
                ✅ {patient.results}
              </div>
            )}
          </div>

          <div className="text-center">
            <Badge 
              variant="outline" 
              className={`${getWaitTimeColor()} border-current text-sm px-3 py-1.5 font-semibold bg-white/80`}
            >
              <Clock className="w-3.5 h-3.5 mr-1.5" />
              {getWaitTime()}
            </Badge>
            {isLongerWait && (
              <div className="text-xs text-orange-600 font-semibold mt-2 flex items-center justify-center">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Longer wait
              </div>
            )}
          </div>

          <div className="flex space-x-3">
            <Button 
              size="sm"
              onClick={handleStartVideoCall}
              className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold px-4 py-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <Video className="w-4 h-4 mr-2" />
              Video
            </Button>
            
            <Button 
              size="sm"
              onClick={handleRespond}
              className="bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white font-semibold px-4 py-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              {patient.entryMethod === 'phone' ? (
                <Phone className="w-4 h-4 mr-2" />
              ) : (
                <MessageSquare className="w-4 h-4 mr-2" />
              )}
              Respond
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientCard;
