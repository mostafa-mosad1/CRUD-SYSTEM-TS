import { IuserData } from "../interface/interface";

export function VaildInput(product:IuserData) {
  const errors = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
  };

  if (
    !product.title.trim() ||
    product.title.length < 5 ||
    product.title.length > 100
  ) {
    errors.title = "Not Valid length is 5 to 15 charecter";
  }
  if (
    !product.description.trim() ||
    product.description.length < 5 ||
    product.description.length > 2000
  ) {
    errors.description = "description Not Valid length is 5 to 500 charecter";
  }
  // if (
  //   !product.imageURL.trim() ||
  //   product.imageURL.length < 5 ||
  //   product.imageURL.length > 2000
  // ) {
  //   errors.imageURL = "imageURL Not Valid";
  // }
  if (!product.price.trim() || isNaN(Number(product.price))) {
    errors.price = "Must Add Price";
  }

  return errors;
}
