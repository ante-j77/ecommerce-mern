import React from "react";
import "./Header.css";
import logo from "../../assets/GameOn_logo1.png";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/auth/authReducer";

const Header = () => {
  const dispatch = useDispatch();
  const productInBasket = useSelector((state) => state.basket);
  const authState = useSelector((state) => state.auth);
  const { user, isLogin } = authState;

  const userName = user?.firstName + " " + user?.lastName;

  const handleLogout = () => {
    if (user) {
      dispatch(logout());
    }
  };

  // ukupna količina proizvoda
  const totalQuantity = productInBasket.reduce((total, product) => {
    return total + product.quantity;
  }, 0);

  return (
    <div className="header">
      <Link to="/">
        <div className="header_logo">
          <img src={logo} alt="logo" />
        </div>
      </Link>

      <div className="header_search">
        <input type="text" placeholder="Pretraži proizvode" />
        <SearchOutlinedIcon
          className="header_searchIcon"
          style={{ fontSize: "32px" }}
        />
      </div>

      <nav className="header_content">
        <Link to={!user && "/login"}>
          <div onClick={handleLogout}>
            <span>{!user ? "Log In" : "Log Out"}</span>
          </div>
        </Link>

        <Link to="/registration">
          <span>{!isLogin ? "Registration" : userName}</span>
        </Link>

        <Link to="/wishlist">
          <FavoriteBorderOutlinedIcon className="header_wishlist" />
        </Link>

        <Link to="/basket">
          <ShoppingBagOutlinedIcon className="header_basket" />
          {totalQuantity > 0 && (
            <span className="basket_quantity">{totalQuantity}</span>
          )}
        </Link>
      </nav>
    </div>
  );
};

export default Header;
