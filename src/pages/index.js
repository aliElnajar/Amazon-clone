import Banner from "@/components/Banner";
import ProductFeed from "@/components/ProductFeed";
import { getSession } from "next-auth/react";
import Head from "next/head";
export default function Home({ products, session }) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>amashop</title>
      </Head>
      <div className="max-w-screen-xl mx-auto ">
        <Banner />
        <ProductFeed products={products} />
      </div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  const resp = await fetch("https://fakestoreapi.com/products");
  const products = await resp.json();
  return {
    props: {
      products,
      session,
    },
  };
};
