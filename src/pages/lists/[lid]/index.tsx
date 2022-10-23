import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import Loading from "@/components/loading";
import { trpc } from "@/utils/trpc";
import { CreateItem } from "./items/create";
import Link from "next/link";

const ListDetailsPage: NextPage = () => {
  const {
    query: { lid: listId },
  } = useRouter();

  const { data: listDetails, isLoading } = trpc.useQuery([
    "lists.get",
    { id: listId as string },
  ]);

  return (
    <>
      <Head>
        <title>List: {listDetails?.name}</title>
        <meta name="description" content="Listing of shopping lists" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h1>{listDetails?.name}</h1>
          <div className="divide-y">
            {listDetails?.items.map(({ id, name, price }) => (
              <div key={id} className="flex justify-between bg-white p-4">
                <Link href={`/lists/${listId}/items/${id}`}>
                  <a>{name}</a>
                </Link>
                <span className="ml-4 flex flex-row">{price}</span>
              </div>
            ))}
          </div>
          <CreateItem listId={parseInt(listId as string, 10)} />
        </>
      )}
    </>
  );
};

export default ListDetailsPage;
