import React from "react";
import { NavLink, useParams } from "react-router-dom";
import "./productDetail.css";
import Layout from "../../layout";
import { products } from "../../data/productData";

export default function ProductDetail() {
  const params = useParams();

  let currentProduct = products.find((prod) => prod.id === Number(params.id));

  return (
    <Layout>
      <div>
        <ul className="cards">
          <li>
            <NavLink to="/" className="card">
              <img src={currentProduct.img} className="card__image" alt="" />
              <div className="card__header">
                <svg
                  className="card__arc"
                  xmlns="http://www.w3.org/2000/svg"
                ></svg>
                <div className="card__header-text">
                  <h1 className="card__desc__title">{currentProduct.name}</h1>
                  <span className="card__desc__status">
                    {currentProduct.description}
                  </span>
                </div>
              </div>
            </NavLink>
          </li>
        </ul>
      </div>
    </Layout>
  );
}
