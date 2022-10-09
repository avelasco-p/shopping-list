import type { NextPage } from "next";
import Head from "next/head";
import Layout from "./components/layout";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <h1>This is the home</h1>
      </Layout>
    </>
  );
};

export default Home;
