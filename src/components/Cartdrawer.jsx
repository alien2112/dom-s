import React, { useContext, useEffect, useState } from 'react';
import { Offcanvas, Stack } from 'react-bootstrap';
import { CartContext } from '../context/cart-context';
import { CartItem } from '../components/cartItem';
import { Link } from 'react-router-dom';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, findproductbyId, setCartItems, getDefaultCart, clearCart } = useContext(CartContext);
  const [cartPrice, setCartPrice] = useState(0);

  // Calculate total cart price whenever cartItems change
  useEffect(() => {
    let total = 0;

    Object.entries(cartItems).forEach(([productId, quantity]) => {
      const product = findproductbyId(productId);
      if (product) {
        total += parseFloat(product.price) * quantity;
      }
    });

    setCartPrice(total);
  }, [cartItems, findproductbyId]);

  return (
    <Offcanvas show={isOpen} onHide={onClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {Object.entries(cartItems).map(([productId, quantity]) => {
            const product = findproductbyId(productId);
            if (product && quantity !== 0) {
              return <CartItem key={productId} product={product} quantity={quantity} />;
            } else {
              return null;
            }
          })}
          <div className="ms-auto fw-bold fs-5">Total Cart Price: {cartPrice.toFixed(2)}</div>
        </Stack>
        {cartPrice > 0 && (
          <div>
            <Link to="/checkout">
              <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-5">
                Check out
              </button>
            </Link>
          </div>
        )}
        {cartPrice > 0 && (
          <button
            className="mt-5 bg-red-600 hover:bg-transparent text-white border-red-600 py-2 px-9 border hover:border-transparent hover:text-red-600 rounded mb-6"
            onClick={clearCart}
          >
            Clear
          </button>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CartDrawer;