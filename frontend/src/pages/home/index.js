import React from "react";
import "./home.css";
import Layout from "../../layout";
import bannerImg from "../../assets/images/pic6.webp";

export default function Home() {
  return (
    <Layout>
      <div>
        <ul className="cards">
          <li>
            <a href="/" className="card">
              <img src={bannerImg} className="card__image" alt="" />
              <div className="card__overlay">
                <div className="card__header">
                  <svg
                    className="card__arc"
                    xmlns="http://www.w3.org/2000/svg"
                  ></svg>

                  <div className="card__header-text">
                    <h1 className="card__title">EYE-CATCHING SHOES.</h1>
                  </div>
                  <div className="card__header-text">
                    <h1 className="card__title">COMING SOON...!</h1>
                  </div>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </Layout>
  );
}
