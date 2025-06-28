
import React from 'react';
import { Card } from '@/components/ui/card';
import { Inbox, Phone, Clock } from 'lucide-react';

interface SecondaryActionsProps {
  testsInProgress: number;
  conciergeMessages: number;
  awaitingFullEvaluation: number;
  darkMode: boolean;
  onCardClick: (cardType: string) => void;
}

const SecondaryActions: React.FC<SecondaryActionsProps> = ({
  testsInProgress,
  conciergeMessages,
  awaitingFullEvaluation,
  darkMode,
  onCardClick
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Tests in Progress */}
      <Card className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-lg border-l-4 border-l-blue-400 ${
        darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-blue-25 shadow-blue-100/30'
      } animate-fade-in`} onClick={() => onCardClick('tests')} style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shadow-md">
              <Inbox className="w-6 h-6 text-blue-600" />
            </div>
            <div className="space-y-1">
              <h4 className={`text-lg font-bold ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                Tests Ordered
              </h4>
              <div className="flex items-baseline space-x-2">
                <span className={`text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  {testsInProgress}
                </span>
                <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  in progress
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Concierge Messages */}
      <Card 
        className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-lg border-l-4 border-l-purple-400 ${
          darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-purple-25 shadow-purple-100/30'
        } animate-fade-in`}
        onClick={() => onCardClick('concierge')}
        style={{ animationDelay: '0.3s' }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center shadow-md">
              <Phone className="w-6 h-6 text-purple-600" />
            </div>
            <div className="space-y-1">
              <h4 className={`text-lg font-bold ${darkMode ? 'text-purple-300' : 'text-purple-700'}`}>
                Concierge Inbox
              </h4>
              <div className="flex items-baseline space-x-2">
                <span className={`text-2xl font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                  {conciergeMessages}
                </span>
                <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  messages
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Triaged Awaiting */}
      <Card className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-lg border-l-4 border-l-orange-400 ${
        darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-orange-25 shadow-orange-100/30'
      } animate-fade-in`} onClick={() => onCardClick('triaged')} style={{ animationDelay: '0.4s' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center shadow-md">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div className="space-y-1">
              <h4 className={`text-lg font-bold ${darkMode ? 'text-orange-300' : 'text-orange-700'}`}>
                Awaiting Full Eval
              </h4>
              <div className="flex items-baseline space-x-2">
                <span className={`text-2xl font-bold ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                  {awaitingFullEvaluation}
                </span>
                <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  triaged
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SecondaryActions;
