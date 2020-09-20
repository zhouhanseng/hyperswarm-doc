import Layout from "../components/Layout";
import { withTranslation } from "../i18n";
import { createOwnerDB } from "../database/Pet.db";

const Page = () => {
  createOwnerDB();
  return <Layout title="indexed-db"></Layout>;
};

Page.getInitialProps = () => ({
  namespacesRequired: ["common"],
});

export default withTranslation()(Page);
