
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.385b37a3dbde407f8edc744c95d09726',
  appName: 'Green Dot Health',
  webDir: 'dist',
  server: {
    url: 'https://385b37a3-dbde-407f-8edc-744c95d09726.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    },
    Camera: {
      permissions: ["camera", "photos"]
    },
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#18ae80",
      sound: "beep.wav"
    }
  }
};

export default config;
