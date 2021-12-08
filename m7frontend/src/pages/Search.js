import banner from "../assets/Search/banner.png";
import { useState } from "react";
import axios from "axios";
import "./Search.css";

const Search = () => {
  const [suburb, setSuburb] = useState("");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [results, setResults] = useState([]);
  const [date, setDate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const searchData = {
      suburb,
      priceFrom,
      priceTo,
      date,
    };
    console.log(searchData);

    axios
      .get(`http://localhost:5000/search`, { params: searchData })

      .then(function (response) {
        if (response.status === 200) {
          // setInputs({});
          setResults(response);
        } else {
          console.log(response);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  console.log(results.data);
  return (
    <div className="search-container">
      <div className="search-banner-container">
        <img src={banner} className="search-banner" />
      </div>
      <div className="search-main-container">
        <div className="search-mainleft">
          <div className="search-sortbar">
            <h2>x Properties</h2>
            <h3>Sort by: New</h3>
          </div>
          <div className="search-results">
            RESULTS
            {results.data
              ? results.data.map(function (property, i, arr) {
                  return (
                    <div className="search-results-container">
                      <div className="search-result-pic">
                        <img width="200px" src={property.image} />
                      </div>
                      <div className="search-result-info">
                        {property.addressStreet}, Date: {property.dateAvailable}
                      </div>
                    </div>
                  );
                })
              : "nada"}
          </div>
        </div>
        <div className="search-mainright">
          <div className="search-mainright-title">
            <h2>Edit your search</h2>
          </div>

          <div className="search-form-row">
            <div className="search-title-section">
              <input type="radio" value="rent" name="search-type"></input>
              <h2>Rent</h2>
            </div>
            <div className="search-title-section">
              <input type="radio" value="short" name="search-type"></input>
              <h2>Short Let</h2>
            </div>
          </div>
          <div className="search-form-row">
            <div>
              <p>Suburb</p>
            </div>
            <div>
              <input
                type="textbox"
                value={suburb}
                onChange={(e) => {
                  setSuburb(e.target.value);
                }}
                name="suburb"
              ></input>
            </div>
          </div>
          <div className="search-form-row">
            <div>
              <p>Price</p>
            </div>
            <div>
              <input
                type="textbox"
                // value={inputs.price || ""}
                onChange={(e) => {
                  setPriceFrom(e.target.value);
                }}
                name="price"
              ></input>
              <input
                type="textbox"
                // value={inputs.price || ""}
                onChange={(e) => {
                  setPriceTo(e.target.value);
                }}
                name="price"
              ></input>
            </div>
          </div>
          <div className="search-form-row">
            <div>
              <p>Beds- not configured yet and below</p>
            </div>
            <div>
              <select>
                {/* onChange={handleChange} name="beds"> */}
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
          </div>
          <div className="search-form-row">
            <div>
              <p>Availability</p>
            </div>
            <div>
              <input
                type="date"
                // value={inputs.availability || ""}
                onChange={(e) => {
                  setDate(new Date(e.target.value).toISOString());
                }}
                name="availability"
              ></input>
            </div>
          </div>
          <div className="search-form-row">
            <div>
              <p>Special Features</p>
            </div>
            <div>
              <select
                multiple="true"
                // value={inputs.specialFeatures || ""}
                // onChange={handleChange}
                name="specialFeatures"
              >
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="hamster">Hamster</option>
              </select>
            </div>
          </div>
          <div className="search-form-row">
            <div>
              <p>Property Type</p>
            </div>
            <div>
              <input
                type="textbox"
                // value={inputs.propertyType || ""}
                // onChange={handleChange}
                name="propertyType"
              ></input>
            </div>
          </div>
          <div className="search-form-submit">
            <div>
              <p>IMG-left</p>
            </div>
            <div>
              <input type="submit" value="View" onClick={handleSubmit} name="submit"></input>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
