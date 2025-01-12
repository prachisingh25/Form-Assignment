import React, { useState, useEffect } from "react";
import "./Vendor.css";

function Vendor({ username }) {
  const [vendor, setVendor] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedVendorData = JSON.parse(
      localStorage.getItem(`${username}-vendorData`)
    );
    if (storedVendorData) {
      setVendor(storedVendorData.vendor);
      setAddress(storedVendorData.address);
    }
  }, [username]);

  const handleVendorChange = (e) => {
    setVendor(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!vendor || !address) {
      setError("Both Vendor and Address are required!");
      return;
    }

    const vendorData = {
      vendor,
      address,
    };
    localStorage.setItem(`${username}-vendorData`, JSON.stringify(vendorData));

    alert("Data saved successfully!");
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className="hea">Vendor Details</h1>
      </div>
      <h3 className="vendorinfo">Vendor Information</h3>

      <p className="small">
        Vendor <span className="asterisk">*</span>
      </p>
      <select
        className="vendor-select"
        value={vendor}
        onChange={handleVendorChange}
      >
        <option value="A-1 Exterminators">A-1 Exterminators</option>
        <option value="Tech Solutions">Tech Solutions</option>
        <option value="Global Enterprises">Global Enterprises</option>
        <option value="Innovative Services">Innovative Services</option>
      </select>

      <p className="small">
        Address <span className="asterisk">*</span>
      </p>
      <input
        type="text"
        className="address-input"
        placeholder="Enter Vendor Address"
        value={address}
        onChange={handleAddressChange}
      />

      <div className="detail">
        <span className="arrow">^</span> View Vendor Details
      </div>
      {error && <p className="error-message">{error}</p>}
      <div className="button-group">
        <button type="button" className="save-draft-btn" onClick={handleSubmit}>
          Save as Draft
        </button>
        <button type="submit" className="submit-new-btn" onClick={handleSubmit}>
          Submit & New
        </button>
      </div>
    </div>
  );
}

export default Vendor;
