
import React from 'react';
import { Card } from '@/components/ui/card';
import { Users, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

interface WelcomeStatsProps {
  stats: {
    activePatients: number;
    pendingFollowups: number;
    consultationsToday: number;
    urgentAlerts: number;
  };
  darkMode: boolean;
}

const WelcomeStats: React.FC<WelcomeStatsProps> = ({ stats, darkMode }) => {
  const statCards = [
    {
      title: 'Active Patients',
      value: stats.activePatients,
      icon: Users,
      color: 'text-blue-600',
      bgColor: darkMode ? 'bg-blue-900/20' : 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      title: 'Pending Follow-ups',
      value: stats.pendingFollowups,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: darkMode ? 'bg-orange-900/20' : 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      title: 'Consultations Today',
      value: stats.consultationsToday,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: darkMode ? 'bg-green-900/20' : 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      title: 'Urgent Alerts',
      value: stats.urgentAlerts,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: darkMode ? 'bg-red-900/20' : 'bg-red-50',
      borderColor: 'border-red-200'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => (
        <Card key={index} className={`p-6 ${stat.bgColor} border ${stat.borderColor} ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.title}
              </p>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {stat.value}
              </p>
            </div>
            <stat.icon className={`w-8 h-8 ${stat.color}`} />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default WelcomeStats;
