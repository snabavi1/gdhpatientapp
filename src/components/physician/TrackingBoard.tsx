
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

  const sortPatientsByPriority = (patientList: typeof mockPatients) => {
    return [...patientList].sort((a, b) => {
      // For untriaged patients, sort by wait time (longest first)
      if (a.section === 'untriaged' && b.section === 'untriaged') {
        const aWaitMins = (Date.now() - new Date(a.arrivalTimestamp).getTime()) / 60000;
        const bWaitMins = (Date.now() - new Date(b.arrivalTimestamp).getTime()) / 60000;
        return bWaitMins - aWaitMins; // Longest wait first
      }
      
      // For triaged patients awaiting full evaluation, sort by acuity then wait time
      if (a.section === 'triaged-awaiting' && b.section === 'triaged-awaiting') {
        if (a.acuity !== b.acuity) return (a.acuity || 5) - (b.acuity || 5);
        return new Date(a.triageTimestamp || a.arrivalTimestamp).getTime() - new Date(b.triageTimestamp || b.arrivalTimestamp).getTime();
      }
      
      // For tests ordered, sort by expected completion time
      if (a.section === 'tests-ordered' && b.section === 'tests-ordered') {
        if (a.expectedTestCompletion && b.expectedTestCompletion) {
          return new Date(a.expectedTestCompletion).getTime() - new Date(b.expectedTestCompletion).getTime();
        }
        return new Date(a.arrivalTimestamp).getTime() - new Date(b.arrivalTimestamp).getTime();
      }
      
      // For results ready, sort by acuity then arrival time
      if (a.section === 'results-ready' && b.section === 'results-ready') {
        if (a.acuity !== b.acuity) return (a.acuity || 5) - (b.acuity || 5);
        return new Date(a.arrivalTimestamp).getTime() - new Date(b.arrivalTimestamp).getTime();
      }
      
      // For concierge messages, sort by arrival time (oldest first)
      if (a.section === 'concierge' && b.section === 'concierge') {
        return new Date(a.arrivalTimestamp).getTime() - new Date(b.arrivalTimestamp).getTime();
      }
      
      return 0;
    });
  };

  const untriagedPatients = sortPatientsByPriority(patients.filter(p => p.section === 'untriaged'));
  const triagedAwaitingPatients = sortPatientsByPriority(patients.filter(p => p.section === 'triaged-awaiting'));
  const testsOrderedPatients = sortPatientsByPriority(patients.filter(p => p.section === 'tests-ordered'));
  const resultsReadyPatients = sortPatientsByPriority(patients.filter(p => p.section === 'results-ready'));
  const conciergePatients = sortPatientsByPriority(patients.filter(p => p.section === 'concierge'));

  return (
    <div className={`p-3 sm:p-4 lg:p-5 space-y-4 max-w-7xl mx-auto ${darkMode ? 'bg-gray-900' : 'bg-slate-50'} min-h-screen overflow-hidden`}>
      {/* Level 1: Untriaged - Waiting Room (Highest Priority) */}
      <PatientSection
        title="🚨 UNTRIAGED - WAITING ROOM"
        patients={untriagedPatients}
        emptyMessage="No patients in waiting room"
        bgColor={darkMode 
          ? "bg-gradient-to-r from-red-900/40 to-red-800/30" 
          : "bg-gradient-to-r from-red-50 to-red-25"
        }
        borderColor="border-l-red-600"
        textColor={darkMode ? "text-red-200" : "text-red-800"}
        isTriageSection={true}
        animationDelay="0s"
        darkMode={darkMode}
      />

      {/* Level 2: Triaged - Awaiting Full Evaluation */}
      <PatientSection
        title="🔄 TRIAGED - AWAITING FULL EVALUATION"
        patients={triagedAwaitingPatients}
        emptyMessage="No patients awaiting full evaluation"
        bgColor={darkMode 
          ? "bg-gradient-to-r from-orange-900/30 to-orange-800/20" 
          : "bg-gradient-to-r from-orange-50 to-orange-25"
        }
        borderColor="border-l-orange-600"
        textColor={darkMode ? "text-orange-200" : "text-orange-800"}
        animationDelay="0.05s"
        darkMode={darkMode}
      />

      {/* Level 3: Tests Ordered - Awaiting Results */}
      <PatientSection
        title="🧪 TESTS ORDERED - AWAITING RESULTS"
        patients={testsOrderedPatients}
        emptyMessage="No tests in progress"
        bgColor={darkMode 
          ? "bg-gradient-to-r from-blue-900/30 to-blue-800/20" 
          : "bg-gradient-to-r from-blue-50 to-blue-25"
        }
        borderColor="border-l-blue-600"
        textColor={darkMode ? "text-blue-200" : "text-blue-800"}
        animationDelay="0.1s"
        darkMode={darkMode}
      />

      {/* Level 4: Results Ready - Awaiting Disposition */}
      <PatientSection
        title="📋 RESULTS READY - AWAITING DISPOSITION"
        patients={resultsReadyPatients}
        emptyMessage="No results awaiting review"
        bgColor={darkMode 
          ? "bg-gradient-to-r from-emerald-900/30 to-emerald-800/20" 
          : "bg-gradient-to-r from-emerald-50 to-emerald-25"
        }
        borderColor="border-l-emerald-600"
        textColor={darkMode ? "text-emerald-200" : "text-emerald-800"}
        animationDelay="0.15s"
        darkMode={darkMode}
      />

      {/* Level 5: Concierge Inbox (24-hour target) */}
      <PatientSection
        title="💬 CONCIERGE INBOX"
        patients={conciergePatients}
        emptyMessage="No patient messages"
        bgColor={darkMode 
          ? "bg-gradient-to-r from-purple-900/30 to-purple-800/20" 
          : "bg-gradient-to-r from-purple-50 to-purple-25"
        }
        borderColor="border-l-purple-600"
        textColor={darkMode ? "text-purple-200" : "text-purple-800"}
        isConciergeSection={true}
        animationDelay="0.2s"
        darkMode={darkMode}
      />
    </div>
  );
};

export default TrackingBoard;
