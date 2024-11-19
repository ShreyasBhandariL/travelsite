/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleNameChange = (e) => {
    const value = e.target.value.replace(/[^A-Za-z\s]/g, ""); 
    if (value.length <= 30) {
      setName(value);
    }
  };

  const handleSubjectChange = (e) => {
    const value = e.target.value.replace(/[^A-Za-z0-9\s]/g, ""); // Allow only letters and numbers
    if (value.length <= 100) {
      setSubject(value);
    }
  };

  const handleMessageChange = (e) => {
    const value = e.target.value;
    if (value.length <= 1000) {
      setMessage(value);
      setErrorMessage(""); // Clear error message if within limit
    } else {
      setErrorMessage("messageCannot");
    }
  };

  const validateInputs = () => {
    if (!validateName(name)) {
      setErrorMessage(
        "Name should be up to 20 letters and contain no numbers."
      );
      return false;
    }
    if (!validateSubject(subject)) {
      setErrorMessage("Subject cannot contain special characters.");
      return false;
    }
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }
    if (!validateMessage(message)) {
      setErrorMessage("messageCannot");
      return false;
    }
    return true;
  };

  const sendContactDetails = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!validateInputs()) return; // Validate inputs before proceeding

    // Confirmation dialog
    const isConfirmed = window.confirm("Are You Sure");
    if (!isConfirmed) return; // If the user clicks "Cancel", stop the submission

    try {
      setLoader(true);
      const response = await fetch(`http://localhost:2000/contactUs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!response.ok) {
        const errorResult = await response.json();
        alert(
          errorResult.message || "An error occurred while sending the message."
        );
        return;
      }

      const result = await response.json();
      alert(result.message);
      resetForm();
    } catch (error) {
      alert("An error occurred while sending the message.");
      console.error("Error sending contact details:", error);
    } finally {
      setLoader(false);
    }
  };

  const validateName = (name) => /^[A-Za-z\s]{1,30}$/.test(name);
  const validateSubject = (subject) => /^[A-Za-z0-9\s]+$/.test(subject);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateMessage = (message) => message.length <= 1000;

  const resetForm = () => {
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setErrorMessage(""); // Clear error message
  };
 
    return (
      <section id="contact">
        <div className="container bg-light" data-aos="fade-up">
          <div className="section-title">
            <h2 className="text-center p-4">
              <b>Contact Us</b>
            </h2>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <iframe
                className="mb-4 mb-lg-0"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15556.268261446536!2d74.8368274!3d12.9034091!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba35b223a7ed603%3A0x34c90bd5c753d82b!2sDDPI%20DAKSHINA%20KANNADA!5e0!3m2!1sen!2sin!4v1727100270242!5m2!1sen!2sin"
                frameBorder="0"
                style={{ border: 0, width: "100%", height: "384px" }}
                allowFullScreen
                title="Google Maps"
              ></iframe>
            </div>

            <div className="col-lg-6">
              <form className="email-form" onSubmit={sendContactDetails}>
                <div className="row">
                  <div className="col-md-6 form-group">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      id="name"
                      placeholder="Name"
                      required
                      value={name}
                      onChange={handleNameChange}
                    />
                  </div>
                  <div className="col-md-6 form-group mt-3 mt-md-0">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      id="email"
                      placeholder="Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    name="subject"
                    id="subject"
                    placeholder="Subject"
                    required
                    value={subject}
                    onChange={handleSubjectChange}
                  />
                </div>
                <div className="form-group mt-3">
                  <textarea
                    className="form-control"
                    name="message"
                    rows="5"
                    placeholder="Message"
                    required
                    value={message}
                    onChange={handleMessageChange}
                  ></textarea>
                </div>
                {errorMessage && (
                  <div className="text-danger">{errorMessage}</div>
                )}
                <div className="my-3">
                  <div className="sent-message"></div>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary"
                                    disabled={loader}

                  >
                    {loader ? "Sending..." : "sendMessage"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
};

export default Contact;
