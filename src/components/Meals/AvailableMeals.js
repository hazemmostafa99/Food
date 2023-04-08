import React, { useEffect, useState } from "react";
import Card from "../Ui/Card/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(
          "https://http-a6f66-default-rtdb.firebaseio.com/meals.json"
        );
        if (!response.ok) {
          throw new Error("Something Went Wrong");
        }
        const data = await response.json();
        const arrOfMeals = [];
        for (const key in data) {
          const meal = {
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          };
          arrOfMeals.push(meal);
        }
        setMeals(arrOfMeals);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false)
        setError(error.message);
      }
    };
    fetchMeals();
  }, []);

  const mealsList = meals.map((meal, index) => {
    return (
      <MealItem
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
        id={meal.id}
      />
    );
  });

  let content = <p>No Items Avilable Now</p>;
  if (meals.length > 0) {
    content = mealsList;
  }

  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{content}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
