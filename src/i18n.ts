import { NextComponentType, NextPageContext } from "next";
import NextI18Next from "next-i18next";
import { useTranslation as originalUseTranslation } from "react-i18next";
import { applyServerHMR } from "i18next-hmr/server";
import path from "path";

const nextI18next = new NextI18Next({
  defaultLanguage: "en",
  otherLanguages: ["zh"],
  // the default nsSeparator ':' is unsupported by ally-i18n
  nsSeparator: ".",
  localePath: path.resolve("./public/locales"),
});

// Without i18next-hmr, Page won't be updated,
// even if you refresh the page manually, after modifying locales.
if (process.env.NODE_ENV !== "production") {
  applyServerHMR(nextI18next.i18n);
}

export const appWithTranslation = nextI18next.appWithTranslation;

export const useTranslation = originalUseTranslation;
