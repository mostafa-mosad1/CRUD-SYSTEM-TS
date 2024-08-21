import { Dialog, DialogPanel } from "@headlessui/react";
import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import Button from "../ui/Button/Button";
import { IproductList, IuserData } from "../../interface/interface";
import { AllColorsShow, allInputs } from "../../data/data";
import Input from "../ui/Input/Input";
import Msg from "../ui/Msg/Msg";
import Color from "../ui/Color/Color";
import { VaildInput } from "../../VaildInput/VaildInput";

interface Iprops {
  isEditOpen: boolean;
  setIsEditOpen: (val: boolean) => void;
  userData: IuserData;
  setUserData: (val: IuserData) => void;

  selectColor: string[];
  setSelectColor: any;
  editProduct?: IproductList;
  editHandlers: (val: ReactNode) => void;
  cancelHandlers: () => void;
}
export default function EditProduct({
  isEditOpen,
  setIsEditOpen,
  userData,
  setUserData,
  selectColor,
  setSelectColor,
  editProduct,
  editHandlers,
  cancelHandlers,
}: Iprops) {
  // <------- STATE ------->
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
    });
    setError({ ...error, [id]: "" });
  };

  useEffect(() => {
    renderOldData();
  }, [editProduct]);

  const renderOldData = () => {
    if (isEditOpen) {
      setUserData({
        title: editProduct!.title,
        description: editProduct!.description,
        imageURL: editProduct!.imageURL,
        price: editProduct!.price,
      });
      setSelectColor([...editProduct!.colors]);
    }
  };

  //   console.log(userData);
  //   console.log(editProduct);
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
          setSelectColor((pre: any) =>
            pre.filter((col: string) => col != color)
          );
          return;
        }

        setSelectColor((pre: any) => [...pre, color]);
      }}
    />
  ));
  const allSelectColors = selectColor.map((color) => (
    <Color key={color} bgColor={color} />
  ));
  return (
    <>
      <Dialog
        open={isEditOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => setIsEditOpen(false)}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel
                transition
                className="w-full max-w-md rounded-xl bg-gray-400 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
              >
                {allFields}

                <div className="flex flex-wrap space-y-2  items-baseline space-x-2 my-4">
                  {allSelectColors}
                </div>
                <div className="flex flex-wrap space-y-2  items-baseline space-x-2 my-4">
                  {allColors}
                </div>
                <div className="flex  space-y-2  items-baseline space-x-1 my-3">
                  <Button
                  width="w-full"
                    name="Edit"
                    className="bg-indigo-500 hover:bg-indigo-700"
                    onClick={() => {
                      const errors = VaildInput(userData);
                      if (Object.values(errors).every((el) => el == "")) {
                        editHandlers(editProduct!.id);
                        setIsEditOpen(false);
                        console.log()
                      } else {
                        setError(errors);
                      }
                    }}
                  />
                  <Button
                  width="w-full"
                    name="Cancel"
                    className="bg-gray-400 hover:bg-gray-600"
                    onClick={() => cancelHandlers()}
                  />
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
