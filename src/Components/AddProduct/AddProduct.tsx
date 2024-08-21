import { ChangeEvent, useState } from "react";
import { AllColorsShow, allInputs } from "../../data/data";
import Color from "../ui/Color/Color";
import { Dialog, DialogPanel } from "@headlessui/react";
import Category from "./Category/Category";
import { IuserData } from "../../interface/interface";
import Input from "../ui/Input/Input";
import Button from "../ui/Button/Button";
import Msg from "../ui/Msg/Msg";
import { VaildInput } from "../../VaildInput/VaildInput";

// interface Ierrors {
//   title: string;
//   description: string;
//   imageURL: string;
//   price: string;
// }

interface Iprops {
  userData: IuserData;
  setUserData: (val: IuserData) => void;
  category: string;
  setCategory: (val: string) => void;

  selectColor: string[];
  setSelectColor: any;
  submitHandlers: () => void;
}
function AddProduct({
  userData,
  setUserData,
  category,
  setCategory,

  selectColor,
  setSelectColor,
  submitHandlers,
}: Iprops) {
  // <------- STATE ------->
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });

  // <------- Handlers ------->

  const handlesOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setUserData({
      ...userData,
      [id]: value,
    })

    setError((prev) => {
      return { ...prev, [id]: "" };
    });
  };
  const cancelhandlers = () =>{
    setIsOpen(false);
    setUserData({
      title: "",
      description: "",
      imageURL: "",
      price: "",
    });
    setSelectColor([]);
    setCategory("");
  };

  // <------- Render ------->

  const allFields = allInputs.map((el, index) => {
    return (
      <div key={index} className="flex flex-col gap-1 mb-3">
        <label className="text-xl font-serif" htmlFor={el.id}>
          {el.lable}
        </label>
        <Input
          name={el.id}
          id={el.id}
          value={userData[el.id]}
          onChange={handlesOnChange}
        />
        <Msg msg={error[el.id]} />
      </div>
    );
  });

  const allColors = AllColorsShow.map((color) => (
    <Color
      key={color}
      bgColor={color}
      onClick={() => {
        if (selectColor.includes(color)) {
          setSelectColor((pre:any) => pre.filter((col:string) => col != color));
          return;
        }

        setSelectColor((pre:any) => [...pre, color]);
      }}
    />
  ));
  const allSelectColors = selectColor.map((color) => (
    <Color key={color} bgColor={color} />
  ));

  return (
    <>
      <div className="flex justify-center items-center w-full">
        <Button
          onClick={() => setIsOpen(true)}
          className="mx-auto bg-blue-600 text-white px-8 "
        >
          Add Product
        </Button>
      </div>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => {
          setIsOpen(false);
          cancelhandlers();
        }}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-gray-400 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              {allFields}
              <Category category={category} setCategory={setCategory} />
              <div className="flex flex-wrap space-y-2  items-baseline space-x-2 my-4">
                {allSelectColors}
              </div>
              <div className="flex flex-wrap space-y-2  items-baseline space-x-2 my-4">
                {allColors}
              </div>
              <div className="flex  space-y-2  items-baseline space-x-1 my-3">
                <Button
                  name="Submit"
                  className="bg-indigo-500 hover:bg-indigo-700"
                  onClick={() => {
                    const errors = VaildInput(userData);
                    if (Object.values(errors).every((el) => el == "")) {
                      submitHandlers();

                      setIsOpen(false);
                    } else {
                      setError(errors);
                    }
                  }}
                />
                <Button
                  name="Cancel"
                  className="bg-gray-400 hover:bg-gray-600"
                  onClick={() => {
                    cancelhandlers();
                  }}
                />
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default AddProduct;
