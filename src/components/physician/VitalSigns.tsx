
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
  const getVitalSignStatus = (vital: string, value: number | string) => {
    switch (vital) {
      case 'heartRate':
        const hr = value as number;
        if (hr >= 120) return 'critical';
        if (hr > 100) return 'abnormal';
        return 'normal';
      case 'temperature':
        const temp = value as number;
        if (temp > 103) return 'critical';
        if (temp > 101) return 'abnormal';
        if (temp < 96) return 'abnormal';
        return 'normal';
      case 'oxygenSaturation':
        const o2 = value as number;
        if (o2 < 90) return 'critical';
        if (o2 <= 92) return 'abnormal';
        return 'normal';
      case 'bloodPressure':
        const bp = value as string;
        const [systolic, diastolic] = bp.split('/').map(Number);
        if (systolic > 200 || diastolic > 110) return 'critical';
        if (systolic > 180 || diastolic > 100) return 'abnormal';
        return 'normal';
    }
    return 'normal';
  };

  const getVitalSignColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'text-red-600 font-medium';
      case 'abnormal':
        return 'text-amber-600 font-medium';
      default:
        return darkMode ? 'text-slate-400' : 'text-slate-600';
    }
  };

  const getVitalIndicator = (status: string) => {
    if (status === 'critical') return '●';
    if (status === 'abnormal') return '●';
    return '';
  };

  return (
    <div className="col-span-12 lg:col-span-2 min-w-0">
      <div className="grid grid-cols-2 gap-1 text-xs">
        {vitalSigns.bloodPressure && (
          <div className={`flex items-center gap-1 ${getVitalSignColor(getVitalSignStatus('bloodPressure', vitalSigns.bloodPressure))}`}>
            <Droplets className="w-3 h-3" />
            <span>{vitalSigns.bloodPressure}</span>
            <span className="text-xs">{getVitalIndicator(getVitalSignStatus('bloodPressure', vitalSigns.bloodPressure))}</span>
          </div>
        )}
        {vitalSigns.heartRate && (
          <div className={`flex items-center gap-1 ${getVitalSignColor(getVitalSignStatus('heartRate', vitalSigns.heartRate))}`}>
            <Heart className="w-3 h-3" />
            <span>{vitalSigns.heartRate}</span>
            <span className="text-xs">{getVitalIndicator(getVitalSignStatus('heartRate', vitalSigns.heartRate))}</span>
          </div>
        )}
        {vitalSigns.temperature && (
          <div className={`flex items-center gap-1 ${getVitalSignColor(getVitalSignStatus('temperature', vitalSigns.temperature))}`}>
            <Thermometer className="w-3 h-3" />
            <span>{vitalSigns.temperature}°F</span>
            <span className="text-xs">{getVitalIndicator(getVitalSignStatus('temperature', vitalSigns.temperature))}</span>
          </div>
        )}
        {vitalSigns.oxygenSaturation && (
          <div className={`flex items-center gap-1 ${getVitalSignColor(getVitalSignStatus('oxygenSaturation', vitalSigns.oxygenSaturation))}`}>
            <Activity className="w-3 h-3" />
            <span>{vitalSigns.oxygenSaturation}%</span>
            <span className="text-xs">{getVitalIndicator(getVitalSignStatus('oxygenSaturation', vitalSigns.oxygenSaturation))}</span>
          </div>
        )}
      </div>
      {vitalSigns.painScale !== undefined && (
        <div className={`text-xs mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Pain: {vitalSigns.painScale}/10
        </div>
      )}
    </div>
  );
};

export default VitalSigns;
