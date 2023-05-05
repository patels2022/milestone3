import React from "react";
import Layout from "../../layout";
import "./hype.css";
import hypeImg from "../../assets/images/hype.jpg";

export default function Hype() {
  return (
    <Layout>
      <div>
        <img src={hypeImg} className="hype__image" alt="" />
        <div className="hype__card">
          <div id="myDIV" className="hype__header">
            <h2>Tell us your HYPE! story</h2>
            <input
              type="text"
              id="myInput"
              placeholder="HYPE! Story"
              className="hype__input"
            />
            <span onclick="newElement()" className="hype__addBtn">
              POST
            </span>
          </div>

          <ul id="myUL" className="hype__ul">
            <li>I have been lookng for such shoes for a long time.</li>
            <li>nice shoes</li>
            <li>I never saw someting like this</li>
            <li>unique design</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
