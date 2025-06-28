
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

  return (
    <div className={`group p-3 rounded-lg border transition-all duration-200 hover:shadow-md overflow-hidden ${getRowBackgroundColor()}`}>
      {/* Single Row Layout - Desktop and Mobile */}
      <div className="grid grid-cols-12 gap-2 lg:gap-4 items-center min-h-[60px]">
        {/* Column 1-2: Patient Info */}
        <PatientInfo 
          patient={patient}
          isConciergeSection={isConciergeSection}
          darkMode={darkMode}
        />

        {/* Column 3-5: Complaint/Message */}
        <div className="col-span-12 lg:col-span-3 min-w-0">
          <div className={`text-sm lg:text-base leading-relaxed ${darkMode ? 'text-gray-200' : 'text-gray-800'} line-clamp-2`}>
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
