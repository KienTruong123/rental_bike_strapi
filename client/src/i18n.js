import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const lngs = [
  { key: "en", nativeName: "English" },
  { key: "vi", nativeName: "Tiếng Việt" },
];

const resources = {
  en: {
    translation: {
      "Welcome to React": "Welcome to React and react-i18next",
    },
  },
  vi: {
    translation: {
      "Welcome to React": "Bienvenue à React et react-i18next",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
