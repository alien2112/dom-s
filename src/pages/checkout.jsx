import { useContext } from "react";

import { CartContext } from "../context/cart-context";
function CheckoutPage({ totalPrice }) {
  const {
    cartItems,
    findproductbyId,
    setCartItems,
    getDefaultCart,
    clearCart,
  } = useContext(CartContext);
  var Delivery = 20;
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Checkout</h1>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/3 pr-8">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Payment Information</h2>

            <form>
              <div className="mb-4">
                <label
                  htmlFor="card-number"
                  className="block text-sm font-medium text-gray-700"
                >
                  Card Number
                </label>
                <input
                  type="text"
                  id="card-number"
                  name="card-number"
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-4"
                  placeholder=""
                />
                <label
                  htmlFor="card-number"
                  className="block text-sm font-medium text-gray-700"
                >
                  Card ccv
                </label>
                <input
                  type="text"
                  id="card-ccv"
                  name="card-ccv"
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-4"
                  placeholder=""
                />
                <h3>Credit Card Expiration Date Field</h3>
                <div className="exp-wrapper mt-4">
                  <input
                    id="month"
                    maxlength="2"
                    pattern="[0-9]*"
                    placeholder="MM"
                    type="text"
                    data-pattern-validate
                  />
                  <input
                    id="year"
                    maxlength="2"
                    pattern="[0-9]*"
                    placeholder="YY"
                    type="text"
                    data-pattern-validate
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
              >
                Place Order
              </button>
            </form>
          </div>
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between items-center mt-4">
              <span className="font-semibold">Delivery:</span>
              <span>{Delivery}</span>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="font-semibold">Taxes:</span>
              <span>{totalPrice / 10}</span>
            </div>

            <div className="flex justify-between items-center mt-4">
              <span className="font-semibold">Total:</span>
              <span>{totalPrice + Delivery + totalPrice / 10}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
