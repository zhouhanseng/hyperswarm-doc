import Link from "next/link";
import Layout from "../components/Layout";
import { connect } from "react-redux";
import { useTranslation } from "../i18n";
import { hyperstore } from "../store";

interface Props {
  username: string;
  namespacesRequired: string[];
}

const IndexPage = ({ username }: Props) => {
  const { t } = useTranslation();

  setTimeout(() => {
    hyperstore.user.update({ name: "abddddddd" });
  }, 2000);

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Hello Next.js {username} 👋</h1>
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

const MapStateToProps = (store: { [key: string]: any }) => {
  return {
    username: store[hyperstore.user.name],
  };
};

export default connect(MapStateToProps)(IndexPage);
