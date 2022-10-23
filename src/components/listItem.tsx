import { XMarkIcon } from "@heroicons/react/24/solid";

import { trpc } from "@/utils/trpc";

interface ListItemProps {
  id: string;
  name: string;
}

const ListItem: React.FC<ListItemProps> = ({ id, name }) => {
  const utils = trpc.useContext();

  const { mutate: deleteItem } = trpc.useMutation(["items.delete"], {
    onSuccess: () => {
      utils.invalidateQueries(["items.getAll"]);
    },
  });

  return (
    <div className="flex w-full justify-between rounded border-2 border-black px-4">
      <span className="text-size-2">{name}</span>
      <XMarkIcon onClick={() => deleteItem({ id })} />
    </div>
  );
};

export default ListItem;
