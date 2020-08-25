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

IndexPage.getInitialProps = () => {
  return {
    namespacesRequired: ["common"],
  };
};

export default IndexPage;
