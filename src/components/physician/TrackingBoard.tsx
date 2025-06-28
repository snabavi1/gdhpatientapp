
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Video, Phone, MessageSquare, Clock, AlertTriangle, User } from 'lucide-react';
import PatientCard from './PatientCard';
import { mockPatients } from '@/services/mockData';

interface TrackingBoardProps {
  darkMode: boolean;
}

const TrackingBoard: React.FC<TrackingBoardProps> = ({ darkMode }) => {
  const [patients, setPatients] = useState(mockPatients);
  const [selectedFilter, setSelectedFilter] = useState('all');

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
        
        // Prioritize by wait time without using alarming colors
        if (aWaitMins >= 6 && bWaitMins < 6) return -1;
        if (bWaitMins >= 6 && aWaitMins < 6) return 1;
        
        if (a.acuity !== b.acuity) return a.acuity - b.acuity;
        return new Date(b.arrivalTimestamp).getTime() - new Date(a.arrivalTimestamp).getTime();
      }
      
      if (a.acuity !== b.acuity) return a.acuity - b.acuity;
      return new Date(a.arrivalTimestamp).getTime() - new Date(b.arrivalTimestamp).getTime();
    });
  };

  const filteredPatients = selectedFilter === 'all' 
    ? patients 
    : patients.filter(p => p.section === selectedFilter);

  const triagePatients = sortPatients(patients.filter(p => p.section === 'triage' && !p.physicianSeen));
  const pendingResults = sortPatients(patients.filter(p => p.section === 'pending' && p.physicianSeen));
  const needsDisposition = sortPatients(patients.filter(p => p.section === 'disposition' && p.physicianSeen));
  const followUp = sortPatients(patients.filter(p => p.section === 'followup'));

  const getSectionTitle = (section: string) => {
    switch (section) {
      case 'triage': return '⏳ AWAITING TRIAGE';
      case 'pending': return '🔄 PENDING RESULTS';
      case 'disposition': return '📋 NEEDS DISPOSITION';
      case 'followup': return '📞 FOLLOW-UP DUE';
      default: return section.toUpperCase();
    }
  };

  const getSectionColor = (section: string) => {
    switch (section) {
      case 'triage': return 'bg-blue-600';
      case 'pending': return 'bg-cyan-600';
      case 'disposition': return 'bg-green-600';
      case 'followup': return 'bg-amber-600';
      default: return 'bg-gray-600';
    }
  };

  const getSectionPatients = (section: string) => {
    switch (section) {
      case 'triage': return triagePatients;
      case 'pending': return pendingResults;
      case 'disposition': return needsDisposition;
      case 'followup': return followUp;
      default: return [];
    }
  };

  const SectionHeader = ({ 
    title, 
    count, 
    color, 
    patients, 
    isTriageSection = false 
  }: { 
    title: string; 
    count: number; 
    color: string; 
    patients: typeof mockPatients; 
    isTriageSection?: boolean; 
  }) => {
    const longWaitPatients = isTriageSection ? 
      patients.filter(p => (Date.now() - new Date(p.arrivalTimestamp).getTime()) / 60000 >= 6).length : 0;
    
    return (
      <div className={`${color} text-white p-4 rounded-t-lg`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-semibold">{title}</h3>
            <Badge variant="secondary" className="bg-white/20 text-white">
              {count}
            </Badge>
            {longWaitPatients > 0 && (
              <Badge className="bg-orange-500 text-white">
                ⏱️ {longWaitPatients} longer wait
              </Badge>
            )}
          </div>
          {isTriageSection && (
            <div className="text-sm opacity-90">
              ⏱️ Target: &lt;7 min
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Section Cards */}
      <div className="space-y-6">
        {/* Triage Section */}
        <Card className={`overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <SectionHeader 
            title="⏳ AWAITING TRIAGE" 
            count={triagePatients.length} 
            color="bg-blue-600" 
            patients={triagePatients} 
            isTriageSection={true}
          />
          <div className="p-4 space-y-3">
            {triagePatients.map((patient) => (
              <PatientCard key={patient.id} patient={patient} darkMode={darkMode} />
            ))}
            {triagePatients.length === 0 && (
              <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                ✅ No patients awaiting triage
              </div>
            )}
          </div>
        </Card>

        {/* Pending Results Section */}
        <Card className={`overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <SectionHeader 
            title="🔄 PENDING RESULTS" 
            count={pendingResults.length} 
            color="bg-cyan-600" 
            patients={pendingResults}
          />
          <div className="p-4 space-y-3">
            {pendingResults.map((patient) => (
              <PatientCard key={patient.id} patient={patient} darkMode={darkMode} />
            ))}
            {pendingResults.length === 0 && (
              <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                ✅ No pending results
              </div>
            )}
          </div>
        </Card>

        {/* Needs Disposition Section */}
        <Card className={`overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <SectionHeader 
            title="📋 NEEDS DISPOSITION" 
            count={needsDisposition.length} 
            color="bg-green-600" 
            patients={needsDisposition}
          />
          <div className="p-4 space-y-3">
            {needsDisposition.map((patient) => (
              <PatientCard key={patient.id} patient={patient} darkMode={darkMode} />
            ))}
            {needsDisposition.length === 0 && (
              <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                ✅ No patients need disposition
              </div>
            )}
          </div>
        </Card>

        {/* Follow-up Section */}
        <Card className={`overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <SectionHeader 
            title="📞 FOLLOW-UP DUE" 
            count={followUp.length} 
            color="bg-amber-600" 
            patients={followUp}
          />
          <div className="p-4 space-y-3">
            {followUp.map((patient) => (
              <PatientCard key={patient.id} patient={patient} darkMode={darkMode} />
            ))}
            {followUp.length === 0 && (
              <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                ✅ No follow-ups due
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TrackingBoard;
