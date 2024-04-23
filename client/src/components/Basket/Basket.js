import React, { useState } from "react";
import "./Basket.css";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, removeAll } from "../../reducers/basket/basketReducer";
import { AiOutlineClose } from "react-icons/ai";
import Quantity from "../Quantity/Quantity";
import { Link, useNavigate } from "react-router-dom";

const Basket = () => {
  const productInBasket = useSelector((state) => state.basket);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // racunanje cijene proizvoda na osnovi kolicine
  const totalPrice = productInBasket.reduce((total, product) => {
    const productPrice = parseFloat(product.price);

    if (isNaN(productPrice)) {
      console.warn("Invalid product price:", product);
      return total;
    }

    return total + productPrice * product.quantity;
  }, 0);

  // ukupna količina proizvoda
  const totalQuantity = productInBasket.reduce((total, product) => {
    return total + product.quantity;
  }, 0);

  return (
    <div className="container">
      <h1>Basket</h1>
      <div className="basket">
        <div className="products">
          <ul>
            {productInBasket.map((product) => (
              <li className="productList" key={product.id}>
                <div className="left_desc">
                  <img src={product.image} alt="product" />
                  <p className="description">{product.description}</p>
                </div>
                <div className="quantity">
                  <Quantity id={product.id} quantity={product.quantity} />
                </div>
                <p className="price">{product.price}</p>
                <button
                  className="close_btn"
                  onClick={() => dispatch(removeItem({ id: product.id }))}
                >
                  <AiOutlineClose />
                </button>
              </li>
            ))}
          </ul>
          <div className="buttons">
            {productInBasket.length > 0 && (
              <button
                className="remove_all"
                onClick={() => dispatch(removeAll())}
              >
                Remove All
              </button>
            )}

            <button className="continue" onClick={() => navigate(-1)}>
              {/* <Link to="/">Keep Shopping</Link> */}
              Keep Shopping
            </button>
          </div>
        </div>
        <div className="payment">
          <h2>Total</h2>
          <div className="payment_info">
            <div className="info_line">
              <p>Product quantity: </p>
              <span>{totalQuantity}</span>
            </div>
            <div className="info_line">
              <p>Total price: </p>
              <span>{totalPrice}€</span>
            </div>
            <button>Proceed to checkout</button>
          </div>

          <div className="payment_info_cards">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Visa_Logo.png/640px-Visa_Logo.png"
              alt="card"
            />
            <img
              src="https://purepng.com/public/uploads/large/purepng.com-mastercard-logologobrand-logoiconslogos-251519938372dnf77.png"
              alt="card"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Maestro_logo.svg/2560px-Maestro_logo.svg.png"
              alt="card"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Basket;
