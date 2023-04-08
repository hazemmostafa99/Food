import React, { Fragment, useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../Ui/Modal/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);

  const addToCartHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const removeFromCartHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItems = cartCtx.items.map((item) => {
    return (
      <CartItem
        onRemove={() => removeFromCartHandler(item.id)}
        onAdd={() => addToCartHandler(item)}
        key={item.id}
        {...item}
      />
    );
  });
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const orderHandler = () => {
    setIsCheckout(true);
  };
  const cancelOrderHandler = () => {
    setIsCheckout(false);
  };
  const submitHandler = async (userData) => {
    setIsSubmiting(true);
    await fetch("https://http-a6f66-default-rtdb.firebaseio.com/orders.json", {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        orderItems: cartCtx.items,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setIsSubmiting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };
  const actionButtons = (
    <div className={classes.actions}>
      <button onClick={props.onClose} className={classes["button--alt"]}>
        Close
      </button>
      {cartCtx.items.length > 0 && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );
  let cartModal = (
    <Fragment>
      <div>
        <ul className={classes["cart-items"]}>{cartItems}</ul>
      </div>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && cartCtx.items.length > 0 && (
        <Checkout onSubmit={submitHandler} onCancel={cancelOrderHandler} />
      )}
      {!isCheckout && actionButtons}
    </Fragment>
  );
  if (isSubmiting) {
    cartModal = <p>Sending Order...</p>;
  }
  if (didSubmit) {
    cartModal = (
      <Fragment>
        <p>Your order is successfully Send</p>
        <div className={classes.actions}>
          <button onClick={props.onClose} className={classes.button}>
            Close
          </button>
        </div>
      </Fragment>
    );
  }
  return <Modal onClose={props.onClose}>{cartModal}</Modal>;
};

export default Cart;
