
import React from 'react';
import PriorityFocusArea from './PriorityFocusArea';
import SecondaryActions from './SecondaryActions';
import TodayAchievement from './TodayAchievement';

interface MockStats {
  untriagedPatients: number;
  awaitingFullEvaluation: number;
  testsInProgress: number;
  resultsReady: number;
  conciergeMessages: number;
  consultationsToday: number;
}

interface WelcomeViewProps {
  physicianName: string;
  mockStats: MockStats;
  darkMode: boolean;
  onCardClick: (cardType: string) => void;
}

const WelcomeView: React.FC<WelcomeViewProps> = ({
  physicianName,
  mockStats,
  darkMode,
  onCardClick
}) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Morning';
    if (hour < 17) return 'Afternoon';
    return 'Evening';
  };

  return (
    <div className="px-8 py-10 space-y-12 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="text-center space-y-6">
        <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
          darkMode ? 'bg-emerald-900/20 text-emerald-300' : 'bg-emerald-50 text-emerald-700'
        }`}>
          <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
          Online & Ready
        </div>
        <h2 className={`text-4xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          Good {getGreeting()}, {physicianName}! 👋
        </h2>
        <p className={`text-xl max-w-2xl mx-auto leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          Ready to provide exceptional emergency care with precision and compassion.
        </p>
      </div>

      {/* Priority Focus Area */}
      <PriorityFocusArea
        untriagedPatients={mockStats.untriagedPatients}
        resultsReady={mockStats.resultsReady}
        darkMode={darkMode}
        onCardClick={onCardClick}
      />

      {/* Secondary Actions */}
      <SecondaryActions
        testsInProgress={mockStats.testsInProgress}
        conciergeMessages={mockStats.conciergeMessages}
        awaitingFullEvaluation={mockStats.awaitingFullEvaluation}
        darkMode={darkMode}
        onCardClick={onCardClick}
      />

      {/* Today's Achievement */}
      <TodayAchievement
        consultationsToday={mockStats.consultationsToday}
        darkMode={darkMode}
      />
    </div>
  );
};

export default WelcomeView;
