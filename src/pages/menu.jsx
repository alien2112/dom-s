import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { CartContext } from "../context/cart-context";

function Menu() {
  const { setGetCount, setMenuItems, menuItems } = useContext(CartContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/products/find")
      .then((res) => {
        setMenuItems(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);
  const handleAddToCart = async (itemId) => {
    try {
        const userId = JSON.parse(localStorage.getItem("loggedInUser"))._id;
        const cartId = localStorage.getItem("cartId");
        const authToken = localStorage.getItem("authToken");

        const productToAdd = { productId: itemId, quantity: 1 };

        let updatedCart;
       

        if (cartId) {
            const cart = await axios.get(`http://localhost:5000/api/v1/carts/find/${cartId}`, {
                headers: {
                    token: `Bearer ${authToken}`,
                },
            });

            updatedCart = {
                ...cart.data,
                product: [...cart.data.product, productToAdd],
            };

            const updatedCartResponse = await axios.put(
                `http://localhost:5000/api/v1/carts/update/${cartId}`,
                updatedCart,
                {
                    headers: {
                        token: `Bearer ${authToken}`,
                    },
                }
            );

            console.log(updatedCartResponse.data);

         
            setGetCount(cart.data.product.length + 1);
        } else {
            const newCartResponse = await axios.post(
                "http://localhost:5000/api/v1/carts/create",
                { userId, product: [productToAdd] },
                {
                    headers: {
                        token: `Bearer ${authToken}`,
                    },
                }
            );

            updatedCart = newCartResponse.data;

            console.log(newCartResponse.data);
            localStorage.setItem("cartId", updatedCart._id);

            // Cart count will be 1 since it's a new cart
            setGetCount(1)
        }

        return { updatedCart }; // Return updated cart and count
    } catch (error) {
        console.error("Error adding item to cart:", error);
    }
};

  return (
    <div id="menu" className="w-full mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-10 gap-x-10 mt-10 mb-5">
      {loading ? (
        <div>Loading...</div>
      ) : (
        menuItems.map((item, index) => (
          <motion.div
            key={index}
            className="w-full bg-white shadow-md rounded-xl overflow-hidden relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link key={item.id} to={`/item/${item._id}`} className="block">
              <div className="w-full h-56 overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
            </Link>
            <div className="px-4 py-3">
              <h5 className="text-xl font-semibold mb-2 truncate">{item.title}</h5>
              <p className="text-sm text-gray-600 overflow-hidden line-clamp-2" style={{ maxHeight: "2.5rem" }}>
                {item.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">${item.price}</span>
                <button onClick={() => handleAddToCart(item._id)} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  Add To Cart
                </button>
              </div>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
}

export default Menu;
