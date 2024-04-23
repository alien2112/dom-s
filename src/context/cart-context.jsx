        import { menu } from "@material-tailwind/react";
import { createContext, useEffect, useState } from "react";
import CartDrawer from "../components/Cartdrawer";
        const CartContext = createContext({});




        const CartContextProvider = (props) => {
            const [menuItems,setMenuItems] = useState({});
            const [isOpen, setIsOpen] = useState(true)
            const getDefaultCart = ()=>{
                let cart = {};
                for (let i = 1 ; i<21;i++){
                    cart[i] =0;
                }
                return cart;
            }

              const current_cart = JSON.parse(localStorage.getItem("current_cart"))
                
            const [cartItems,setCartItems] = useState(current_cart? current_cart:getDefaultCart);
            


            
            useEffect(() => {
                localStorage.setItem("current_cart", JSON.stringify(cartItems));
              }, [cartItems]);
 
              

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
            const openCart = () => setIsOpen(true)
            const closeCart = () => setIsOpen(false)
 
            function getCount(){
                var count=0
                for(let x in cartItems){
                    count +=cartItems[x]
                }
                return count
            }
            
        const contextValue = {openCart,closeCart,cartItems,addToCart,removeFromCart,clearCart,setMenuItems,menuItems,findproductbyId,clearItem,setCartItems,getCount}
        //console.log(cartItems)
            return (
            <CartContext.Provider value={contextValue}>
                {props.children}
                {/* <CartDrawer isOpen={isOpen} onClose={()=>closeCart()} /> */}
            </CartContext.Provider>
        )
        }

        export { CartContext, CartContextProvider };