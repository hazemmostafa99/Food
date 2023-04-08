import React, { Fragment, useContext, useEffect, useState } from "react";
import mealsImage from "../../assets/meals.jpg";
import CartContext from "../../store/cart-context";
import classes from "./Header.module.css";
const Header = (props) => {
  const [btnAnimate, setBtnAnimate] = useState(false);
  const { items } = useContext(CartContext);
  const numberOfItems = items.reduce((acc, cur) => {
    return acc + cur.amount;
  }, 0);

  const btnClasses = `${classes.button} ${btnAnimate ? classes.bump : ""}`;

  useEffect(() => {
    // if (items.length === 0) {
    //   return;
    // }
    if (items.length > 0) {
      setBtnAnimate(true);
    }

    const timer = setTimeout(() => {
      setBtnAnimate(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <button onClick={props.onShow} className={btnClasses}>
          <span className={classes.icon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
          </span>
          <span>Your Cart</span>
          <span className={classes.badge}>{numberOfItems}</span>
        </button>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="Meals" />
      </div>
    </Fragment>
  );
};

export default Header;
