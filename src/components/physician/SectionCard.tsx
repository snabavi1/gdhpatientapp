
import React from 'react';
import { Card } from '@/components/ui/card';

interface SectionCardProps {
  children: React.ReactNode;
  isEmpty: boolean;
  emptyMessage: string;
  animationDelay?: string;
  darkMode: boolean;
}

const SectionCard: React.FC<SectionCardProps> = ({ 
  children, 
  isEmpty, 
  emptyMessage, 
  animationDelay = '0s',
  darkMode 
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

export default SectionCard;
