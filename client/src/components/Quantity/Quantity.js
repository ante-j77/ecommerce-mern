import React from "react";
import {
  increaseQuantity,
  decreaseQuantity,
  setSpecificQuantity,
} from "../../reducers/basket/basketReducer";
import { useDispatch } from "react-redux";

const Quantity = ({ id, quantity }) => {
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);

    if (!isNaN(newQuantity) && newQuantity > 0) {
      dispatch(setSpecificQuantity({ id, quantity: newQuantity }));
    }
  };

  return (
    <div className="quantity">
      <button onClick={() => dispatch(decreaseQuantity(id))}>-</button>
      <input
        type="number"
        value={quantity}
        onChange={handleInputChange}
        min="1"
      />
      <button onClick={() => dispatch(increaseQuantity(id))}>+</button>
    </div>
  );
};

export default Quantity;
