import React, { useEffect, useState } from "react";
import axios from "axios";

function Menu() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setItems(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
      {items.map((items) => {
        return (
          <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
            <img
              src={items.image}
              className="h-80 w-72 object-cover rounded-t-xl"
              alt="Card image cap"
            />
            <div className="px-4 py-3 w-72">
              <div class="p-5 py-10 bg-purple-50 text-center transform duration-500 hover:-translate-y-2 cursor-pointer">
                <h5 className="text-3xl my-5">{items.title}</h5>
                <p className="mb-2">{items.description}</p>
                <div className="mt-auto ">
                  <button class="p-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Menu;
