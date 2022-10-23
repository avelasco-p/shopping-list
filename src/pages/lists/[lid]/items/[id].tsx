import { trpc } from "@/utils/trpc";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import Loading from "@/components/loading";

const ItemDetails: NextPage = () => {
  const {
    query: { id: itemId },
  } = useRouter();

  const { data: item, isLoading } = trpc.useQuery([
    "items.get",
    { id: itemId as string },
  ]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>Item: {item?.name}</title>
        <meta name="description" content="Item details" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-1/2">
        <h2>Item: {item?.name}</h2>
        <h3>Price: ${(item?.price as number) / 100}</h3>
      </div>
    </>
  );
};

export default ItemDetails;
