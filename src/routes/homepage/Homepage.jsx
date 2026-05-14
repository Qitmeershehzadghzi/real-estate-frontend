import React from "react";
import "./homePage.scss";
import SearchBar from "../../components/searchBar/SearchBar";

const Homepage = () => {
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">
            Find real estate & get your dream place
          </h1>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim animi tempore est mollitia, odit necessitatibus quasi officia asperiores itaque voluptatibus dolorem cum dignissimos eum? Placeat!</p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>years of experience</h2>
            </div>
             <div className="box">
              <h1>200</h1>
              <h2>Award Gained</h2>
            </div>
             <div className="box">
              <h1>2000</h1>
              <h2>Property ready</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="imgContainer">
        <img src="/bg.png" alt="background" />
      </div>
    </div>
  );
};

export default Homepage;