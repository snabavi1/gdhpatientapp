
import React from 'react';
import { Activity, Thermometer, Heart, Droplets } from 'lucide-react';

interface VitalSigns {
  bloodPressure?: string;
  heartRate?: number;
  temperature?: number;
  oxygenSaturation?: number;
  painScale?: number;
  respiratoryRate?: number;
}

interface VitalSignsProps {
  vitalSigns: VitalSigns;
  darkMode: boolean;
}

const VitalSigns: React.FC<VitalSignsProps> = ({ vitalSigns, darkMode }) => {
  const getVitalSignColor = (vital: string, value: number | string) => {
    switch (vital) {
      case 'heartRate':
        const hr = value as number;
        if (hr > 100 || hr < 60) return 'text-red-600 font-semibold';
        break;
      case 'temperature':
        const temp = value as number;
        if (temp > 100.4 || temp < 96) return 'text-red-600 font-semibold';
        break;
      case 'oxygenSaturation':
        const o2 = value as number;
        if (o2 < 95) return 'text-red-600 font-semibold';
        break;
      case 'painScale':
        const pain = value as number;
        if (pain >= 7) return 'text-red-600 font-semibold';
        if (pain >= 4) return 'text-orange-600 font-medium';
        break;
      case 'bloodPressure':
        const bp = value as string;
        const [systolic] = bp.split('/').map(Number);
        if (systolic > 140 || systolic < 90) return 'text-red-600 font-semibold';
        break;
    }
    return darkMode ? 'text-slate-300' : 'text-slate-700';
  };

  return (
    <div className="col-span-12 lg:col-span-2 min-w-0">
      <div className="grid grid-cols-2 gap-1 text-xs">
        {vitalSigns.bloodPressure && (
          <div className={`flex items-center gap-1 ${getVitalSignColor('bloodPressure', vitalSigns.bloodPressure)}`}>
            <Droplets className="w-3 h-3" />
            <span>{vitalSigns.bloodPressure}</span>
          </div>
        )}
        {vitalSigns.heartRate && (
          <div className={`flex items-center gap-1 ${getVitalSignColor('heartRate', vitalSigns.heartRate)}`}>
            <Heart className="w-3 h-3" />
            <span>{vitalSigns.heartRate}</span>
          </div>
        )}
        {vitalSigns.temperature && (
          <div className={`flex items-center gap-1 ${getVitalSignColor('temperature', vitalSigns.temperature)}`}>
            <Thermometer className="w-3 h-3" />
            <span>{vitalSigns.temperature}°F</span>
          </div>
        )}
        {vitalSigns.oxygenSaturation && (
          <div className={`flex items-center gap-1 ${getVitalSignColor('oxygenSaturation', vitalSigns.oxygenSaturation)}`}>
            <Activity className="w-3 h-3" />
            <span>{vitalSigns.oxygenSaturation}%</span>
          </div>
        )}
      </div>
      {vitalSigns.painScale !== undefined && (
        <div className={`text-xs mt-1 ${getVitalSignColor('painScale', vitalSigns.painScale)}`}>
          Pain: {vitalSigns.painScale}/10
        </div>
      )}
    </div>
  );
};

export default VitalSigns;
