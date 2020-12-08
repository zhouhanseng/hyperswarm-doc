import Layout from "../components/Layout";
import { PageAnimate } from "../components/PageAnimate";

import { useDefaultAccountRef } from "../utils/useAccount";

const Page = () => {
  const defaultAccount = useDefaultAccountRef();
  return (
    <Layout title="redux">
      <PageAnimate>
        <p>ValueRef is kind of super global variable</p>
        <section className="flex items-center">
          {defaultAccount ? defaultAccount.account_name : null}
        </section>
      </PageAnimate>
    </Layout>
  );
};

Page.getInitialProps = () => {
  return {
    namespacesRequired: ["common"],
  };
};

export default Page;
