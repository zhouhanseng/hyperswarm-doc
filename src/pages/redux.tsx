import { connect } from "react-redux";
import { hyperstore } from "../store";
import Layout from "../components/Layout";
import { Typography, TextField } from "@material-ui/core";

interface Props {
  username: string;
  namespacesRequired: string[];
}

const Page = ({ username }: Props) => {
  return (
    <Layout title="redux-rechyons">
      <section className="flex items-center">
        <TextField
          onChange={(event) => {
            hyperstore.user.update({ name: event.target.value });
          }}
          value={username}
          required
          placeholder="username"
          label="username"
          error={false}
        />
        <Typography variant="body1" className="font-bold text-green-500 ml-10">
          Username: {username}
        </Typography>
      </section>
    </Layout>
  );
};

Page.getInitialProps = () => {
  return {
    namespacesRequired: ["redux"],
  };
};

const MapStateToProps = (store: { [key: string]: any }) => {
  return {
    username: store[hyperstore.user.name],
  };
};

export default connect(MapStateToProps)(Page);
