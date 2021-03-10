import en from "./en";
import ja from "./ja";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import vn from "./vn";
import kr from "./kr";

export const resources = {
  en: {
    translation: en,
  },
  ja: {
    translation: ja,
  },
  vn: {
    translation: vn,
  },
  kr: {
    translation: kr,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
