import React, { useState } from "react";
import placesData from "./placeData";
import { Link } from "react-router-dom";
import "../Styles/Places.css"; // Add custom styles for animations

const Places = () => {
  const [selectedCity, setSelectedCity] = useState("All");

  const cities = ["All", ...new Set(placesData.map((place) => place.city))];

  const filteredPlaces =
    selectedCity === "All"
      ? placesData
      : placesData.filter((place) => place.city === selectedCity);

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <section id="places">
      <div className="container p-5 px-lg-5 mt-5">
        <h1 className="text-center">
          <b>Visiting Places</b>
        </h1>
        <div className="mb-4">
          <label htmlFor="city-select" className="form-label">
            Select a City:
          </label>
          <select
            id="city-select"
            className="form-select"
            value={selectedCity}
            onChange={handleCityChange}
          >
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
          {filteredPlaces.map((place) => (
            <div className="col mb-5" key={place.id}>
              <div className="card h-100 place-card">
                {place.onSale && (
                  <div
                    className="badge bg-dark text-white position-absolute"
                    style={{ top: "0.5rem", right: "0.5rem" }}
                  >
                    Sale
                  </div>
                )}
                <img
                  className="card-img-top place-image"
                  src={place.image}
                  alt={place.name}
                />
                {/* Product details */}
                <div className="card-body p-4">
                  <div className="text-center">
                    {/* Product name */}
                    <h5 className="fw-bolder">{place.name}</h5>
                    {/* Product price */}
                    {place.onSale ? (
                      <>
                        <span className="text-muted text-decoration-line-through">
                          ${place.originalPrice}
                        </span>
                        ${place.salePrice}
                      </>
                    ) : (
                      `$${place.price}`
                    )}
                  </div>
                </div>
                {/* Product actions */}
                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                  <div className="text-center">
                    <Link
                      to={`/place/${place.id}`}
                      className="btn btn-outline-dark mt-auto place-btn"
                    >
                      View options
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Places;
