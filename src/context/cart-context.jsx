        import { menu } from "@material-tailwind/react";
import { createContext, useEffect, useState } from "react";
        const CartContext = createContext({});




        const CartContextProvider = (props) => {
            const [menuItems,setMenuItems] = useState({});
            const getDefaultCart = ()=>{
                let cart = {};
                for (let i = 1 ; i<21;i++){
                    cart[i] =0;
                }
                return cart;
            }  
            const [cartItems,setCartItems] = useState(getDefaultCart);
            



            function saveMenuItems(items) {
               
                setMenuItems(items)
            }
            function addToCart(item){
                setCartItems((prev)=>({...prev,[item.id]:prev[item.id]+1}));
            }
            function removeFromCart(item){
                setCartItems((prev)=>({...prev,[item.id]:prev[item.id]-1}));
            }
            function clearItem(item){
                setCartItems((prev)=>({...prev,[item.id]:0}));
            }
            function clearCart(){
                setCartItems(getDefaultCart);
            
            }
            function findproductbyId(productId){
             
                return menuItems[productId-1];

            }
            
            
        const contextValue = {cartItems,addToCart,removeFromCart,clearCart,saveMenuItems,findproductbyId,clearItem}
        console.log(cartItems)
            return (
            <CartContext.Provider value={contextValue}>{props.children}</CartContext.Provider>
        )
        }

        export { CartContext, CartContextProvider };