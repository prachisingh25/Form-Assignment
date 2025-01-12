import React, { useState } from "react";
import Vendor from "./Vendor";
import Invoice from "./Invoice";
import Comments from "./Comments";
import "./VendorDetails.css";
import { GoArrowUp } from "react-icons/go";

function VendorDetails({ onLogout, username }) {
  const [tab, setTab] = useState(0);

  const tabs = [
    { name: "Vendor Details", content: <Vendor username={username} /> },
    { name: "Invoice Details", content: <Invoice username={username} /> },
    { name: "Comments", content: <Comments username={username} /> },
  ];

  const handleFileSelect = (e) => {
    const files = e.target.files;
    console.log("Files manually uploaded:", files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    console.log("Files dragged and dropped:", files);
  };

  return (
    <div className="vendor-details-container">
      <div className="header">
        <div className="back">
          <span className="back-arrow" onClick={onLogout}>
            ←
          </span>
          <span className="header-text">Create New Invoice</span>
        </div>
        <div className="tabs">
          {tabs.map((tb, ind) => (
            <span
              key={ind}
              className={`tab ${tab === ind ? "active-tab" : ""}`}
              onClick={() => setTab(ind)}
            >
              {tb.name}
            </span>
          ))}
        </div>
      </div>

      <div className="content-container">
        <div
          className="left-section"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="upload-area">
            <div className="head">Upload Your Invoice</div>
            <p className="para">To auto-populate fields and save time</p>
            <i className="upload-icon">📤</i>
            <button
              className="upload-btn"
              onClick={() => document.getElementById("file-upload").click()}
            >
              Upload File
              <GoArrowUp />
            </button>
            <div style={{ display: "none" }}>
              <input
                type="file"
                id="file-upload"
                multiple
                onChange={handleFileSelect}
              />
            </div>
            <p className="drag-text">
              <span className="click-text">Click to upload</span> or Drag and
              drop
            </p>
          </div>
        </div>

        <div className="right-section">
          <div className="tab-content">{tabs[tab].content}</div>
        </div>
      </div>
      <div className="logout">
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default VendorDetails;
