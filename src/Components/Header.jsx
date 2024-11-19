import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../Styles/Header.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [navBackground, setNavBackground] = useState(false);
  const [loginmodal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser); // Set user if available in localStorage
    }
    const handleScroll = () => {
      if (window.scrollY > 50) {
        // Adjust the scroll position as needed
        setNavBackground(true);
      } else {
        setNavBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:2000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const text = await response.json();

    if (response.status === 200) {
      const { password, ...userData } = text.data;
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData); // Update state with user data
      alert(text.message);
      setLoginModal(false);
    } else {
      alert("Registration failed: " + text);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, password);
    const response = await fetch("http://localhost:2000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const text = await response.json();
    if (response.ok) {
      alert(text.message);
      setRegisterModal(false);
      handleLoginSubmit(e);
    } else {
      alert("Registration failed: " + text);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        navBackground
          ? "navbar-light bg-light"
          : "navbar-transparent bg-transparent"
      }`}
    >
      <div className="container">
        <NavLink className="navbar-brand" to="">
          <i className="fas fa-plane me-2"></i>DreamTrip
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
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#Home">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#places">
                Discover
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact">
                Contact
              </a>
            </li>
          </ul>
          <div className="d-flex ms-3">
            {user ? (
              <>
                <span className="navbar-text me-3" style={{color:"blue"}}>Welcome, {user.name}</span>
                <button
                  className="btn btn-outline-danger"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn btn-outline-primary me-2"
                  onClick={() => setRegisterModal(true)}
                >
                  Register
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => setLoginModal(true)}
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {registerModal && (
        <div
          className="modal fade show"
          id="registerModal"
          tabIndex="-1"
          aria-labelledby="registerModalLabel"
          aria-hidden="true"
          style={{ display: "block" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="registerModalLabel">
                  Register
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setRegisterModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleRegisterSubmit}
                  >
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {loginmodal && (
        <div
          className="modal fade show"
          id="loginModal"
          tabIndex="-1"
          aria-labelledby="signInModalLabel"
          aria-hidden="true"
          style={{ display: "block" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="signInModalLabel">
                  Sign In
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setLoginModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleLoginSubmit}
                  >
                    Sign In
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
