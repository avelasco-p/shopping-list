import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trpc } from "../../utils/trpc";

const schema = z.object({
  name: z.string().min(5, "List name must be at least 5 characters long"),
});

type FormData = z.infer<typeof schema>;

export const CreateList: React.FC = () => {
  const utils = trpc.useContext();
  const { mutate: addList, isLoading } = trpc.useMutation(["lists.add"], {
    onSuccess: () => {
      utils.invalidateQueries(["lists.getAll"]);
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

  const onSubmit: SubmitHandler<FormData> = ({ name }) => {
    resetField("name");
    addList({ name: name });
  };

  return (
    <>
      <h2 className="mb-4 text-center">Create a new list</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col">
        <input
          type="text"
          className="border p-2"
          placeholder="name of the list"
          {...register("name")}
        />
        {errors.name && (
          <span className="text-red-300">{errors.name.message}</span>
        )}
        <input
          disabled={isLoading}
          type="submit"
          value="CREATE"
          className="mt-2 w-1/3 self-center rounded bg-sky-300 py-1 text-center text-white hover:bg-sky-500 sm:w-full md:w-1/3"
        />
      </form>
    </>
  );
};
