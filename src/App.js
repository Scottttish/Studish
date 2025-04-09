import React from "react";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import Description from "./components/Description";
import Statistics from "./components/Statistics";
import Receipt from "./components/Receipt";
import Reviews from "./components/Reviews";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import "./styles/App.css";

function App() {
  return (
    <div className="App">
      <Navigation />
      <div id="home">
        <HeroSection />
      </div>
      <div id="about">
        <Description />
      </div>
      <div id="statistics">
        <Statistics />
      </div>
      <div id="receipt">
        <Receipt />
      </div>
      <div id="reviews">
        <Reviews />
      </div>
      <div id="faq">
        <FAQ />
      </div>
      <Footer />
    </div>
  );
}

export default App;
