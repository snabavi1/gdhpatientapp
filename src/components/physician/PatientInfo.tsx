
import React from 'react';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  entry: string;
  room: string;
  acuity?: number;
  messageType?: 'request' | 'question' | 'concern';
}

interface PatientInfoProps {
  patient: Patient;
  isConciergeSection: boolean;
  darkMode: boolean;
}

const PatientInfo: React.FC<PatientInfoProps> = ({ 
  patient, 
  isConciergeSection, 
  darkMode 
}) => {
  return (
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
  );
};

export default PatientInfo;
