import React from "react";
import App, { Container } from "next/app";
import { Provider } from "mobx-react";

import initializeStore from "../mobx/stores";

class CustomApp extends App {
  mobxStore: any;
  static async getInitialProps(appContext) {
    const mobxStore = initializeStore();
    appContext.ctx.mobxStore = mobxStore;
    const appProps = await App.getInitialProps(appContext);
    return {
      ...appProps,
      initialMobxState: mobxStore,
    };
  }

  constructor(props) {
    super(props);
    const isServer = typeof window === "undefined";
    this.mobxStore = isServer
      ? props.initialMobxState
      : initializeStore(props.initialMobxState);
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider {...this.mobxStore}>
        <Container>
          <Component {...pageProps} />
        </Container>
      </Provider>
    );
  }
}

export default CustomApp;

// // import App from "next/app";
// import type { AppProps /*, AppContext */, AppContext } from "next/app";
// import { RootStateProvider, useRootStore } from "../context/RootStateContext";
// import "antd/dist/antd.css";
// import { fetchNotes } from "../api";
// import { useEffect, useState } from "react";
// import App from "next/app";
// import { notesStore, NotesStore } from "../mobx/NotesStore";
// import HomePage from ".";
// import Layout from "../components/Layout";

// function MyApp({
//   Component,
//   processedResponse,
//   notesStore,
//   pageProps,
// }: AppProps) {
//   // add to AppProps the right interface of processedResponse
//   return (
//     <div>
//       <Layout>
//         <Component
//           {...pageProps}
//           processedResponse={processedResponse}
//           notesStore={notesStore}
//         ></Component>
//       </Layout>

//       <style global jsx>{`
//         html,
//         body,
//         body > div:first-child,
//         div#__next,
//         div#__next > div,
//         div#__next > div > div {
//           height: 100%;
//         }
//       `}</style>
//     </div>
//   );
// }

// MyApp.getInitialProps = async ({ Component, ctx }) => {
//   const processedResponse = await fetchNotes();

//   notesStore.setNotes(processedResponse);
//   let pageProps = {};
//   if (Component.getInitialProps) {
//     pageProps = await Component.getInitialProps(ctx);
//   }
//   console.log("noteS===" , notesStore);
//   return { notesStore, pageProps };
// };

// export default MyApp;
