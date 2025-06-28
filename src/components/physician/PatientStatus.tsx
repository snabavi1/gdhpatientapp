
import React from 'react';

interface Patient {
  status: string;
  test?: string;
  results?: string;
}

interface PatientStatusProps {
  patient: Patient;
  hasVitalSigns: boolean;
  darkMode: boolean;
}

const PatientStatus: React.FC<PatientStatusProps> = ({ 
  patient, 
  hasVitalSigns, 
  darkMode 
}) => {
  return (
    <div className={`col-span-12 ${hasVitalSigns ? 'lg:col-span-2' : 'lg:col-span-4'} min-w-0`}>
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
  );
};

export default PatientStatus;
