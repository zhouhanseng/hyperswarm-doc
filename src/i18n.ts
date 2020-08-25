import { NextComponentType, NextPageContext } from "next";
import NextI18Next from "next-i18next";
import { useTranslation as originalUseTranslation } from "react-i18next";
import { applyServerHMR } from "i18next-hmr/server";
import path from "path";

const nextI18next = new NextI18Next({
  defaultLanguage: "en",
  otherLanguages: ["zh"],
  nsSeparator: ".",
  localePath: path.resolve("./public/locales"),
});

if (process.env.NODE_ENV !== "production") {
  applyServerHMR(nextI18next.i18n);
}

export const appWithTranslation = nextI18next.appWithTranslation;

export const useTranslation = originalUseTranslation;

export type I18nPage<P = {}> = NextComponentType<
  NextPageContext,
  { namespacesRequired: string[] },
  P & { namespacesRequired: string[] }
>;
