import { InputHTMLAttributes } from "react";

interface Iprops extends InputHTMLAttributes<HTMLInputElement> {}
function Input({ ...rest }: Iprops) {
  return (
    <>
      <input
        className="text-blue-800  rounded-md p-2  border-[2px] border-gray-500  outline-none shadow-md  focus:border-[2px]  focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 "
        {...rest}
      />
    </>
  );
}

export default Input;
