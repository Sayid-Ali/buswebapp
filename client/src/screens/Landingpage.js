import React from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({
  duration: "2000",
});

function LandingPage() {
  return (
    <div className="">
      <div className="landing row justify-content-center text-center">
        <div className="col-md-9 my-auto">
          <h1 data-aos="zoom-in" className="zoom-in">
            Mumtaz Bus
          </h1>
          <h2 data-aos="zoom-out" className="zoom-out">
            We provide comfortable and affordable travel services.
          </h2>
          <Link to="/home">
            <button className="btn landingbtn">Signup Here</button>
          </Link>
        </div>
      </div>

      <section className="hero">
        <div className="container">
          <h2 className="text-center">Top travelled bus routes</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <div className="card-img">
                  <img src={require("../images/bus-2.jpg")} alt="" />
                </div>
                <div className="card-title-overlay">
                  <h5 className="card-title">Nairobi City</h5>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card" data-aos="fade-up">
                <div className="card-img">
                  <img src={require("../images/mandera.jpg")} alt="" />
                </div>
                <div className="card-title-overlay">
                  <h5 className="card-title">Mandera City</h5>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-img">
                  <img src={require("../images/nairobi.jpg")} alt="" />
                </div>
                <div className="card-title-overlay">
                  <h5 className="card-title">Wajir City</h5>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card">
                <div className="card-img">
                  <img src={require("../images/bus-2.jpg")} alt="" />
                </div>
                <div className="card-title-overlay">
                  <h5 className="card-title">Isiolo City</h5>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-img">
                  <img src={require("../images/nbo-2.jpg")} alt="" />
                </div>
                <div className="card-title-overlay">
                  <h5 className="card-title">Garissa City</h5>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-img">
                  <img src={require("../images/G-1.jpg")} alt="" />
                </div>
                <div className="card-title-overlay">
                  <h5 className="card-title">Elwak</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <h4>MumtazBus</h4>
              <p id="about1">
                Mumtaz Bus is a transportation company that provides comfortable
                and affordable travel services. Book with us.
              </p>
            </div>
            <div className="col-md-3">
              <h4 className="contact">company</h4>
              <ul>
                <li>About</li>
                <li>Contact</li>
                <li>Offers</li>
              </ul>
            </div>
            <div className="col-md-3">
              <h4>Information</h4>
              <ul>
                <li>Privacy</li>
                <li>Operator</li>
                <li>Admin</li>
              </ul>
            </div>
            <div className="col-md-3">
              <h4>Support</h4>
              <ul>
                <li>Help</li>
                <li>Email</li>
                <li>Social media</li>
              </ul>
            </div>
            <hr />
            <h5 className="reserved">
              &copy;2023 MumtazBus. All Right Reserved
            </h5>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
