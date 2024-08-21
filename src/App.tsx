import { useState } from 'react'
import './App.css'
import { v4 as uuidv4 } from "uuid";
import { productList } from './data/data';
import { IproductList, IuserData } from './interface/interface';
import BuildProduct from './Components/BuildProduct/BuildProduct';
import AddProduct from './Components/AddProduct/AddProduct';
import EditProduct from './Components/EditProduct/EditProduct';


function App() {
   //  <---------- STATE ---------->
   const [userData, setUserData] = useState<IuserData>({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  const [category, setCategory] = useState("");
  const [selectColor, setSelectColor] = useState([]);

  const [products, setProducts] = useState(productList);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<IproductList>();

  const my_pro: IproductList = {
    id: uuidv4(),
    ...userData,
    colors: selectColor,
    category: { name: `${category}`, imageURL: `${userData.imageURL}` },
  };
  //  <---------- RENDER ---------->

  const allProducts = products.map((pro) => (
    <BuildProduct
      key={pro.id}
      imageUrl={pro.imageURL}
      title={pro.title}
      description={pro.description}
      colors={pro.colors}
      price={pro.price}
      category={pro.category}
      deletefUN={() => {
        console.log("delete");
        setProducts(products.filter((product) => product.id != pro.id));
      }}
      editfUN={() => {
        setEditProduct(pro);
        setIsEditOpen(true);
        console.log("edit");
      }}
    />
  ));

  //  <---------- Handlers ---------->
  const defualtObject = () => {
    setUserData({
      title: "",
      description: "",
      imageURL: "",
      price: "",
    });
    setSelectColor([]);
    setCategory("");
  };

  const submitHandlers = () => {
    setProducts((pre) => [my_pro, ...pre]);
    defualtObject();
    console.log(my_pro);
  };
const cancelHandlers = () => {
  setIsEditOpen(false);
  console.log("cancel");
  defualtObject()
}
const editHandlers = (id:any) => {
  console.log(products.length);
  console.log(my_pro)
  setProducts(products.filter((product) => product.id != id));
  setProducts(pre => [my_pro,...pre]);
  defualtObject()

}
  return (
    <>
      <AddProduct
        userData={userData}
        setUserData={setUserData}
        category={category}
        setCategory={setCategory}
        selectColor={selectColor}
        setSelectColor={setSelectColor}
        submitHandlers={submitHandlers}
      />
      <EditProduct
        isEditOpen={isEditOpen}
        setIsEditOpen={setIsEditOpen}
        userData={userData}
        setUserData={setUserData}
        selectColor={selectColor}
        setSelectColor={setSelectColor}
        editProduct={editProduct}
        editHandlers={editHandlers}
        cancelHandlers={cancelHandlers}
      /> 
       <div className=" m-auto">
        <div className="grid mt-10 gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  ">
          {allProducts}
        </div>
      </div>
    </>
  )
}

export default App

// git remote add origin https://github.com/mostafa-mosad1/CRUD-System.git