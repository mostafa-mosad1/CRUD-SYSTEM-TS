import  { ButtonHTMLAttributes } from "react";
import { ReactNode } from "react";

interface Iprops extends ButtonHTMLAttributes<HTMLButtonElement> {
  name?: string;
  className?: string;
  children?: ReactNode;
  width?: "w-full" | "w-fit";
}
function Button({ name, children, className, width, ...rest }: Iprops) {
  return (
    <>
      <button
        type="button"
        {...rest}
        className={`${className} ${width} p-3 rounded-md text-white text-xl font-bold`}
      >
        {children}
        {name}
      </button>
    </>
  );
}

export default Button;
