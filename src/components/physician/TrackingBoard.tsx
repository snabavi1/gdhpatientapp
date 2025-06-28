
import React, { useState, useEffect } from 'react';
import PatientSection from './PatientSection';
import { mockPatients } from '@/services/mockData';

interface TrackingBoardProps {
  darkMode: boolean;
}

const TrackingBoard: React.FC<TrackingBoardProps> = ({ darkMode }) => {
  const [patients, setPatients] = useState(mockPatients);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setPatients(prev => prev.map(patient => ({
        ...patient,
        lastUpdate: new Date().toISOString()
      })));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const sortPatients = (patientList: typeof mockPatients) => {
    return [...patientList].sort((a, b) => {
      if (a.section === 'triage' && b.section === 'triage') {
        const aWaitMins = (Date.now() - new Date(a.arrivalTimestamp).getTime()) / 60000;
        const bWaitMins = (Date.now() - new Date(b.arrivalTimestamp).getTime()) / 60000;
        
        if (aWaitMins >= 6 && bWaitMins < 6) return -1;
        if (bWaitMins >= 6 && aWaitMins < 6) return 1;
        
        if (a.acuity !== b.acuity) return a.acuity - b.acuity;
        return new Date(b.arrivalTimestamp).getTime() - new Date(a.arrivalTimestamp).getTime();
      }
      
      if (a.acuity !== b.acuity) return a.acuity - b.acuity;
      return new Date(a.arrivalTimestamp).getTime() - new Date(b.arrivalTimestamp).getTime();
    });
  };

  const triagePatients = sortPatients(patients.filter(p => p.section === 'triage' && !p.physicianSeen));
  const pendingResults = sortPatients(patients.filter(p => p.section === 'pending' && p.physicianSeen));
  const needsDisposition = sortPatients(patients.filter(p => p.section === 'disposition' && p.physicianSeen));
  const followUp = sortPatients(patients.filter(p => p.section === 'followup'));

  return (
    <div className={`p-8 space-y-8 max-w-7xl mx-auto ${darkMode ? 'bg-gray-900' : 'bg-slate-50'} min-h-screen`}>
      {/* Triage Section - Priority 1 */}
      <PatientSection
        title="⏳ AWAITING TRIAGE"
        patients={triagePatients}
        emptyMessage="No patients awaiting triage"
        bgColor={darkMode 
          ? "bg-gradient-to-r from-emerald-900/30 to-emerald-800/20" 
          : "bg-gradient-to-r from-emerald-50 to-emerald-25"
        }
        borderColor="border-l-emerald-700"
        textColor={darkMode ? "text-emerald-200" : "text-emerald-800"}
        isTriageSection={true}
        animationDelay="0s"
        darkMode={darkMode}
      />

      {/* Pending Results Section */}
      <PatientSection
        title="🔄 PENDING RESULTS"
        patients={pendingResults}
        emptyMessage="No pending results"
        bgColor={darkMode 
          ? "bg-gradient-to-r from-sky-900/30 to-sky-800/20" 
          : "bg-gradient-to-r from-sky-50 to-sky-25"
        }
        borderColor="border-l-sky-600"
        textColor={darkMode ? "text-sky-200" : "text-sky-800"}
        animationDelay="0.1s"
        darkMode={darkMode}
      />

      {/* Needs Disposition Section */}
      <PatientSection
        title="📋 NEEDS DISPOSITION"
        patients={needsDisposition}
        emptyMessage="No patients need disposition"
        bgColor={darkMode 
          ? "bg-gradient-to-r from-mint-900/30 to-mint-800/20" 
          : "bg-gradient-to-r from-mint-50 to-mint-25"
        }
        borderColor="border-l-mint-500"
        textColor={darkMode ? "text-mint-200" : "text-mint-700"}
        animationDelay="0.2s"
        darkMode={darkMode}
      />

      {/* Follow-up Section */}
      <PatientSection
        title="📞 FOLLOW-UP DUE"
        patients={followUp}
        emptyMessage="No follow-ups due"
        bgColor={darkMode 
          ? "bg-gradient-to-r from-amber-900/30 to-amber-800/20" 
          : "bg-gradient-to-r from-amber-50 to-amber-25"
        }
        borderColor="border-l-amber-600"
        textColor={darkMode ? "text-amber-200" : "text-amber-800"}
        animationDelay="0.3s"
        darkMode={darkMode}
      />
    </div>
  );
};

export default TrackingBoard;
