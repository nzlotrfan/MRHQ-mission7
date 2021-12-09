import banner from "../assets/Search/banner.png";
import downarrow from "../assets/Search/downcheveron-btn.png";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Search.css";
import QuickSortLowHigh from "../functions/QuickSortLowHigh";
import QuickSortHighLow from "../functions/QuickSortHighLow";

const Search = () => {
  const [suburb, setSuburb] = useState("");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [results, setResults] = useState();
  const [date, setDate] = useState("");
  const [sortRerender, setSortRerender] = useState("");
  const [currentSort, setCurrentSort] = useState("");
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
          setResults(response.data);
          console.log("Received below from backend:");
          console.log(response.data);
        } else {
          console.log(response);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleSort = (e) => {
    if (results) {
      setCurrentSort(e.target.name);
      console.log(e.target.name);
      if (e.target.name === "Price (low to high)") {
        const lowHighResults = QuickSortLowHigh(results);
        setResults(lowHighResults);
        setSortRerender([...sortRerender, "rerendered"]);
      } else if (e.target.name === "Price (high to low)") {
        const highLowResults = QuickSortHighLow(results);
        setResults(highLowResults);
        setSortRerender([...sortRerender, "rerendered"]);
      }
    } else {
      alert("Make a search first!");
    }
  };

  let current = new Date();
  current.setDate(current.getDate() - 10);
  // current.toISOString();
  const listingDate = new Date("2021-12-05");
  console.log(listingDate > current ? "NEW!" : "more than 30 days old");
  console.log(`listingDate: ${listingDate}`);
  console.log(`current: ${current}`);
  return (
    <div className="search-container">
      <div className="search-banner-container">
        <img src={banner} className="search-banner" />
      </div>
      <div className="search-main-container">
        <div className="search-mainleft">
          <div className="search-sortbar">
            <h2>
              {results ? `${results.length} ` : "x"}
              {results?.length > 1 ? "Properties" : "Property"}
            </h2>

            <div className="search-sort-menu-section">
              <h3>Sort by:</h3>
              <div className="search-dropdown">
                <button className="search-dropbtn">
                  <h3>{currentSort || "Default"}</h3>
                  <img width="30px" src={downarrow}></img>
                </button>
                <div className="search-dropdown-content">
                  <a onClick={handleSort} name="Price (low to high)">
                    Price (low to high)
                  </a>
                  <a onClick={handleSort} name="Price (high to low)">
                    Price (high to low)
                  </a>
                </div>
              </div>
              {/* <div className="search-sort-menu-box">SORTMENU</div> */}
            </div>
          </div>
          <div className="search-results-container">
            {results
              ? results.map(function (property, i, arr) {
                  return (
                    <div key={i} className="search-result-container">
                      <div className="search-result-pic-wrapper">
                        <img className="search-result-pic" width="100%" src={property.image} />
                        <div className="search-result-pic-ribbon-wrapper">
                          <div className="search-result-pic-ribbon">New</div>
                        </div>
                      </div>
                      <div className="search-result-info">
                        {property.addressStreet}, Date: {property.dateAvailable.slice(0, 10)}, $
                        {property.price}
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
                multiple={true}
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
