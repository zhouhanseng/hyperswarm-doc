import App from "next/app";
import type { AppProps, AppContext } from "next/app";
import { Provider } from "react-redux";
import { appWithTranslation } from "../i18n";
import { store } from "../store";
import { ApolloProvider } from "@apollo/client";
import { client } from "../apollo";
import "../main.css";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </ApolloProvider>
);

MyApp.getInitialProps = async (appContext: AppContext) => ({
  ...(await App.getInitialProps(appContext)),
});

// export default wrapper.withRedux(appWithTranslation(MyApp));

export default appWithTranslation(MyApp);
