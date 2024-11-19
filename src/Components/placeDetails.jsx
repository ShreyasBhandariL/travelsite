import React, { useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import placesData from "./placeData"; // Adjust the path as needed
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../Styles/Header.css";
import Footer from "./Footer";

const PlaceDetails = () => {
  const { id } = useParams();
  const place = placesData.find((place) => place.id === parseInt(id));

  const [numPeople, setNumPeople] = useState(1);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [days, setDays] = useState(1);

  if (!place) {
    return <h2>Place not found</h2>;
  }

  // Calculate the number of days between check-in and check-out
  const handleCheckOutChange = (e) => {
    const checkOut = new Date(e.target.value);
    setCheckOutDate(checkOut.toISOString().split("T")[0]);

    if (checkInDate) {
      const checkIn = new Date(checkInDate);
      const diffTime = Math.abs(checkOut - checkIn);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDays(diffDays);
    }
  };

  const handleBookNow = async () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) {
      alert("You must be logged in to make a booking.");
      return;
    }
      const bookingData = {
        userId: userData._id,
        placeId: place.id,
        placeName: place.name,
        numPeople,
        checkInDate,
        checkOutDate,
        days,
      };

    // Send the booking data to the backend (replace with actual API endpoint)
    await fetch("http://localhost:2000/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Booking Successful", data);
        alert("Booking Successful!");
      })
      .catch((error) => {
        console.error("Error during booking:", error);
        alert("There was an issue with your booking. Please try again.");
      });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <NavLink className="navbar-brand" style={{paddingLeft:"50px"}} to={"/"}>
          <i className="fas fa-plane"></i> My Dream Place
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </nav>

      <section className="py-5 bg-light">
        <div className="container px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-center">
            {/* Image Section */}
            <div className="col-md-6">
              <div className="card shadow-lg rounded overflow-hidden">
                <img
                  className="card-img-top mb-5 mb-md-0"
                  src={place.image}
                  alt={place.name}
                  style={{ objectFit: "cover", height: "400px" }}
                />
              </div>
            </div>

            {/* Details Section */}
            <div className="col-md-6">
              <h1 className="display-4 fw-bolder text-primary">{place.name}</h1>
              <p className="lead text-muted mb-4">{place.description}</p>

              <div className="fs-5 mb-5">
                {place.onSale ? (
                  <>
                    <span className="text-decoration-line-through text-danger">
                      ${place.originalPrice}
                    </span>{" "}
                    <span className="text-success">${place.salePrice}</span>
                  </>
                ) : (
                  <span className="text-primary">${place.price}</span>
                )}
              </div>

              {/* Number of people input */}
              <div className="mb-3">
                <label htmlFor="numPeople" className="form-label">
                  Number of People
                </label>
                <input
                  type="number"
                  id="numPeople"
                  className="form-control"
                  min="1"
                  value={numPeople}
                  onChange={(e) => setNumPeople(e.target.value)}
                />
              </div>

              {/* Check-in date input */}
              <div className="mb-3">
                <label htmlFor="checkInDate" className="form-label">
                  Check-in Date
                </label>
                <input
                  type="date"
                  id="checkInDate"
                  className="form-control"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                />
              </div>

              {/* Check-out date input */}
              <div className="mb-3">
                <label htmlFor="checkOutDate" className="form-label">
                  Check-out Date
                </label>
                <input
                  type="date"
                  id="checkOutDate"
                  className="form-control"
                  value={checkOutDate}
                  onChange={handleCheckOutChange}
                />
              </div>

              {/* Days duration */}
              <div className="mb-3">
                <label htmlFor="days" className="form-label">
                  Duration (Days)
                </label>
                <input
                  type="number"
                  id="days"
                  className="form-control"
                  value={days}
                  disabled
                />
              </div>

              <button
                className="btn btn-success flex-shrink-0"
                type="button"
                onClick={handleBookNow}
                style={{
                  fontSize: "1.1rem",
                  padding: "0.8rem 1.5rem",
                }}
              >
                <i className="bi-cart-fill me-1"></i> Book Now
              </button>
            </div>
          </div>
        </div>
      </section>
    <Footer />
      
    </>
  );
};

export default PlaceDetails;
