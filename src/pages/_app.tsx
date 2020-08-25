import App from "next/app";
import type { AppProps, AppContext } from "next/app";
import { appWithTranslation } from "../i18n";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

MyApp.getInitialProps = async (appContext: AppContext) => ({
  ...(await App.getInitialProps(appContext)),
});

export default appWithTranslation(MyApp);
