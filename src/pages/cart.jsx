import React, { useState, useEffect } from "react";
import axios from "axios";
import { CartItem } from "../components/cartItem";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/carts/find/${localStorage.getItem('cartId')}`, {
          headers: {
            token: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        console.log(response.data.product)
        setCartItems(response.data.product);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {cartItems.length === 0 ? (
            <div>Your cart is empty.</div>
          ) : (
            <div>
              {cartItems.map((item) => (
                <CartItem key={item._id} product={item} quantity={item.quantity} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
