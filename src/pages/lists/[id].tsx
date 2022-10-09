import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import Layout from "../components/layout";
import Loading from "../components/loading";

const ListDetailsPage: NextPage = () => {
  const {
    query: { id: listId },
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

      <Layout>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <h1>{listDetails?.name}</h1>
            <div className="divide-y">
              {listDetails?.items.length === 0 && (
                <h3 className="text-orange-400">
                  There are no items in the list
                </h3>
              )}
              {listDetails?.items.map(({ id, name }) => (
                <span key={id}>{name}</span>
              ))}
            </div>
          </>
        )}
      </Layout>
    </>
  );
};

export default ListDetailsPage;
