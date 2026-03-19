import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.worldlens.app',
  appName: 'WorldLens',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  },
  android: {
    backgroundColor: '#030712',
    allowMixedContent: true,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#030712',
      showSpinner: false,
      androidScaleType: 'CENTER_CROP',
    },
  },
};

export default config;
