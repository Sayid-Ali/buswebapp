import React from "react";
import { Link } from "react-router-dom";

function landingpage() {
  return (
    <div className="row landing">
      <div className="col-md-12 text-center">
        <h1 style={{ color: "white", fontSize: "120px" }}>Mumtaz Bus</h1>
        <h2 style={{ color: "white" }}>travel with comfortable seat</h2>
        <Link to="/home">
          <button className="btn landingbtn" style={{ color: "black" }}>
            {" "}
            Get started
          </button>
        </Link>
      </div>
    </div>
  );
}

export default landingpage;
