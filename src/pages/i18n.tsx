import React from "react";
import Layout from "../components/Layout";
import { withTranslation, TranslateProps } from "../i18n";
import { Button } from "@material-ui/core";

const Page = ({ t, i18n }: TranslateProps) => {
  return (
    <Layout title="i18n">
      <p className="mb-4">
        {t("common.language") + ": " + t("common.epitaph")}
      </p>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          i18n.changeLanguage(i18n.language === "zh" ? "en" : "zh");
        }}
        className="w-64"
      >
        {t("common.switch_language")}
      </Button>
    </Layout>
  );
};

Page.getInitialProps = () => ({
  namespacesRequired: ["common"],
});

export default withTranslation()(Page);
