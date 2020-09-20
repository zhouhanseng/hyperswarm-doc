import React from "react";
import Layout from "../components/Layout";
import { Trans } from "react-i18next";
import { withTranslation, TranslateProps } from "../i18n";
import { Button, Typography } from "@material-ui/core";

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
      <Typography color="textPrimary" variant="body1" className="mt-3">
        <Trans
          i18nKey="common.text_contains_link"
          components={{
            again: (
              <Button
                variant="outlined"
                onClick={() => window.alert(t("common.alert_text"))}
                className="mx-2"
              />
            ),
          }}
        />
      </Typography>
    </Layout>
  );
};

Page.getInitialProps = () => ({
  namespacesRequired: ["common"],
});

export default withTranslation()(Page);
