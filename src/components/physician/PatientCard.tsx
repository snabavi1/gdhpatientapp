
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Video, Phone, MessageSquare, Clock, AlertTriangle, Activity, Thermometer, Heart, Droplets } from 'lucide-react';

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

interface PatientCardProps {
  patient: Patient;
  darkMode: boolean;
  isTriageSection?: boolean;
  isConciergeSection?: boolean;
}

const PatientCard: React.FC<PatientCardProps> = ({ 
  patient, 
  darkMode, 
  isTriageSection = false,
  isConciergeSection = false 
}) => {
  const waitMins = (Date.now() - new Date(patient.arrivalTimestamp).getTime()) / 60000;
  const waitHours = waitMins / 60;
  const isUrgentWait = isTriageSection && waitMins >= 7;
  const isOverdueMessage = isConciergeSection && waitHours >= 24;

  const getWaitTime = () => {
    if (isConciergeSection) {
      if (waitHours >= 24) {
        const days = Math.floor(waitHours / 24);
        const hours = Math.floor(waitHours % 24);
        return days > 0 ? `${days}d ${hours}h` : `${Math.floor(waitHours)}h`;
      }
      return `${Math.floor(waitHours)}h`;
    }
    
    if (waitMins >= 60) {
      const hours = Math.floor(waitMins / 60);
      const mins = Math.floor(waitMins % 60);
      return `${hours}h ${mins}m`;
    }
    return `${Math.floor(waitMins)}m`;
  };

  const getWaitTimeColor = () => {
    if (isTriageSection) {
      if (waitMins >= 7) return 'text-red-600 font-bold animate-pulse';
      if (waitMins >= 5) return 'text-orange-600 font-semibold';
      if (waitMins >= 3) return 'text-yellow-600 font-medium';
      return 'text-green-600 font-medium';
    }
    if (isConciergeSection) {
      if (waitHours >= 24) return 'text-red-600 font-bold';
      if (waitHours >= 18) return 'text-orange-600 font-semibold';
      return darkMode ? 'text-slate-400' : 'text-slate-600';
    }
    return darkMode ? 'text-slate-400' : 'text-slate-600';
  };

  const getRowBackgroundColor = () => {
    if (isUrgentWait) {
      return darkMode 
        ? 'bg-gradient-to-r from-red-900/40 to-red-800/20 border-red-400/50 border-l-4 border-l-red-500' 
        : 'bg-gradient-to-r from-red-50 to-red-25 border-red-200 border-l-4 border-l-red-500';
    }
    
    if (isOverdueMessage) {
      return darkMode 
        ? 'bg-gradient-to-r from-orange-900/30 to-orange-800/15 border-orange-400/50 border-l-4 border-l-orange-500' 
        : 'bg-gradient-to-r from-orange-50 to-orange-25 border-orange-200 border-l-4 border-l-orange-500';
    }
    
    // Acuity-based colors for triaged patients
    if (patient.acuity) {
      const acuityColors = {
        1: darkMode ? 'border-l-purple-400 border-l-4' : 'border-l-purple-400 border-l-4',
        2: darkMode ? 'border-l-red-400 border-l-4' : 'border-l-red-400 border-l-4',
        3: darkMode ? 'border-l-yellow-400 border-l-4' : 'border-l-yellow-400 border-l-4',
        4: darkMode ? 'border-l-green-400 border-l-4' : 'border-l-green-400 border-l-4',
        5: darkMode ? 'border-l-blue-400 border-l-4' : 'border-l-blue-400 border-l-4'
      };
      const acuityBorder = acuityColors[patient.acuity as keyof typeof acuityColors] || 'border-l-gray-400 border-l-2';
      
      return darkMode 
        ? `bg-gradient-to-r from-gray-800/90 to-gray-700/70 border-gray-600/50 hover:from-gray-700/90 hover:to-gray-600/70 ${acuityBorder}` 
        : `bg-white border-gray-200/60 hover:bg-gradient-to-r hover:from-gray-50 hover:to-white ${acuityBorder}`;
    }
    
    return darkMode 
      ? 'bg-gradient-to-r from-gray-800/90 to-gray-700/70 border-gray-600/50 hover:from-gray-700/90 hover:to-gray-600/70 border-l-2 border-l-gray-500' 
      : 'bg-white border-gray-200/60 hover:bg-gradient-to-r hover:from-gray-50 hover:to-white border-l-2 border-l-gray-400';
  };

  const getVitalSignColor = (vital: string, value: number | string) => {
    if (!patient.vitalSigns) return '';
    
    switch (vital) {
      case 'heartRate':
        const hr = value as number;
        if (hr > 100 || hr < 60) return 'text-red-600 font-semibold';
        break;
      case 'temperature':
        const temp = value as number;
        if (temp > 100.4 || temp < 96) return 'text-red-600 font-semibold';
        break;
      case 'oxygenSaturation':
        const o2 = value as number;
        if (o2 < 95) return 'text-red-600 font-semibold';
        break;
      case 'painScale':
        const pain = value as number;
        if (pain >= 7) return 'text-red-600 font-semibold';
        if (pain >= 4) return 'text-orange-600 font-medium';
        break;
      case 'bloodPressure':
        const bp = value as string;
        const [systolic] = bp.split('/').map(Number);
        if (systolic > 140 || systolic < 90) return 'text-red-600 font-semibold';
        break;
    }
    return darkMode ? 'text-slate-300' : 'text-slate-700';
  };

  const handleStartVideoCall = async () => {
    if (isConciergeSection) {
      alert(`💬 Responding to message from ${patient.name}...\n\nMessage type: ${patient.messageType}\nWill send response via preferred communication method`);
    } else {
      alert(`🎥 Starting video session for ${patient.name}...\n\nVideo link will be sent to: ${patient.phone}\nPatient will join via SMS link`);
    }
  };

  const handleRespond = () => {
    if (isConciergeSection) {
      alert(`📝 Reviewing message from: ${patient.name}\n\nType: ${patient.messageType}\nReceived: ${patient.arrivalTime}`);
    } else if (isTriageSection) {
      alert(`🩺 Starting triage for: ${patient.name}\n\nComplaint: ${patient.complaint}\nWait time: ${getWaitTime()}`);
    } else {
      alert(`👨‍⚕️ Continuing care for: ${patient.name}\n\nCurrent status: ${patient.status}`);
    }
  };

  return (
    <div className={`group p-3 rounded-lg border transition-all duration-200 hover:shadow-md overflow-hidden ${getRowBackgroundColor()}`}>
      {/* Single Row Layout - Desktop and Mobile */}
      <div className="grid grid-cols-12 gap-2 lg:gap-4 items-center min-h-[60px]">
        {/* Column 1-2: Patient Info */}
        <div className="col-span-12 lg:col-span-2 min-w-0">
          <div className={`font-bold text-sm lg:text-base leading-tight ${darkMode ? 'text-white' : 'text-gray-900'} truncate`}>
            {isConciergeSection ? patient.name : `${patient.entry} ${patient.name}`}
          </div>
          <div className={`text-xs lg:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-0.5`}>
            {isConciergeSection ? (
              <span className="capitalize">{patient.messageType}</span>
            ) : (
              <>
                {patient.age}{patient.gender} • Room #{patient.room}
                {patient.acuity && (
                  <span className="ml-2 px-1 py-0.5 bg-gray-200 text-gray-800 rounded text-xs font-medium">
                    ESI {patient.acuity}
                  </span>
                )}
              </>
            )}
          </div>
        </div>

        {/* Column 3-5: Complaint/Message */}
        <div className="col-span-12 lg:col-span-3 min-w-0">
          <div className={`text-sm lg:text-base leading-relaxed ${darkMode ? 'text-gray-200' : 'text-gray-800'} line-clamp-2`}>
            {patient.complaint}
          </div>
        </div>

        {/* Column 6-7: Vital Signs (only for medical patients) */}
        {!isConciergeSection && patient.vitalSigns && (
          <div className="col-span-12 lg:col-span-2 min-w-0">
            <div className="grid grid-cols-2 gap-1 text-xs">
              {patient.vitalSigns.bloodPressure && (
                <div className={`flex items-center gap-1 ${getVitalSignColor('bloodPressure', patient.vitalSigns.bloodPressure)}`}>
                  <Droplets className="w-3 h-3" />
                  <span>{patient.vitalSigns.bloodPressure}</span>
                </div>
              )}
              {patient.vitalSigns.heartRate && (
                <div className={`flex items-center gap-1 ${getVitalSignColor('heartRate', patient.vitalSigns.heartRate)}`}>
                  <Heart className="w-3 h-3" />
                  <span>{patient.vitalSigns.heartRate}</span>
                </div>
              )}
              {patient.vitalSigns.temperature && (
                <div className={`flex items-center gap-1 ${getVitalSignColor('temperature', patient.vitalSigns.temperature)}`}>
                  <Thermometer className="w-3 h-3" />
                  <span>{patient.vitalSigns.temperature}°F</span>
                </div>
              )}
              {patient.vitalSigns.oxygenSaturation && (
                <div className={`flex items-center gap-1 ${getVitalSignColor('oxygenSaturation', patient.vitalSigns.oxygenSaturation)}`}>
                  <Activity className="w-3 h-3" />
                  <span>{patient.vitalSigns.oxygenSaturation}%</span>
                </div>
              )}
            </div>
            {patient.vitalSigns.painScale !== undefined && (
              <div className={`text-xs mt-1 ${getVitalSignColor('painScale', patient.vitalSigns.painScale)}`}>
                Pain: {patient.vitalSigns.painScale}/10
              </div>
            )}
          </div>
        )}

        {/* Column 8-9: Status/Tests */}
        <div className={`col-span-12 ${!isConciergeSection && patient.vitalSigns ? 'lg:col-span-2' : 'lg:col-span-4'} min-w-0`}>
          <div className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'} line-clamp-2`}>
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

        {/* Column 10: Wait Time */}
        <div className="col-span-6 lg:col-span-1 text-center min-w-0">
          <Badge 
            variant="outline" 
            className={`${getWaitTimeColor()} border-current text-xs px-2 py-1 font-semibold bg-white/80 whitespace-nowrap`}
          >
            <Clock className="w-3 h-3 mr-1" />
            {getWaitTime()}
          </Badge>
          {(isUrgentWait || isOverdueMessage) && (
            <div className="text-xs text-red-600 font-semibold mt-1 flex items-center justify-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              <span>Alert</span>
            </div>
          )}
        </div>

        {/* Column 11-12: Actions */}
        <div className="col-span-6 lg:col-span-2 flex gap-2 justify-end">
          <Button 
            size="sm"
            onClick={handleStartVideoCall}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-2 py-1.5 text-xs whitespace-nowrap"
          >
            {isConciergeSection ? (
              <>
                <MessageSquare className="w-3 h-3 mr-1" />
                Reply
              </>
            ) : (
              <>
                <Video className="w-3 h-3 mr-1" />
                Video
              </>
            )}
          </Button>
          
          <Button 
            size="sm"
            onClick={handleRespond}
            className="bg-sky-600 hover:bg-sky-700 text-white font-medium px-2 py-1.5 text-xs whitespace-nowrap"
          >
            {isConciergeSection ? (
              <>
                <Phone className="w-3 h-3 mr-1" />
                Review
              </>
            ) : patient.entryMethod === 'phone' ? (
              <>
                <Phone className="w-3 h-3 mr-1" />
                Call
              </>
            ) : (
              <>
                <MessageSquare className="w-3 h-3 mr-1" />
                {isTriageSection ? 'Triage' : 'Respond'}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PatientCard;
