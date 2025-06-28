
import React from 'react';
import PatientInfo from './PatientInfo';
import VitalSigns from './VitalSigns';
import PatientStatus from './PatientStatus';
import WaitTime from './WaitTime';
import PatientActions from './PatientActions';

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

  const getRowBackgroundColor = () => {
    if (isUrgentWait) {
      return darkMode 
        ? 'bg-gradient-to-r from-orange-900/20 to-orange-800/10 border-orange-300/30 border-l-2 border-l-orange-400' 
        : 'bg-gradient-to-r from-orange-50/70 to-orange-25/50 border-orange-100/60 border-l-2 border-l-orange-400';
    }
    
    if (isOverdueMessage) {
      return darkMode 
        ? 'bg-gradient-to-r from-amber-900/20 to-amber-800/10 border-amber-300/30 border-l-2 border-l-amber-400' 
        : 'bg-gradient-to-r from-amber-50/70 to-amber-25/50 border-amber-100/60 border-l-2 border-l-amber-400';
    }
    
    // Acuity-based colors for triaged patients - softer tones
    if (patient.acuity) {
      const acuityColors = {
        1: darkMode ? 'border-l-purple-300 border-l-2' : 'border-l-purple-300 border-l-2',
        2: darkMode ? 'border-l-coral-300 border-l-2' : 'border-l-red-300 border-l-2',
        3: darkMode ? 'border-l-yellow-300 border-l-2' : 'border-l-yellow-300 border-l-2',
        4: darkMode ? 'border-l-green-300 border-l-2' : 'border-l-green-300 border-l-2',
        5: darkMode ? 'border-l-blue-300 border-l-2' : 'border-l-blue-300 border-l-2'
      };
      const acuityBorder = acuityColors[patient.acuity as keyof typeof acuityColors] || 'border-l-gray-300 border-l-2';
      
      return darkMode 
        ? `bg-slate-800/50 border-slate-600/30 hover:bg-slate-700/50 ${acuityBorder}` 
        : `bg-white/80 border-slate-200/40 hover:bg-slate-50/50 ${acuityBorder}`;
    }
    
    return darkMode 
      ? 'bg-slate-800/50 border-slate-600/30 hover:bg-slate-700/50 border-l-2 border-l-slate-400' 
      : 'bg-white/80 border-slate-200/40 hover:bg-slate-50/50 border-l-2 border-l-slate-300';
  };

  return (
    <div className={`group p-4 rounded-lg border transition-all duration-500 hover:shadow-sm overflow-hidden ${getRowBackgroundColor()}`}>
      {/* Single Row Layout - Desktop and Mobile */}
      <div className="grid grid-cols-12 gap-3 lg:gap-4 items-center min-h-[50px]">
        {/* Column 1-2: Patient Info */}
        <PatientInfo 
          patient={patient}
          isConciergeSection={isConciergeSection}
          darkMode={darkMode}
        />

        {/* Column 3-5: Complaint/Message */}
        <div className="col-span-12 lg:col-span-3 min-w-0">
          <div className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'} line-clamp-2`}>
            {patient.complaint}
          </div>
        </div>

        {/* Column 6-7: Vital Signs (only for medical patients) */}
        {!isConciergeSection && patient.vitalSigns && (
          <VitalSigns 
            vitalSigns={patient.vitalSigns}
            darkMode={darkMode}
          />
        )}

        {/* Column 8-9: Status/Tests */}
        <PatientStatus 
          patient={patient}
          hasVitalSigns={!isConciergeSection && !!patient.vitalSigns}
          darkMode={darkMode}
        />

        {/* Column 10: Wait Time */}
        <WaitTime 
          arrivalTimestamp={patient.arrivalTimestamp}
          isTriageSection={isTriageSection}
          isConciergeSection={isConciergeSection}
          darkMode={darkMode}
        />

        {/* Column 11-12: Actions */}
        <PatientActions 
          patient={patient}
          isTriageSection={isTriageSection}
          isConciergeSection={isConciergeSection}
        />
      </div>
    </div>
  );
};

export default PatientCard;
