export const initState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state = initState, action) => {
  if (action.type === "ADD") {
    let updatedItems;
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const itemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    console.log(itemIndex);
    let item = state.items[itemIndex];
    if (item) {
      const newItem = { ...item, amount: item.amount + action.item.amount };
      updatedItems = [...state.items];
      updatedItems[itemIndex] = newItem;
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    } else {
      updatedItems = state.items.concat(action.item);
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }
  }
  if (action.type === "REMOVE") {
    let updatedItems;
    let updatedTotalAmount;
    let itemIndex = state.items.findIndex((item) => item.id === action.id);
    let item = state.items[itemIndex];
    updatedTotalAmount = state.totalAmount - item.price;
    if (item.amount > 1) {
      let updatedItem = { ...item, amount: item.amount - 1 };
      updatedItems = state.items;
      updatedItems[itemIndex] = updatedItem;
    } else {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "CLEAR") {
    return { items: [], totalAmount: 0 };
  }
  return initState;
};

export default cartReducer;
