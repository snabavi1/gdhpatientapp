
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, MessageSquare, Video } from 'lucide-react';

interface CommunicationLog {
  id: string;
  communication_type: string;
  provider_type: string;
  status: string;
  created_at: string;
  duration_seconds?: number;
}

interface RecentCommunicationsProps {
  communications: CommunicationLog[];
}

const RecentCommunications: React.FC<RecentCommunicationsProps> = ({
  communications
}) => {
  const getCommunicationIcon = (type: string) => {
    switch (type) {
      case 'voice_call': return Phone;
      case 'sms': return MessageSquare;
      case 'video_call': return Video;
      default: return MessageSquare;
    }
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '';
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ${seconds % 60}s`;
  };

  if (communications.length === 0) {
    return null;
  }

  return (
    <Card className="p-6 bg-white border-brand-secondary/20">
      <div className="flex items-center space-x-3 mb-4">
        <Phone className="h-5 w-5 text-brand-primary" />
        <h3 className="text-lg font-semibold text-brand-teal">Recent Communications</h3>
      </div>
      <div className="space-y-3">
        {communications.map((comm) => {
          const CommIcon = getCommunicationIcon(comm.communication_type);
          return (
            <div key={comm.id} className="flex items-center justify-between p-3 border border-brand-secondary/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <CommIcon className="h-4 w-4 text-brand-secondary" />
                <div>
                  <span className="text-sm font-medium capitalize text-brand-teal">
                    {comm.communication_type.replace('_', ' ')} - {comm.provider_type}
                  </span>
                  <div className="text-xs text-brand-teal/60">
                    {new Date(comm.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {comm.duration_seconds && (
                  <span className="text-xs text-brand-teal/60">
                    {formatDuration(comm.duration_seconds)}
                  </span>
                )}
                <Badge 
                  variant={comm.status === 'completed' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {comm.status}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default RecentCommunications;
