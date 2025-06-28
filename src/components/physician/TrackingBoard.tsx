
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, AlertTriangle } from 'lucide-react';
import PatientCard from './PatientCard';
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

  const SectionHeader = ({ 
    title, 
    count, 
    bgColor,
    borderColor,
    textColor,
    patients, 
    isTriageSection = false,
    animationDelay = '0s'
  }: { 
    title: string; 
    count: number; 
    bgColor: string;
    borderColor: string;
    textColor: string;
    patients: typeof mockPatients; 
    isTriageSection?: boolean; 
    animationDelay?: string;
  }) => {
    const longWaitPatients = isTriageSection ? 
      patients.filter(p => (Date.now() - new Date(p.arrivalTimestamp).getTime()) / 60000 >= 6).length : 0;
    
    return (
      <div 
        className={`${bgColor} ${borderColor} border-l-8 rounded-t-xl px-8 py-6 shadow-sm animate-fade-in`}
        style={{ animationDelay }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h3 className={`text-2xl font-bold tracking-tight ${textColor}`}>
              {title}
            </h3>
            <Badge className={`${darkMode ? 'bg-white/20 text-white' : 'bg-white/80 text-gray-800'} border-0 text-sm px-3 py-1 font-semibold`}>
              {count} patient{count !== 1 ? 's' : ''}
            </Badge>
            {longWaitPatients > 0 && (
              <Badge className="bg-orange-100 text-orange-800 border-orange-200 border px-3 py-1 font-medium">
                <AlertTriangle className="w-3 h-3 mr-1" />
                {longWaitPatients} longer wait
              </Badge>
            )}
          </div>
          {isTriageSection && (
            <div className={`flex items-center space-x-2 ${darkMode ? 'text-emerald-100' : 'text-emerald-700'} text-sm font-medium`}>
              <Clock className="w-4 h-4" />
              <span>Target: &lt;7 min</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const SectionCard = ({ 
    children, 
    isEmpty, 
    emptyMessage, 
    animationDelay = '0s' 
  }: { 
    children: React.ReactNode;
    isEmpty: boolean;
    emptyMessage: string;
    animationDelay?: string;
  }) => (
    <Card 
      className={`overflow-hidden transition-all duration-300 hover:shadow-lg border-0 shadow-md animate-fade-in ${
        darkMode ? 'bg-gray-800/60' : 'bg-white'
      }`}
      style={{ animationDelay }}
    >
      {children}
      {isEmpty && (
        <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <div className="text-4xl mb-3">✅</div>
          <p className="text-lg font-medium">{emptyMessage}</p>
        </div>
      )}
    </Card>
  );

  return (
    <div className={`p-8 space-y-8 max-w-7xl mx-auto ${darkMode ? 'bg-gray-900' : 'bg-slate-50'} min-h-screen`}>
      {/* Triage Section - Priority 1 */}
      <SectionCard 
        isEmpty={triagePatients.length === 0} 
        emptyMessage="No patients awaiting triage"
        animationDelay="0s"
      >
        <SectionHeader 
          title="⏳ AWAITING TRIAGE" 
          count={triagePatients.length} 
          bgColor={darkMode 
            ? "bg-gradient-to-r from-emerald-900/30 to-emerald-800/20" 
            : "bg-gradient-to-r from-emerald-50 to-emerald-25"
          }
          borderColor="border-l-emerald-700"
          textColor={darkMode ? "text-emerald-200" : "text-emerald-800"}
          patients={triagePatients} 
          isTriageSection={true}
          animationDelay="0s"
        />
        {triagePatients.length > 0 && (
          <div className={`p-6 space-y-4 ${darkMode ? 'bg-gray-800/40' : 'bg-gray-50/50'}`}>
            {triagePatients.map((patient, index) => (
              <div 
                key={patient.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <PatientCard patient={patient} darkMode={darkMode} />
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      {/* Pending Results Section */}
      <SectionCard 
        isEmpty={pendingResults.length === 0} 
        emptyMessage="No pending results"
        animationDelay="0.1s"
      >
        <SectionHeader 
          title="🔄 PENDING RESULTS" 
          count={pendingResults.length} 
          bgColor={darkMode 
            ? "bg-gradient-to-r from-sky-900/30 to-sky-800/20" 
            : "bg-gradient-to-r from-sky-50 to-sky-25"
          }
          borderColor="border-l-sky-600"
          textColor={darkMode ? "text-sky-200" : "text-sky-800"}
          patients={pendingResults}
          animationDelay="0.1s"
        />
        {pendingResults.length > 0 && (
          <div className={`p-6 space-y-4 ${darkMode ? 'bg-gray-800/40' : 'bg-gray-50/50'}`}>
            {pendingResults.map((patient, index) => (
              <div 
                key={patient.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${0.1 * (index + 2)}s` }}
              >
                <PatientCard patient={patient} darkMode={darkMode} />
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      {/* Needs Disposition Section */}
      <SectionCard 
        isEmpty={needsDisposition.length === 0} 
        emptyMessage="No patients need disposition"
        animationDelay="0.2s"
      >
        <SectionHeader 
          title="📋 NEEDS DISPOSITION" 
          count={needsDisposition.length} 
          bgColor={darkMode 
            ? "bg-gradient-to-r from-mint-900/30 to-mint-800/20" 
            : "bg-gradient-to-r from-mint-50 to-mint-25"
          }
          borderColor="border-l-mint-500"
          textColor={darkMode ? "text-mint-200" : "text-mint-700"}
          patients={needsDisposition}
          animationDelay="0.2s"
        />
        {needsDisposition.length > 0 && (
          <div className={`p-6 space-y-4 ${darkMode ? 'bg-gray-800/40' : 'bg-gray-50/50'}`}>
            {needsDisposition.map((patient, index) => (
              <div 
                key={patient.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${0.1 * (index + 3)}s` }}
              >
                <PatientCard patient={patient} darkMode={darkMode} />
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      {/* Follow-up Section */}
      <SectionCard 
        isEmpty={followUp.length === 0} 
        emptyMessage="No follow-ups due"
        animationDelay="0.3s"
      >
        <SectionHeader 
          title="📞 FOLLOW-UP DUE" 
          count={followUp.length} 
          bgColor={darkMode 
            ? "bg-gradient-to-r from-amber-900/30 to-amber-800/20" 
            : "bg-gradient-to-r from-amber-50 to-amber-25"
          }
          borderColor="border-l-amber-600"
          textColor={darkMode ? "text-amber-200" : "text-amber-800"}
          patients={followUp}
          animationDelay="0.3s"
        />
        {followUp.length > 0 && (
          <div className={`p-6 space-y-4 ${darkMode ? 'bg-gray-800/40' : 'bg-gray-50/50'}`}>
            {followUp.map((patient, index) => (
              <div 
                key={patient.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${0.1 * (index + 4)}s` }}
              >
                <PatientCard patient={patient} darkMode={darkMode} />
              </div>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
};

export default TrackingBoard;
