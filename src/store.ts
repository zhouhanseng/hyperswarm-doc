import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import rechyons from "rechyons";

let initState = {
  user: {
    name: "zhc",
  },
};

export const store = createStore(
  combineReducers(rechyons.reducer(initState)),
  applyMiddleware(logger)
);

export const hyperstore = rechyons(initState, store.dispatch);
