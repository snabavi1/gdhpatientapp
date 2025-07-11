
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
    <Card className="calm-gradient border-0 p-8 mb-6 card-hover shadow-lg animate-fade-in">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-in-up">
          🌟 {getGreeting()}, {capitalizedFirstName}!
        </h1>
        
        {/* Weather Widget */}
        <div className="inline-flex items-center gap-3 bg-card/80 backdrop-blur-sm rounded-full px-6 py-3 text-sm text-foreground shadow-md hover-lift animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
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
