import React from 'react';
import i18n, {init} from 'i18next';
import {initReactI18next} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import translationEN from './en/translation.json';
import translationES from './es/translation.json';
import translationHT from './ht/translation.json';

const languageDetector = {
  type: 'languageDetector',
  init: () => {},
  async: true,
  detect: async callback => {
    try {
      const lang = await AsyncStorage.getItem('selected_language');
      callback(lang);
    } catch (error) {
      console.log(error);
    }
  },
  cacheUserLanguage: () => {},
};

const resources = {
  en: {
    translation: translationEN,
  },
  es: {
    translation: translationES,
  },
  ht: {
    translation: translationHT,
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    compatibilityJSON: 'v3',
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
