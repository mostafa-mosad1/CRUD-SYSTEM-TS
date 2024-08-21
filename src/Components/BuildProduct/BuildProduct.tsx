import Button from "../ui/Button/Button";
import Color from "../ui/Color/Color";

import Image from "../ui/Image/Image";

interface Iprops {
  imageUrl: string;
  title: string;
  description: string;
  colors: string[];
  price: string;
  category: {
    name: string;
    imageURL: string;
  };
  editfUN?: () => void;
  deletefUN?: () => void;
}
function BuildProduct({
  imageUrl,
  title,
  description,
  colors,
  price,
  category,
  editfUN,
  deletefUN,
}: Iprops) {
  return (
    <>
      <div className="flex flex-col justify-between h-full p-1 m-auto w-full bg-white border-md border-gray-500 rounded-md">
     
        <div className="">
          <Image
            src={imageUrl}
            alt="logo"
            parentStyle="w-full h-[300px] rounded-md"
          />
          <h2 className="text-2xl">{title}</h2>
          <p className="line-clamp-3 text-lg my-3">{description}</p>
        </div>
        <div className="">
          <div className="flex space-x-1 my-2">
            {colors.map((color) => (
              <Color key={color} bgColor={color} />
            ))}
          </div>

          <div className="flex justify-between items-center space-x-1 my-2 text-2xl font-bold">
            <p className="">{price} EL</p>
            <div className="flex space-x-2 justify-center items-center">
              {category.name}
              <Image
                src={category.imageURL}
                alt="logo"
                parentStyle="size-12 rounded-full ms-2"
              />
            </div>
          </div>
          <div className="flex space-x-1 my-2">
            <Button
              name="Edit"
              width="w-full"
              className="bg-cyan-500"
              onClick={editfUN}
            />
            <Button
              name="Delete"
              width="w-full"
              className="bg-red-500"
              onClick={deletefUN}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default BuildProduct;
