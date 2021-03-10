import { ELanguage } from "./interface";
import i18n from "../locales/i18n";
import { initReactI18next } from "react-i18next";
import { resources } from "../locales/i18n";

export const delay = (timeout: number) =>
  new Promise((done) => setTimeout(done, timeout));

export function setI18n(language: number) {
  const selectLanguage = (language: number) => {
    if (language === ELanguage.English) {
      return "en";
    } else if (language === ELanguage.Japanese) {
      return "ja";
    } else if (language === ELanguage.Korean) {
      return "kr";
    } else if (language === ELanguage.Vietnamese) {
      return "vn";
    }
  };
  i18n.use(initReactI18next).init({
    resources,
    lng: selectLanguage(language),
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });
}
