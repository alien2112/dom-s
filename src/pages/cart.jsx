import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/cart-context';
import { CartItem } from '../components/cartItem';
import { Link } from 'react-router-dom';
import Checkout from './checkout';
const Cart = () => {
  const { cartItems, findproductbyId ,setCartItems,getDefaultCart,clearCart} = useContext(CartContext);
  const [cartPrice, setCartPrice] = useState(0);
  const [checkout,setCheckout] = useState(false);

  // Calculate total cart price whenever cartItems change
  useEffect(() => {
    console.log(cartItems)
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

    <div className='min-h-screen'>
      <div className="py-6 px-4">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white text-center mb-4">
          Your Cart Items
        </h1>
      </div>
      <div>
        {Object.entries(cartItems).map(([productId, quantity]) => {
          const product = findproductbyId(productId);
          if (product && quantity !== 0) {
            
            return <CartItem key={productId} product={product} quantity={quantity} />;
          } else {
            return null;
          }
        })}
      </div>
      

      {cartPrice>0 &&(<div> <h2 className='border-y bg-amber-600 border-b-4 border-t-4 text-white border-l'>Total Cart Price : {cartPrice.toFixed(2)}</h2><button onClick={()=>setCheckout(true)} className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-5'>Check out</button> </div>)}
      {checkout&&<Checkout totalPrice={cartPrice}/>}
      {cartPrice>0 &&<button className='mt-5 bg-red-600 hover:bg-transparent text-white border-red-600 py-2 px-9 border hover:border-transparent hover:text-red-600 rounded mb-6' onClick={clearCart}>clear</button>}
    
    </div>
  );
};

export default Cart;
