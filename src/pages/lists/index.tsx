import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import {
  ArchiveBoxXMarkIcon,
  ArrowUpOnSquareIcon,
} from "@heroicons/react/24/solid";

import Loading from "@/components/loading";
import { trpc } from "@/utils/trpc";

import { CreateList } from "./create";
import { ListWrapper } from "@/components/list";

interface ListProps {
  id: number;
  name: string;
  active: boolean;
  itemsCount: number;
}

const ListAction: React.FC<{ active: boolean; loading: boolean }> = ({
  active,
  loading,
}) => {
  if (loading) {
    return (
      <svg
        className="h-6 w-6 animate-spin text-stone-400 motion-reduce:hidden"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    );
  }

  if (active) {
    return (
      <ArchiveBoxXMarkIcon className="w-6 text-base text-red-300 hover:text-red-500" />
    );
  }

  return (
    <ArrowUpOnSquareIcon className="w-6 text-base text-sky-300 hover:text-sky-500" />
  );
};

const List: React.FC<ListProps> = ({ id, name, active, itemsCount }) => {
  const utils = trpc.useContext();

  const { mutate: enableList, isLoading: isEnabling } = trpc.useMutation(
    ["lists.activate"],
    {
      onSuccess: () => {
        utils.invalidateQueries(["lists.getAll"]);
      },
    }
  );

  const { mutate: archiveList, isLoading: isDisabling } = trpc.useMutation(
    ["lists.archive"],
    {
      onSuccess: () => {
        utils.invalidateQueries(["lists.getAll"]);
      },
    }
  );

  const onActivate = () => {
    enableList({ id });
  };

  const onDelete = () => {
    archiveList({ id });
  };

  const loading = isEnabling || isDisabling;

  return (
    <div className="flex justify-between py-2">
      <Link href={`/lists/${id}`}>
        <a>{name}</a>
      </Link>
      <div className="flex-end flex flex-row">
        <span className="flex flex-row">{itemsCount}</span>
        <button
          className="ml-2"
          disabled={loading}
          onClick={active ? onDelete : onActivate}
        >
          <ListAction loading={loading} active={active} />
        </button>
      </div>
    </div>
  );
};

const Lists: NextPage = () => {
  const { data: lists, isLoading } = trpc.useQuery(["lists.getAll"]);

  return (
    <>
      <Head>
        <title>Shopping List</title>
        <meta name="description" content="My shopping list" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h2 className="mb-4">Here are your lists</h2>
          <ListWrapper>
            {lists?.length === 0 && (
              <h3 className="text-orange-400">You have no lists</h3>
            )}
            {lists?.map(
              ({ id, name, active, _count: { items: itemsCount } }) => (
                <List
                  key={id}
                  id={id}
                  name={name}
                  active={active}
                  itemsCount={itemsCount}
                />
              )
            )}
          </ListWrapper>
          <div className="mt-8 md:w-full lg:w-1/2">
            <CreateList />
          </div>
        </>
      )}
    </>
  );
};

export default Lists;
