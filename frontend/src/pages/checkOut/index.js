import React, { useState, useEffect } from "react";
import Layout from "../../layout";
import { useLocation } from "react-router-dom";
import { products } from "../../data/productData";
import "./checkout.css";
import product1 from "../../assets/images/pic1.jpg";
import product2 from "../../assets/images/pic2.jpg";
import product3 from "../../assets/images/pic3.webp";
import product4 from "../../assets/images/pic4.jpg";
import product5 from "../../assets/images/pic5.webp";
import product6 from "../../assets/images/pic6.webp";
import axios from "axios";

export default function CheckOut() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const product = searchParams.get("product");
  console.log(product);

  let userData = sessionStorage.getItem("user");
  const userDetail = JSON.parse(sessionStorage.getItem("userDetail"));
  const AuthStr = `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`;

  const [cartData, setCartData] = useState([]);
  const [orderData, setOrderData] = useState({
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  });

  let tempArray = [];
  if (product) {
    let singleProduct = products?.find((item) => item.id === Number(product));
    let objToPush = {
      user: userData,
      productId: singleProduct.id,
      productName: singleProduct.name,
      productStatus: singleProduct.status,
      productDescription: singleProduct.description,
    };
    tempArray.push(objToPush);
  } else {
    tempArray = cartData;
  }
  console.log("tempArray", tempArray, products, product);
  const handleRemoveFromCart = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/cart/${id}`, {
        headers: {
          token: AuthStr,
        },
      });
    } catch (err) {
      console.log("error", err);
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    const params = {
      phoneNumber: orderData?.phoneNumber,
      address: orderData?.address,
      city: orderData?.city,
      state: orderData?.state,
      country: orderData?.country,
      pinCode: orderData?.pinCode,
      user: userData,
      products: tempArray,
    };
    try {
      await axios.post("http://localhost:8080/api/order", params, {
        headers: {
          token: AuthStr,
        },
      });
      if (!product) {
        tempArray.map((item) => handleRemoveFromCart(item._id));
      }
      alert("Order Place Successfuly");
      window.location.href = "/";
    } catch (error) {
      // console.log("error", err);
      alert(error.message);
    }
  };

  const fetchCartData = async () => {
    try {
      const cart = await axios.get(
        `http://localhost:8080/api/cart/${userDetail.id}`,
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

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
  };

  console.log(orderData);
  return (
    <Layout>
      <div className="cart-wrapper">
        <h1>Place Order</h1>
        <div className="cart-body">
          {tempArray?.length > 0 &&
            tempArray?.map((item) => (
              <div key={item.uid} className="cart-card">
                <img
                  src={renderImage(item.productId)}
                  alt=""
                  className="order-img"
                />
                <div className="cart-name">
                  <h3>{item.productName}</h3>
                  <h5>{item.productStatus}</h5>
                </div>
              </div>
            ))}
        </div>
        <form onSubmit={handlePlaceOrder} className="order-form">
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={orderData.phoneNumber}
            onChange={handleFormData}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={orderData.address}
            onChange={handleFormData}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={orderData.city}
            onChange={handleFormData}
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={orderData.state}
            onChange={handleFormData}
            required
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={orderData.country}
            onChange={handleFormData}
            required
          />
          <input
            type="text"
            name="pinCode"
            placeholder="Pin Code"
            value={orderData.pinCode}
            onChange={handleFormData}
            required
          />
          <div className="cart-checkout-button">
            <button>Order</button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
