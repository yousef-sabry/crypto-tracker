import React, { useEffect, useState } from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { getMarketData } from "../../api/fetchData";
import "./Home.css";

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getMarketData();
        setData(result);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <section className="hero-section d-flex align-items-center">
      <div className="container hero-container">
        <div className="row align-items-center">
          
          <div className="col-lg-6 text-center text-lg-start hero-text">
            <h1 className="hero-title">Live Currency Rates</h1>
            <p className="hero-subtitle">
              Stay up-to-date with live currency exchange rates. Simple, fast, and always accurate.
            </p>

           
            <div className="social-icons mt-4 d-flex justify-content-center justify-content-lg-start gap-3">
              <a
                href="https://github.com/yousef-sabry"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#facc15", fontSize: "2rem" }}
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/yousef-sabry-b34a51245/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#facc15", fontSize: "2rem" }}
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* كروت العملات */}
          <div className="col-lg-6 d-flex flex-wrap justify-content-center hero-cards">
            {loading && <p>Loading...</p>}
            {!loading && !data && <p>Failed to load data.</p>}
            {!loading && data && data.rates && (
              <>
                <div className="info-card">
                  <h4>USD to EGP</h4>
                  <p>{data.rates.EGP ? data.rates.EGP.toFixed(2) : "-"} EGP</p>
                  <small>Last update: {data.lastUpdate}</small>
                </div>

                <div className="info-card">
                  <h4>SAR to EGP</h4>
                  <p>{data.rates.SAR ? (data.rates.EGP / data.rates.SAR).toFixed(2) : "-"} EGP</p>
                  <small>Last update: {data.lastUpdate}</small>
                </div>

                <div className="info-card">
                  <h4>KWD to EGP</h4>
                  <p>{data.rates.KWD ? (data.rates.EGP / data.rates.KWD).toFixed(2) : "-"} EGP</p>
                  <small>Last update: {data.lastUpdate}</small>
                </div>

                <div className="info-card">
                  <h4>EUR to EGP</h4>
                  <p>{data.rates.EUR ? (data.rates.EGP / data.rates.EUR).toFixed(2) : "-"} EGP</p>
                  <small>Last update: {data.lastUpdate}</small>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
