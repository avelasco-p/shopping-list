import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { trpc } from "@/utils/trpc";
import { InputText } from "@/components/input";

const schema = z.object({
  name: z.string().min(3, "Item name must be at least 3 characters long"),
  price: z.number().min(1, "You must add a price in $"),
});

type FormData = z.infer<typeof schema>;

interface CreateItemProps {
  listId: number;
}

export const CreateItem: React.FC<CreateItemProps> = ({ listId }) => {
  const utils = trpc.useContext();
  const { mutate: addItem, isLoading } = trpc.useMutation(["items.add"], {
    onSuccess: () => {
      utils.invalidateQueries(["lists.get"]);
    },
  });

  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = ({ name, price }) => {
    const priceInCents = price * 100;

    addItem({ name, price: priceInCents, listId });

    resetField("name");
    resetField("price");
  };

  return (
    <div className="w-1/2">
      <h2 className="my-4 text-center">Create a new Item</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col">
        <label id="name">Name: </label>
        <InputText
          type="text"
          className="border p-2"
          placeholder="Item name"
          {...register("name")}
        />
        {errors.name && (
          <span className="text-red-300">{errors.name.message}</span>
        )}
        <label id="">Price: </label>
        <InputText
          type="number"
          min="1"
          step="any"
          className="border p-2"
          placeholder="Item price"
          {...register("price", {
            setValueAs(value) {
              return parseInt(value);
            },
          })}
        />
        {errors.price && (
          <span className="text-red-500">{errors.price.message}</span>
        )}
        <input
          type="submit"
          value="CREATE"
          disabled={isLoading}
          className="mt-2 w-1/3 self-center rounded bg-sky-300 py-1 text-center text-white hover:bg-sky-500 sm:w-full md:w-1/3"
        />
      </form>
    </div>
  );
};
