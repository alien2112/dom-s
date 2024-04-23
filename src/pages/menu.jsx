import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/cart-context";
import { Link } from "react-router-dom";
function Menu() {
  const [items, setItems] = useState([]);
  const { addToCart, removeFromCart, clearItem, clearCart, cartItems, setMenuItems, menuItems,getCount} = useContext(CartContext);

  useEffect(() => {
    console.log(getCount())
    setItems(menuItems);
    
  }, [menuItems]);

  if(!(menuItems.length>0)){ 

  setMenuItems(JSON.parse(localStorage.getItem("current_menu")));


  }
  return (
    <div id='menu' className="w-full mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
      {items.length > 0 ? (
        items.map((item, index) => (
          <div key={index} className="w-80 h-160 bg-white shadow-md rounded-xl overflow-hidden relative ">
              <Link key={item.id} to={`/item/${item.id}`}>
              <div className="w-50 h-30 flex items-center justify-center overflow-hidden border border-gray-200 shadow-md mr-4"> 
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
            </Link>
            <div className="px-4 py-3">
              <h5 className="text-3xl my-3 truncate">{item.title}</h5>
              <p className="text-sm text-gray-600 h-20 overflow-y-hidden mb-10">{item.description}</p>
            </div>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center"> {/* Position buttons at the bottom */}
              {cartItems[item.id] === undefined || cartItems[item.id] === 0 ? (
                <button onClick={() => addToCart(item)} className="p-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  Add To Cart
                </button>
              ) : (
                <>
                  <button onClick={() => removeFromCart(item)} className="bg-red-500 text-white px-2 py-1 rounded-md mr-2">
                    - {}
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
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Menu;
