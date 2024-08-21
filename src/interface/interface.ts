export interface IproductList {
  id: string;
  title: string;
  description: string;
  imageURL: string;
  price: string;
  colors: string[];
  category: {
    name: string;
    imageURL: string;
  };
}



export interface IuserData {
  title:string,
  description:string,
  imageURL:string,
  price:string,
}
export interface IallInputs {
  type: string;
  lable: string;
  id: "title"|"description"|"imageURL"|"price";
}

// title: editProduct!.title,
// description: editProduct!.description,
// imageURL: editProduct!.imageURL,
// price: editProduct!.price,