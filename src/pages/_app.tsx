import App from "next/app";
import type { AppProps, AppContext } from "next/app";
import { Provider } from "react-redux";
import { appWithTranslation } from "../i18n";
import { store } from "../store";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
);

MyApp.getInitialProps = async (appContext: AppContext) => ({
  ...(await App.getInitialProps(appContext)),
});

// export default wrapper.withRedux(appWithTranslation(MyApp));

export default appWithTranslation(MyApp);
