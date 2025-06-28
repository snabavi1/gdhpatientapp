
import React from 'react';
import SectionHeader from './SectionHeader';
import SectionCard from './SectionCard';
import PatientCard from './PatientCard';

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

interface PatientSectionProps {
  title: string;
  patients: Patient[];
  emptyMessage: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  isTriageSection?: boolean;
  animationDelay?: string;
  darkMode: boolean;
}

const PatientSection: React.FC<PatientSectionProps> = ({
  title,
  patients,
  emptyMessage,
  bgColor,
  borderColor,
  textColor,
  isTriageSection = false,
  animationDelay = '0s',
  darkMode
}) => {
  return (
    <SectionCard 
      isEmpty={patients.length === 0} 
      emptyMessage={emptyMessage}
      animationDelay={animationDelay}
      darkMode={darkMode}
    >
      <SectionHeader 
        title={title} 
        count={patients.length} 
        bgColor={bgColor}
        borderColor={borderColor}
        textColor={textColor}
        patients={patients} 
        isTriageSection={isTriageSection}
        animationDelay={animationDelay}
        darkMode={darkMode}
      />
      {patients.length > 0 && (
        <div className={`p-2 space-y-2 ${darkMode ? 'bg-gray-800/40' : 'bg-gray-50/50'}`}>
          {/* Multi-column layout for desktop, single column for mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-3">
            {patients.map((patient, index) => (
              <div 
                key={patient.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${0.05 * (index + 1)}s` }}
              >
                <PatientCard patient={patient} darkMode={darkMode} />
              </div>
            ))}
          </div>
        </div>
      )}
    </SectionCard>
  );
};

export default PatientSection;
