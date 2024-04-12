import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/cart-context";

function Menu() {
  const [items, setItems] = useState([]);
  const { addToCart, removeFromCart, clearItem, clearCart, cartItems, saveMenuItems } = useContext(CartContext);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setItems(res.data);
        saveMenuItems(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
      {items.map((item) => {
        return (
          <div key={item.id} className="w-80 h-160 bg-white shadow-md rounded-xl overflow-hidden relative">
            <img src={item.image} className="h-50 w-20" alt="Product" />
            <div className="px-4 py-3">
              <h5 className="text-3xl my-3 truncate">{item.title}</h5>
              <p className="text-sm text-gray-600 h-20 overflow-y-hidden">{item.description}</p>
            </div>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center"> {/* Position buttons at the bottom */}
              {cartItems[item.id] === 0 ? (
                <button onClick={() => addToCart(item)} className="p-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  Add To Cart
                </button>
              ) : (
                <>
                  <button onClick={() => removeFromCart(item)} className="bg-red-500 text-white px-2 py-1 rounded-md mr-2">
                    -
                  </button>
                  <span className="font-semibold">{cartItems[item.id]}</span>
                  <button onClick={() => addToCart(item)} className="bg-green-500 text-white px-2 py-1 rounded-md ml-2">
                    +
                  </button>
                  <button onClick={() => clearItem(item)} className="bg-gray-500 text-white px-2 py-2 rounded-md mt">
                    Remove
                  </button>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Menu;
