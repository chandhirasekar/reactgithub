import React, { useEffect, useState } from "react";

const Home = () => {
  const [inputs, setInputs] = useState({
    name: "",
    price: "",
    oldprice: "",
    categorytype: "",
    description: "",
  });
  const [tableData, setTableData] = useState([]);
  const [editClick, setEditClick] = useState(false);
  const [editIndex, setEditIndex] = useState("");

  useEffect(() => {
     const items = JSON.parse(localStorage.getItem("inputs"));
    setTableData(items)
  
  }, []);

  const handleInput = (e) => {
    e.preventDefault();
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleMultipleData = (e) => {
    e.preventDefault();
    if (editClick) {
      const tableEdit = tableData;
      Object.assign(tableEdit[editIndex], inputs);
      setTableData([...tableEdit])
      setEditClick(false);
    localStorage.setItem("inputs",JSON.stringify(tableEdit))
      setInputs({
        name: "",
        price: "",
        oldprice: "",
        categorytype: "",
        description: "",
      });
          
    } else {
        const listitem = [...tableData, inputs];
      setTableData(listitem);
         localStorage.setItem("inputs", JSON.stringify(listitem));
      setInputs({
        name: "",
        price: "",
        oldprice: "",
        categorytype: "",
        description: "",
      });
    
    }
  };

  const handleEdit = (index) => {
    const editInput = tableData[index];
    setInputs({
      name: editInput.name,
      price: editInput.price,
      oldprice: editInput.oldprice,
      categorytype: editInput.categorytype,
      description: editInput.description,
    });
    setEditClick(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const filterData = tableData.filter((item, i) => i !== index);
    setTableData(filterData);
    // localStorage.setItem("inputs", JSON.stringify(filterData));
  };
  return (
    <div className="w-full h-[200vh] flex  flex-col gap-9">
      <h1 className="text-center py-5 text-[28px] font-bold">Crud operation</h1>
      <form
        onSubmit={handleMultipleData}
        className="h-[80vh] flex gap-7 flex-col justify-center items-center border my-5 mx-56"
      >
        <div className="flex flex-col w-[320px] gap-3">
          <label>Name:</label>
          <input
            type="text"
            placeholder="name"
            value={inputs.name}
            onChange={handleInput}
            name="name"
            required
            className="border border-gray-500"
          />
        </div>
        <div className="flex flex-col w-[320px] gap-3">
          <label>Price:</label>
          <input
            type="number"
            placeholder="Price"
            value={inputs.price}
            onChange={handleInput}
            name="price"
            required
            className="border border-gray-500"
          />
        </div>
        <div className="flex flex-col w-[320px] gap-3">
          <label>Old Price:</label>
          <input
            type="number"
            placeholder="Old Price"
            value={inputs.oldprice}
            onChange={handleInput}
            name="oldprice"
            required
            className="border border-gray-500"
          />
        </div>
        <div className="w-[320px] flex flex-col gap-3">
          <label>Category type:</label>
          <select
            value={inputs.categorytype}
            onChange={handleInput}
            name="categorytype"
            required
            className="border border-gray-500  w-[320px]"
          >
            <option> Vegetables</option>
            <option> Fruits & Nuts</option>
            <option> Dairy & creams</option>
            <option> Packages Food</option>
            <option> Staples</option>
          </select>
        </div>
        {/* <div>
          <input type="checkbox"   />
          <label>is active</label>
        </div> */}
        <div className="flex flex-col w-[320px]">
          <lable>Description:</lable>
          <textarea
            value={inputs.description}
            onChange={handleInput}
            name="description"
            required
            className="border border-gray-500 outline-none"
          />
        </div>
        <div>
          <button className=" bg-red-600 px-6 rounded-lg py-2" type="submit">
            {editClick ? "Update" : "Submit"}
          </button>
        </div>
      </form>
      <table className="mx-5 ">
        <thead className="">
          <tr className="">
            <th className="border">Name</th>
            <th className="border">Price</th>
            <th className="border">OldPrice</th>
            <th className="border">Categorytype</th>
            <th className="border">Description</th>
            <th className="border ">Button</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr>
              <td className="border text-center py-4">{item.name}</td>
              <td className="border text-center ">{item.price}</td>
              <td className="border text-center">{item.oldprice}</td>
              <td className="border text-center">{item.categorytype}</td>
              <td className="border text-center">{item.description}</td>
              <td className="flex gap-9 items-center justify-center py-4 border">
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-green-400 px-5 rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-400 px-5 rounded-lg"
                >
                  Delete
                </button>
              </td>
          
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default Home;
