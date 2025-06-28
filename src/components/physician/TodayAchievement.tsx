
import React from 'react';
import { Card } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

interface TodayAchievementProps {
  consultationsToday: number;
  darkMode: boolean;
}

const TodayAchievement: React.FC<TodayAchievementProps> = ({
  consultationsToday,
  darkMode
}) => {
  return (
    <Card className={`p-10 border-0 ${
      darkMode 
        ? 'bg-gradient-to-r from-emerald-900/20 via-teal-900/20 to-cyan-900/20' 
        : 'bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50'
    } animate-fade-in`} style={{ animationDelay: '0.5s' }}>
      <div className="text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full shadow-2xl">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        <div>
          <h3 className={`text-3xl font-bold mb-3 ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
            🎉 Emergency Cases Handled Today
          </h3>
          <div className={`text-6xl font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'} mb-4`}>
            {consultationsToday}
          </div>
          <p className={`text-xl font-semibold ${darkMode ? 'text-emerald-300' : 'text-emerald-700'} mb-2`}>
            Exceptional emergency care! 🌟
          </p>
          <p className={`text-lg ${darkMode ? 'text-slate-300' : 'text-slate-600'} max-w-md mx-auto`}>
            Your expertise and quick thinking are saving lives and bringing comfort to families
          </p>
        </div>
      </div>
    </Card>
  );
};

export default TodayAchievement;
