import { forwardRef } from "react";

type InputProps = React.FC & { className: string };

export const InputText = forwardRef<HTMLInputElement, InputProps>(
  function InputText(props, ref) {
    const { className, ...rest } = props;

    return (
      <input
        ref={ref}
        type="text"
        className={"rounded border p-2 " + className}
        {...rest}
      />
    );
  }
);
