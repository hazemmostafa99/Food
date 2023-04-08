import React, { useRef } from "react";
import Input from "../../Ui/Input/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const amountInput = useRef();
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInput.current.value;
    const amount = +enteredAmount;

    if (enteredAmount.trim().length === 0 || amount < 1 || amount > 5) {
      return;
    }

    props.onAddToCartHandler(amount);
  };
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <Input
        ref={amountInput}
        label="Amount"
        input={{
          type: "number",
          min: "1",
          step: "1",
          max: "5",
          id: "Amount" + props.id,
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
