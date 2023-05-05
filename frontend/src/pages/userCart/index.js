import React, { useEffect, useState } from "react";
import Layout from "../../layout";
import "./userCart.css";
import product1 from "../../assets/images/pic1.jpg";
import product2 from "../../assets/images/pic2.jpg";
import product3 from "../../assets/images/pic3.webp";
import product4 from "../../assets/images/pic4.jpg";
import product5 from "../../assets/images/pic5.webp";
import product6 from "../../assets/images/pic6.webp";
import { NavLink } from "react-router-dom";
import axios from "axios";

export default function UserCart() {
  const [cartData, setCartData] = useState([]);

  const userData = JSON.parse(sessionStorage.getItem("userDetail"));
  const AuthStr = `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`;

  const fetchCartData = async () => {
    try {
      const cart = await axios.get(
        `http://localhost:8080/api/cart/${userData.id}`,
        {
          headers: {
            token: AuthStr,
          },
        }
      );
      setCartData(cart.data);
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    fetchCartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderImage = (id) => {
    switch (id) {
      case 1:
        return product1;
      case 2:
        return product2;
      case 3:
        return product3;
      case 4:
        return product4;
      case 5:
        return product5;
      case 6:
        return product6;
      default:
        return product1;
    }
  };

  const handleRemoveFromCart = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/cart/${id}`, {
        headers: {
          token: AuthStr,
        },
      });
      fetchCartData();
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <Layout>
      <div className="cart-wrapper">
        <h1>Your Cart</h1>
        <div className="cart-body">
          {cartData?.length > 0 ? (
            cartData?.map((item) => (
              <div key={item._id} className="cart-card">
                <img
                  src={renderImage(item.productId)}
                  alt=""
                  className="cart-img"
                />
                <div className="cart-name">
                  <h3>{item.productName}</h3>
                  <h5>{item.productStatus}</h5>
                </div>
                <div className="cart-button">
                  <button onClick={() => handleRemoveFromCart(item._id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h3>Your Cart is empty.</h3>
          )}
        </div>
        {cartData?.length > 0 && (
          <div className="cart-checkout-button">
            <button>
              <NavLink to="/order">Checkout Now</NavLink>
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
