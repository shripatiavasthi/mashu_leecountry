import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      greeting: 'Hello from i18next',
      description: 'This text is translated.',
    },
  },
  es: {
    translation: {
      greeting: 'Hola desde i18next',
      description: 'Este texto está traducido.',
    },
  },
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources,
  });
}

export default i18n;
