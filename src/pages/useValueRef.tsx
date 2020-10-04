import Layout from "../components/Layout";
import { PageAnimate } from "../components/PageAnimate";

import { useDefaultAccountRef } from "../utils/useAccount";

const Page = () => {
  const defaultAccount = useDefaultAccountRef();
  return (
    <Layout title="redux">
      <PageAnimate>
        <h1>ValueRef is a super global variable</h1>
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
