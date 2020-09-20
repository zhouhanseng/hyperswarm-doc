import { useState, useMemo, Dispatch, SetStateAction } from "react";
import Layout from "../components/Layout";
import { connect } from "react-redux";
import { Typography, Slider, Button } from "@material-ui/core";
import { hyperstore } from "../store";

type MySliderProps = {
  setValue: Dispatch<SetStateAction<number>>;
};

const DEFAULT_VAL = 30;

const MySlider = ({ setValue }: MySliderProps) => {
  let result = 0;
  for (let i = 0; i < 10000; i++) {
    for (let j = 0; j < 10000; j++) {
      result += i + j;
    }
  }

  return (
    <Slider
      defaultValue={DEFAULT_VAL}
      onChange={(_e, val) => {
        let a = val as number;
        setValue(a + 100);
      }}
    />
  );
};

const MyBetterSlider = ({ setValue }: MySliderProps) => {
  let result = 0;
  useMemo(() => {
    for (let i = 0; i < 10000; i++) {
      for (let j = 0; j < 10000; j++) {
        result += i + j;
      }
    }
  }, []);

  return (
    <Slider
      className="bg-red-400"
      defaultValue={DEFAULT_VAL}
      onChange={(_e, val) => {
        let a = val as number;
        setValue(a + 100);
      }}
    />
  );
};

const IndexPage = () => {
  const [value, setValue] = useState(DEFAULT_VAL);
  const [opt, setOpt] = useState(false);

  return (
    <Layout title="useMemo">
      <Typography variant="h4" className="mb-4">
        When to useMemo?
      </Typography>
      <Typography variant="h5" className="mb-4">
        1. Computationally expensive calculations
      </Typography>
      <section className="w-64">
        <Typography>{value}</Typography>
        {opt ? (
          <MyBetterSlider setValue={setValue} />
        ) : (
          <MySlider setValue={setValue} />
        )}
        <Button variant="outlined" onClick={() => setOpt(!opt)}>
          {opt ? "not useMemo" : "useMemo"}
        </Button>
      </section>
    </Layout>
  );
};

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
