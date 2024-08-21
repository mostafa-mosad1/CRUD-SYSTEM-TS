import { LiHTMLAttributes } from "react";

interface Iprops extends LiHTMLAttributes<HTMLLIElement>{
  bgColor: string;
}
function Color({ bgColor,...rest }: Iprops) {
  return (
    <>
      <li
      {...rest}
          data-color={bgColor}
          style={{backgroundColor: bgColor}}
          className={`size-6 rounded-full block cursor-pointer`}
        ></li>
    </>
  );
}

export default Color;

// {`bg-[${bgColor}] size-10 rounded-full`}
