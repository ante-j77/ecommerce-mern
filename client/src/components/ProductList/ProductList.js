import React from "react";
import "./ProductList.css";
import { useDispatch, useSelector } from "react-redux";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { addItem } from "../../reducers/basket/basketReducer";

const ProductList = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  return (
    <div className="products_list">
      {products.map((product) => (
        <div key={product.id} className="product">
          <button className="wish_btn">
            <FavoriteBorderOutlinedIcon />
          </button>
          <img src={product.image} alt="product" />
          <h2>{product.name}</h2>
          <p className="product_info">{product.description}</p>
          <p className="product_price">{product.price}</p>
          <button
            className="basket_btn"
            onClick={() => dispatch(addItem(product))}
          >
            Dodaj <ShoppingBagOutlinedIcon />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
