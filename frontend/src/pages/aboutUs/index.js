import React from "react";
import { NavLink } from "react-router-dom";
import Layout from "../../layout";
import { aboutsUs } from "../../data/aboutUs";

export default function AboutUs() {
  return (
    <Layout>
      <div>
        <ul className="cards">
          {aboutsUs.map((about) => (
            <li key={about.id}>
              <NavLink
                href="/"
                className={(isActive) => "card" + (!isActive ? "" : "")}
              >
                <img src={about.img} className="card__image" alt="" />
                <div className="card__overlay">
                  <div className="card__header">
                    <div className="card__header-text">
                      <h3 className="card__title">{about.name}</h3>
                      <span className="card__status">{about.status}</span>
                    </div>
                  </div>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
