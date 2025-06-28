
import React from 'react';
import { Button } from '@/components/ui/button';
import { Video, Phone, MessageSquare } from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  phone: string;
  entryMethod: string;
  messageType?: 'request' | 'question' | 'concern';
  arrivalTime: string;
  complaint: string;
  status: string;
}

interface PatientActionsProps {
  patient: Patient;
  isTriageSection: boolean;
  isConciergeSection: boolean;
}

const PatientActions: React.FC<PatientActionsProps> = ({ 
  patient, 
  isTriageSection, 
  isConciergeSection 
}) => {
  const getWaitTime = () => {
    const waitMins = (Date.now() - new Date(patient.arrivalTime).getTime()) / 60000;
    const waitHours = waitMins / 60;
    
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
  );
};

export default PatientActions;
