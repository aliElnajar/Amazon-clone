import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Provider, Store } from "react-redux";
import { store } from "@/components/store/store";
import Header from "@/components/Header";
export default function App({ Component, pageProps }) {
  return (
    <div>
      <SessionProvider session={pageProps.session}>
        <Provider store={store}>
          <Header />
          <Component {...pageProps} />
        </Provider>
      </SessionProvider>
    </div>
  );
}
