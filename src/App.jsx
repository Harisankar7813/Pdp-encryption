import React, { useState, useEffect } from 'react';
import "./App.css";
import CryptoJS from "crypto-js";

const SECRET_PASS = "XkhZG4fW2t2W"

function App() {
  const [text, setText] = useState("");
  const [screen, setScreen] = useState("encrypt");
  const [errorMessage, setErrorMessage] = useState("");
  const [encryptedData, setEncryptedData] = useState("");
  const [decryptedData, setDecryptedData] = useState("");

  const switchScreen = (type) => {
    setScreen(type);
    setText("");
    setEncryptedData("");
    setDecryptedData("");
    setErrorMessage("");
  };

  const encryptData = () => {
    try {
      const data = CryptoJS.AES.encrypt(
        JSON.stringify(text),
        SECRET_PASS
      ).toString();
      setEncryptedData(data);
      setErrorMessage("");
    }
    catch (error) {
      setErrorMessage("Encryption failed. Please check your input.")
    }
  }

  const decryptData = () => {
    try {
      const bytes = CryptoJS.AES.decrypt(text, SECRET_PASS);
      const data = bytes.toString(CryptoJS.enc.Utf8);
      setDecryptedData(data);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Decryption failed. Please check your input.");
    }
  }

  const handleClick = () => {
    if (!text) {
      setErrorMessage("Please enter some text.")
      return;
    }

    if (screen === "encrypt") {
      encryptData();
    } else {
      decryptData();
    }
  }

  useEffect(() => {
    if (screen === "encrypt") {
      encryptData();
    } else {
      decryptData();
    }
  }, [screen]);

  return (
    <div className='container'>
      <div>
        <button className={`btn btn-left ${screen === "encrypt" ? "active" : ""}`}
          onClick={() => { switchScreen("encrypt") }}>Encrypt</button>
        <button className={`btn btn-right ${screen === "decrypt" ? "active" : ""}`}
          onClick={() => { switchScreen("decrypt") }}>Decrypt</button>
      </div>
      <div className='card'>
        <textarea value={text}
          onChange={({ target }) => setText(target.value)}
          placeholder={screen === 'encrypt' ? 'Enter Your Text' : "Enter Encrypted Data"} />

        {errorMessage && <div className='error'>{errorMessage}</div>}

        <button
          className={`btn submit-btn ${screen === "encrypt" ? "encrypt-btn" : "decrypt-btn"}`}
          onClick={handleClick}>
          {screen === 'encrypt' ? "Encrypt" : "Decrypt"}
        </button>
      </div>
      {(encryptedData || decryptedData) && (
        <div className='content'>
          <label>{screen === 'encrypt' ? "ENCRYPTED" : "Decrypted"} DATA</label>
          <p>{screen === "encrypt" ? encryptedData : decryptedData}</p>
        </div>
      )}
    </div>
  );
}

export default App;
