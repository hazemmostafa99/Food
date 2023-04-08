import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const notEmpty = (value) => {
  return value.trim() !== "";
};

const fiveChars = (value) => {
  return value.trim().length === 5;
};

const Checkout = (props) => {
  const [formInputsValdity, setformInputsValdity] = useState({
    name: true,
    city: true,
    postalCode: true,
    address: true,
  });
  const nameInputRef = useRef();
  const addressInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();
  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredNameIsValid = notEmpty(enteredName);
    const enteredAddressIsValid = notEmpty(enteredAddress);
    const enteredCityIsValid = notEmpty(enteredCity);
    const enteredPostalCodeIsValid = fiveChars(enteredPostalCode);
    setformInputsValdity({
      name: enteredNameIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
      address: enteredAddressIsValid,
    });
    const formIsValid =
      enteredNameIsValid &&
      enteredAddressIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;
    console.log(
      enteredNameIsValid,
      enteredAddressIsValid,
      enteredCityIsValid,
      enteredPostalCodeIsValid
    );
    if (!formIsValid) {
      return;
    }
    props.onSubmit({
      name: enteredName,
      city: enteredCity,
      postalCode: enteredPostalCode,
      address: enteredAddress,
    });
  };

  const nameInputClass = `${classes.control} ${
    !formInputsValdity.name && classes.invalid
  }`;
  const addressInputClass = `${classes.control} ${
    !formInputsValdity.address && classes.invalid
  }`;
  const cityInputClass = `${classes.control} ${
    !formInputsValdity.city && classes.invalid
  }`;
  const postalCodeInputClass = `${classes.control} ${
    !formInputsValdity.postalCode && classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameInputClass}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValdity.name && (
          <p className={classes["error-text"]}>Please enter your name</p>
        )}
      </div>
      <div className={addressInputClass}>
        <label htmlFor=" address"> Address</label>
        <input type="text" id=" address" ref={addressInputRef} />
        {!formInputsValdity.address && (
          <p className={classes["error-text"]}>Please enter your postal code</p>
        )}
      </div>
      <div className={postalCodeInputClass}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formInputsValdity.postalCode && (
          <p className={classes["error-text"]}>Please enter your postal code</p>
        )}
      </div>
      <div className={cityInputClass}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValdity.city && (
          <p className={classes["error-text"]}>Please enter your city</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
