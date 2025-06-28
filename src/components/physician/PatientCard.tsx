
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
    if (patient.section !== 'triage') return darkMode ? 'text-gray-400' : 'text-gray-600';
    if (waitMins >= 6) return 'text-orange-600';
    if (waitMins >= 4) return 'text-amber-600';
    return 'text-blue-600';
  };

  const getAcuityColor = () => {
    switch (patient.acuity) {
      case 1: return 'bg-purple-500';
      case 2: return 'bg-cyan-500';
      case 3: return 'bg-green-500';
      case 4: return 'bg-slate-500';
      default: return 'bg-gray-500';
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
    <div className={`p-4 rounded-lg border transition-all duration-200 ${
      isLongerWait 
        ? darkMode 
          ? 'bg-orange-900/10 border-orange-300/30 shadow-md border-l-4 border-l-orange-400' 
          : 'bg-orange-50 border-orange-200 shadow-md border-l-4 border-l-orange-400'
        : darkMode 
          ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
    }`}>
      <div className="flex items-center justify-between">
        {/* Patient Info */}
        <div className="flex items-center space-x-4 flex-grow">
          <div className="flex items-center space-x-2">
            <Badge className={`${getAcuityColor()} text-white text-xs font-semibold px-2 py-1`}>
              {getAcuityLabel()}
            </Badge>
            <div>
              <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {patient.entry} {patient.name}, {patient.age}{patient.gender}
              </div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Room #{patient.room}
              </div>
            </div>
          </div>

          <div className="flex-grow">
            <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {patient.complaint}
            </div>
          </div>
        </div>

        {/* Status and Actions */}
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {patient.status}
            </div>
            {patient.test && (
              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                🧪 {patient.test}
              </div>
            )}
            {patient.results && (
              <div className="text-xs text-green-500">
                ✅ {patient.results}
              </div>
            )}
          </div>

          <div className="text-center">
            <Badge 
              variant="outline" 
              className={`${getWaitTimeColor()} border-current`}
            >
              <Clock className="w-3 h-3 mr-1" />
              {getWaitTime()}
            </Badge>
            {isLongerWait && (
              <div className="text-xs text-orange-600 font-medium mt-1">
                Longer wait
              </div>
            )}
          </div>

          <div className="flex space-x-2">
            <Button 
              size="sm"
              onClick={handleStartVideoCall}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Video className="w-4 h-4 mr-1" />
              Video
            </Button>
            
            <Button 
              size="sm"
              onClick={handleRespond}
              className="bg-cyan-600 hover:bg-cyan-700 text-white"
            >
              {patient.entryMethod === 'phone' ? (
                <Phone className="w-4 h-4 mr-1" />
              ) : (
                <MessageSquare className="w-4 h-4 mr-1" />
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
