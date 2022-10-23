import { PropsWithChildren } from "react";

export const ListWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col divide-y rounded border p-4 text-center sm:w-full lg:w-1/2">
      {children}
    </div>
  );
};
