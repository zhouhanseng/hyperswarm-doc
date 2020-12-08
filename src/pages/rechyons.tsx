import { connect } from "react-redux";
import { Typography, TextField } from "@material-ui/core";
import { hyperstore } from "../store";
import Layout from "../components/Layout";
import { PageAnimate } from "../components/PageAnimate";

interface Props {
  username: string;
}

const Page = ({ username }: Props) => {
  return (
    <Layout title="redux">
      <PageAnimate>
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
          <Typography
            variant="body1"
            className="font-bold text-green-500 ml-10"
          >
            Username: {username}
          </Typography>
        </section>
      </PageAnimate>
    </Layout>
  );
};

const MapStateToProps = (store: { [key: string]: any }) => {
  return {
    username: store[hyperstore.user.name],
  };
};

export default connect(MapStateToProps)(Page);
