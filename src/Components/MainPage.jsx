import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/MainPage.css";
import mainimage from "../images/mainimage2.jpg";

const MainPage = () => {
    return (
      <section id="Home">
        <div className="hero-container position-relative">
          <div className="hero-image">
            <img
              src={mainimage}
              alt="Scenic city view"
              className="img-fluid w-100"
            />
          </div>
          <div className="hero-text text-center">
            <p className="headertext" style={{ fontWeight: 800, fontSize: 45 }}>
              Enjoy Your Dream Vacation
            </p>
            <p>
              Plan and book your perfect trip with expert advice, travel tips,
              destination information, and inspiration from us.
            </p>
          </div>
        </div>
      </section>
    );
};

export default MainPage;
