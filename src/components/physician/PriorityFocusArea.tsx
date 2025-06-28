
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Hourglass, ClipboardCheck, CheckCircle } from 'lucide-react';

interface PriorityFocusAreaProps {
  untriagedPatients: number;
  resultsReady: number;
  darkMode: boolean;
  onCardClick: (cardType: string) => void;
}

const PriorityFocusArea: React.FC<PriorityFocusAreaProps> = ({
  untriagedPatients,
  resultsReady,
  darkMode,
  onCardClick
}) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          🚨 Priority Focus Areas
        </h3>
        <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          Ordered by clinical urgency and time sensitivity
        </div>
      </div>
      
      {/* Priority Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Untriaged Patients - Highest Priority */}
        <Card 
          className={`lg:col-span-3 p-8 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] border-l-8 border-l-red-600 ${
            darkMode 
              ? 'bg-gradient-to-br from-red-900/20 to-red-800/10 hover:from-red-900/30 hover:to-red-800/15 border-slate-700' 
              : 'bg-gradient-to-br from-red-50 to-red-25 hover:from-red-100 hover:to-red-50 border-red-100 shadow-red-100/50'
          } animate-fade-in`}
          onClick={() => onCardClick('untriaged')}
        >
          <div className="flex items-start justify-between h-full">
            <div className="flex-1 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Hourglass className="w-8 h-8 text-white" />
                </div>
                <div>
                  <Badge className="bg-red-700 text-white border-0 text-sm px-3 py-1">
                    Priority 1
                  </Badge>
                  <h4 className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    Untriaged - Waiting Room
                  </h4>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-baseline space-x-3">
                  <span className={`text-6xl font-bold ${darkMode ? 'text-red-300' : 'text-red-700'}`}>
                    {untriagedPatients}
                  </span>
                  <span className={`text-lg ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    patients
                  </span>
                </div>
                
                <p className={`text-lg ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  Patients requiring immediate triage evaluation
                </p>
                
                <div className={`flex items-center space-x-2 text-red-600 font-medium`}>
                  <Clock className="w-5 h-5" />
                  <span>Target: &lt;7 minutes</span>
                </div>
              </div>
            </div>
            
            <div className="text-right space-y-4">
              <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Highest Priority
              </div>
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
                <Hourglass className="w-12 h-12 text-red-600" />
              </div>
            </div>
          </div>
        </Card>

        {/* Results Ready - Second Priority */}
        <Card 
          className={`lg:col-span-2 p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-l-6 border-l-emerald-500 ${
            darkMode 
              ? 'bg-gradient-to-br from-emerald-900/10 to-emerald-800/5 hover:from-emerald-900/20 hover:to-emerald-800/10 border-slate-700' 
              : 'bg-gradient-to-br from-emerald-50 to-emerald-25 hover:from-emerald-100 hover:to-emerald-50 border-emerald-100 shadow-emerald-100/50'
          } animate-fade-in`}
          onClick={() => onCardClick('results')}
          style={{ animationDelay: '0.1s' }}
        >
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center shadow-md">
                <ClipboardCheck className="w-6 h-6 text-white" />
              </div>
              <Badge className="bg-emerald-600 text-white border-0 px-3 py-1">
                Priority 2
              </Badge>
            </div>
            
            <div>
              <h4 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Results Ready
              </h4>
              <div className="flex items-baseline space-x-2 mb-3">
                <span className={`text-4xl font-bold ${darkMode ? 'text-emerald-300' : 'text-emerald-600'}`}>
                  {resultsReady}
                </span>
                <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  patients
                </span>
              </div>
              <p className={`text-sm mb-4 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Test results available for interpretation
              </p>
              <div className={`flex items-center text-emerald-600 text-sm font-medium`}>
                <CheckCircle className="w-4 h-4 mr-2" />
                Awaiting disposition decisions
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PriorityFocusArea;
