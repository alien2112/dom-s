import React from "react";
import { useContext } from "react";
import { CartContext } from "../context/cart-context";

export const CartItem = ({ product, quantity }) => {
  const { addToCart, removeFromCart, clearItem, clearCart, cartItems, addMenuItems } = useContext(CartContext);
  const totalPrice = (parseFloat(product.price) * quantity).toFixed(2);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center">
        <img
          src={product.image}
          alt={product.title}
          className="h-24 w-24 object-cover rounded-md mr-4"
        />
        <div>
          <p className="font-semibold text-gray-900 dark:text-white">{product.title}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{product.description}</p>
          <p className="font-semibold text-gray-900 dark:text-white">Price: {product.price}</p>
          <p className="text-gray-600 dark:text-gray-400">Quantity: {quantity}</p>
          {quantity > 1 && <p className="font-semibold text-gray-900 dark:text-white">TotalPrice: {totalPrice}</p>}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="bg-white p-2 rounded-md flex items-center">
          <button
            onClick={() => removeFromCart(product)}
            className="border-none text-2xl text-amber-600 dark:text-amber-300 px-3 py-1 rounded-l-md border-amber-600 border-4"
          >
            -
          </button>
          <span className="font-semibold text-xl mx-2">{quantity}</span>
          <button
            onClick={() => { addToCart(product); addMenuItems(product); }}
            className="border-none text-2xl text-amber-600 dark:text-amber-300 px-3 py-1 rounded-r-md border-amber-600 border-4"
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={() => clearItem(product)}
        className="bg-gray-500 text-white px-2 py-1 rounded-md mt-2"
      >
        Remove
      </button>
    </div>
  );
};
