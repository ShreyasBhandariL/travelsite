/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState } from "react";

const Chatbot = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div
        id="chatBotBtn"
        className="chatBotIcon"
        onClick={openModal}
        style={styles.chatBotIcon}
      >
        <img
          src="https://img.icons8.com/ios-filled/50/ffffff/chat.png"
          alt="Chat Icon"
          style={styles.chatBotIconImage}
        />
      </div>

      {/* Modal Structure */}
      {isModalOpen && (
        <div id="chatbotModal" className="modal" style={styles.modal}>
          <div className="modal-content" style={styles.modalContent}>
            <span
              className="close-btn"
              onClick={closeModal}
              style={styles.closeBtn}
            >
              &times;
            </span>
            <iframe
              src="https://www.chatbase.co/chatbot-iframe/syPfXjXnIYpPgx_G0f3Ly"
              style={styles.iframe}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  modal: {
    display: "block",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
  modalContent: {
    position: "relative",
    margin: "5% auto",
    padding: 0,
    width: "50%",
    maxWidth: "600px",
    height: "80%",
    borderRadius: "8px",
    overflow: "hidden",
    marginRight: "10px",
    marginBottom: "10px",
  },
  closeBtn: {
    position: "absolute",
    top: "10px",
    right: "20px",
    fontSize: "24px",
    cursor: "pointer",
  },
  iframe: {
    width: "100%",
    height: "100%",
    border: "none",
  },
  chatBotIcon: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "60px",
    height: "60px",
    backgroundColor: "#0078d4",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
  },
  chatBotIconImage: {
    width: "32px",
    height: "32px",
  },
};

export default Chatbot;
