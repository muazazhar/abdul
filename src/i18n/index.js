import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeModules, Platform } from 'react-native';
// import ar from './ar.json';
import he from './he.json';

const locale =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale
    : NativeModules.I18nManager.localeIdentifier;
console.log('locale.substring', locale.substring(0, 2));

const languageDetector = {
  init: Function.prototype,
  type: 'languageDetector',
  async: true, // flags below detection to be async
  detect: async callback => {
    const selectedLanguage = await AsyncStorage.getItem('language');
    console.log('selectedLanguage', selectedLanguage);
    /** ... */
    selectedLanguage == null
      ? callback(locale.substring(0, 2))
      : callback(selectedLanguage);
  },
  cacheUserLanguage: () => { },
};

i18n
  .use(languageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    compatibilityJSON: 'v3',
    resources: { he },
    fallbackLng: 'en',
    // lng: 'en',
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
