import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'my.resin.timer',
  appName: 'Resin Timer',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#488AFF",
      sound: "beep.wav",
    },
  },
};

export default config;
