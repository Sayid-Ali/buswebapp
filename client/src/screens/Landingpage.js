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
          <h1 style={{ color: "white", fontSize: "130px" }} data-aos="zoom-in">
            Mumtaz Bus
          </h1>
          <h2 style={{ color: "white" }} data-aos="zoom-out">
            We provide comfortable and affordable travel services.
          </h2>
          <Link to="/home">
            <button className="btn landingbtn">Get started</button>
          </Link>
        </div>
      </div>

      <section className="features">
        <div className="container">
          <h2 className="text-center">Top travelled bus routes</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="card" data-aos="fade-up">
                <div className="card-body">
                  <h5 className="card-title">Nairobi City to Mandera</h5>
                  <p className="card-text">Route description goes here.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card" data-aos="fade-up">
                <div className="card-body">
                  <h5 className="card-title">Mandera to Nairobi</h5>
                  <p className="card-text">Route description goes here.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card" data-aos="fade-up">
                <div className="card-body">
                  <h5 className="card-title">Wajir to Nairobi</h5>
                  <p className="card-text">Route description goes here.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card" data-aos="fade-up">
                <div className="card-body">
                  <h5 className="card-title">Elwak to Nairobi</h5>
                  <p className="card-text">Route description goes here.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card" data-aos="fade-up">
                <div className="card-body">
                  <h5 className="card-title">Garissa to Nairobi</h5>
                  <p className="card-text">Route description goes here.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card" data-aos="fade-up">
                <div className="card-body">
                  <h5 className="card-title">Kisumu to Nairobi</h5>
                  <p className="card-text">Route description goes here.</p>
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
              <h4>About</h4>
              <p>
                Mumtaz Bus is a transportation company that provides comfortable
                and affordable travel services. Book with us.
              </p>
            </div>
            <div className="col-md-3">
              <h4 className="contact">Contact Us</h4>
              <p>
                You can contact us at our head office in Nairobi
                <br />
                P.O. Box 8269-00610 or by email at info@mumtazbus.com.
              </p>
            </div>
            <div className="col-md-3">
              <h4>Popular Destinations</h4>
              <ul>
                <li>Nairobi</li>
                <li>Garissa</li>
                <li>Elwak</li>
                <li>Mandera</li>
                <li>Wajir</li>
              </ul>
            </div>
            <div className="col-md-3">
              <h4>Top Routes</h4>
              <ul>
                <li>Nairobi City to Mandera</li>
                <li>Mandera to Nairobi</li>
                <li>Wajir to Nairobi</li>
                <li>Elwak to Nairobi</li>
                <li>Garissa to Nairobi</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
