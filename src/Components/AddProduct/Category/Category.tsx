
interface Iprops {
  category: string;
  setCategory: (val: string) => void;
}
function Category({ category, setCategory }: Iprops) {
  return (
    <>
      <div className="grid gap-2 text-white text-xl font-serif ">
        <label htmlFor="floatingSelect">Category</label>
        <select
          className="text-blue-800 rounded-md p-2 border-[2px] border-gray-500  outline-none  focus:border-[2px]  focus:border-blue-600 "
          id="floatingSelect"
          name="catgory"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          <option>T-Shirt</option>
          <option>shoose</option>
          <option>Clothes</option>
          <option>PC Desktop </option>
          <option>Mobile </option>
          <option>Screen</option>
        </select>
      </div>
    </>
  );
}

export default Category;
