
import React from 'react';
import { Card } from '@/components/ui/card';
import { Sun, Cloud, CloudRain } from 'lucide-react';

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
    <Card className="bg-gradient-to-r from-brand-light to-white border-brand-secondary/20 p-8 mb-6">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-teal mb-4">
          🌟 {getGreeting()}, {capitalizedFirstName}!
        </h1>
        
        {/* Weather Widget */}
        <div className="inline-flex items-center gap-2 bg-white/60 rounded-full px-4 py-2 text-sm text-brand-teal">
          {getWeatherIcon(mockWeather.condition)}
          <span>{mockWeather.temp}°F In {mockWeather.location}</span>
        </div>
      </div>
    </Card>
  );
};

export default PersonalWelcomeHero;
