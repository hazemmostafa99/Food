import React, { useReducer } from "react";
import CartContext from "./cart-context";
import cartReducer, { initState } from "./CartReducer";

const CartProvider = (props) => {
  const [cartReducerState, dispatch] = useReducer(cartReducer, initState);
  const addToCart = (item) => {
    dispatch({ type: "ADD", item: item });
  };

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE", id: id });
  };
  const clearCartHandler = ()=>{
    dispatch({type : "CLEAR"})
  }
  const cartContext = {
    items: cartReducerState.items,
    totalAmount: cartReducerState.totalAmount,
    addItem: addToCart,
    removeItem: removeFromCart,
    clearCart: clearCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
