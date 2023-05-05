import React from "react";
import "./product.css";
import { useNavigate, NavLink } from "react-router-dom";
import Layout from "../../layout";
import { products } from "../../data/productData";
import axios from "axios";

export default function Product() {
  const navigate = useNavigate();
  let userData = JSON.parse(sessionStorage.getItem("userDetail"));
  const AuthStr = `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`;

  const handleAddToCart = async (prod) => {
    const params = {
      productId: prod?.id,
      productName: prod?.name,
      productStatus: prod?.status,
      productDescription: prod?.description,
      user: userData?.email,
    };
    try {
      await axios.post("http://localhost:8080/api/cart", params, {
        headers: { token: AuthStr },
      });
    } catch (error) {
      // console.log("error", err);
      alert(error.message);
    }
  };
  return (
    <Layout>
      <div>
        <ul className="cards">
          {products?.map((prod) => (
            <li key={prod?.id} className="card">
              <NavLink to={`/product-detail/${prod?.id}`}>
                <img src={prod?.img} className="card__product__image" alt="" />
              </NavLink>
              <div className="card__overlay">
                <div className="card__header">
                  <div className="card__header-text">
                    <h3 className="card__title">{prod?.name}</h3>
                    <span className="card__status">{prod?.status}</span>
                  </div>
                  <div className="card__buttons">
                    <button
                      onClick={() =>
                        userData ? handleAddToCart(prod) : navigate("/login")
                      }
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => navigate(`/order?product=${prod?.id}`)}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
