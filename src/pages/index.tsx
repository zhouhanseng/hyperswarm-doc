import Link from "next/link";
import Layout from "../components/Layout";
import { I18nPage, useTranslation } from "../i18n";

const IndexPage: I18nPage = () => {
  const { t } = useTranslation();
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Hello Next.js 👋</h1>
      <p>
        <Link href="/about">
          <a>About{t("common.abc")}</a>
        </Link>
      </p>
    </Layout>
  );
};

/**
 * Todo: You have not declared a namespacesRequired array on your page-level component:
 * Todo: IndexPage. This will cause all namespaces to be sent down to the client,
 * Todo: possibly negatively impacting the performance of your app.
 * Todo: For more info, see: https://github.com/isaachinman/next-i18next#4-declaring-namespace-dependencies
 * */

IndexPage.getInitialProps = () => {
  return {
    namespacesRequired: ["common"],
  };
};

export default IndexPage;
