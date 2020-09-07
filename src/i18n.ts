import NextI18Next, { TFunction, I18n } from "next-i18next";
import { applyServerHMR } from "i18next-hmr/server";
import path from "path";

const nextI18next = new NextI18Next({
  defaultLanguage: "en",
  otherLanguages: ["zh"],
  localeSubpaths: {},
  // Doc: the default nsSeparator ':' is unsupported by ally-i18n
  nsSeparator: ".",
  localePath: path.resolve("./public/locales"),
});

export const appWithTranslation = nextI18next.appWithTranslation;

export const withTranslation = nextI18next.withTranslation;

export const i18n = nextI18next.i18n;

// export const translate = originalTranslate

// Doc: Without i18next-hmr, Page won't be updated,
//  even if you refresh the page manually, after modifying locales.
if (process.env.NODE_ENV !== "production") {
  applyServerHMR(i18n);
}

export type TranslateProps = {
  t: TFunction;
  i18n: I18n;
};
