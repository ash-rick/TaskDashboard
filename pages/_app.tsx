import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import Head from "next/head";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>New Task Dashboard</title>
        <meta name="description" content="Manage your tasks effectively." />
      </Head>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  ); 
}
