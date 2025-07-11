
import React from 'react';
import { Card } from '@/components/ui/card';
import { Sun, Cloud, CloudRain } from 'lucide-react';
import GreenDotLogo from './GreenDotLogo';

interface PersonalWelcomeHeroProps {
  firstName?: string;
}

const PersonalWelcomeHero: React.FC<PersonalWelcomeHeroProps> = ({ 
  firstName = "There" 
}) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  // Mock weather data - in a real app this would come from a weather API
  const mockWeather = {
    temp: 72,
    condition: "sunny",
    location: "Atlanta, GA"
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny': return <Sun className="h-5 w-5 text-yellow-500" />;
      case 'cloudy': return <Cloud className="h-5 w-5 text-gray-500" />;
      case 'rainy': return <CloudRain className="h-5 w-5 text-blue-500" />;
      default: return <Sun className="h-5 w-5 text-yellow-500" />;
    }
  };

  // Capitalize the first name
  const capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();

  return (
    <Card className="brand-mixed-gradient border-0 p-8 mb-6 card-hover shadow-xl animate-fade-in relative overflow-hidden">
      {/* Floating Green Dot Decorations */}
      <div className="absolute top-4 right-4 opacity-20">
        <GreenDotLogo size="lg" floating />
      </div>
      <div className="absolute bottom-4 left-4 opacity-10">
        <GreenDotLogo size="md" />
      </div>
      
      <div className="text-center relative z-10">
        <div className="flex items-center justify-center mb-4">
          <GreenDotLogo size="md" className="mr-3" />
          <h1 className="text-3xl md:text-4xl font-bold text-foreground animate-fade-in-up">
            {getGreeting()}, {capitalizedFirstName}!
          </h1>
        </div>
        
        {/* Weather Widget */}
        <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 text-sm text-foreground shadow-lg hover-lift animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="animate-bounce-gentle">
            {getWeatherIcon(mockWeather.condition)}
          </div>
          <span className="font-medium">{mockWeather.temp}°F in {mockWeather.location}</span>
        </div>
      </div>
    </Card>
  );
};

export default PersonalWelcomeHero;
