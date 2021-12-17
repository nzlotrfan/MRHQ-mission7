import banner from "../assets/Search/banner.png";
import downarrow from "../assets/Search/downcheveron-btn.png";
import availability from "../assets/Search/availability.png";
import bathrooms from "../assets/Search/bathrooms.png";
import beds from "../assets/Search/beds.png";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Search.css";
import QuickSortLowHigh from "../functions/QuickSortLowHigh";
import QuickSortHighLow from "../functions/QuickSortHighLow";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const Search = () => {
  const [suburb, setSuburb] = useState([]);
  const [priceFrom, setPriceFrom] = useState(0);
  const [priceTo, setPriceTo] = useState(2000);
  const [leaseType, setLeaseType] = useState("rent");
  const [results, setResults] = useState();
  const [date, setDate] = useState("");
  const [sortRerender, setSortRerender] = useState("");
  const [currentSort, setCurrentSort] = useState("");
  const [test, setTest] = useState();

  console.log(test);
  const handleSelectSuburb = (e) => {
    const selectedSuburbs = [];
    const selectionArray = {
      selectedSuburbs: Array.from(e.target.selectedOptions, (item) => item.value),
    };

    selectionArray.selectedSuburbs.forEach(function (selectedSuburb) {
      const selectedSuburbAsObject = { addressSuburb: selectedSuburb };
      selectedSuburbs.push(selectedSuburbAsObject);
    });
    setSuburb(selectedSuburbs);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const searchData = {
      suburb,
      priceFrom,
      priceTo,
      date,
      leaseType,
    };
    console.log(searchData);
    axios
      .get(`https://reubentestbackend.herokuapp.com/search`, { params: searchData })

      .then(function (response) {
        if (response.status === 200) {
          setResults(response.data);
          setCurrentSort("Default");
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
      console.log(`Sorted result by: ${e.target.name}`);
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

  // If listing was created within last 30 days, then add a "NEW" banner
  let oneMonthAgoDate = new Date();
  let todaysDate = oneMonthAgoDate.toISOString();
  oneMonthAgoDate.setDate(oneMonthAgoDate.getDate() - 30);
  oneMonthAgoDate = new Date(oneMonthAgoDate).toISOString();

  const top100Films = [
    { addressSuburb: "Mount Roskill" },
    { addressSuburb: "Mount Eden" },
    { addressSuburb: "Eden Terrace" },
    { addressSuburb: "Northcote" },
  ];

  return (
    <div className="search-container">
      <div className="search-banner-container">
        <img src={banner} className="search-banner" />
      </div>
      <div className="search-main-container">
        <div className="search-mainleft">
          <div className="search-sortbar">
            <h2>
              {results ? `${results.length} ` : "Search for a "}
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
            </div>
          </div>
          <div className="search-results-container">
            {results
              ? results.map(function (property, i, arr) {
                  return (
                    <div key={i} className="search-result-container">
                      <div className="search-result-pic-wrapper">
                        <img className="search-result-pic" width="100%" src={property.image} />
                        <div
                          className={
                            property.dateListed < oneMonthAgoDate
                              ? "search-result-pic-ribbon-wrapper hideRibbon"
                              : "search-result-pic-ribbon-wrapper"
                          }
                        >
                          <div className="search-result-pic-ribbon">New</div>
                        </div>
                      </div>
                      <div className="search-result-info">
                        <p className="search-result-title">
                          {property.addressStreet}, {property.addressSuburb}
                        </p>
                        <p className="search-result-propertyType">
                          {property.propertyType.toUpperCase()}
                        </p>
                        <div className="search-refinements-container">
                          <div className="search-bedrooms">
                            <img className="icons" src={beds} height="25px"></img>
                            <p className="icons">Bedrooms</p>
                            <p className="icons">{property.bedrooms}</p>
                          </div>
                          <div className="search-bathrooms">
                            <img className="icons" src={bathrooms} height="25px"></img>
                            <p className="icons">Bathrooms</p>
                            <p className="icons">{property.bathrooms}</p>
                          </div>
                          <div className="search-availability">
                            <img className="icons" src={availability} height="25px"></img>
                            <p className="icons">Availability</p>
                            <p className="icons datecolour">
                              {property.dateAvailable >= todaysDate
                                ? new Date(property.dateAvailable)
                                    .toString()
                                    .slice(4, 10)
                                    .split(" ")
                                    .reverse()
                                    .join(" ")
                                : "Now"}
                            </p>
                          </div>
                          <div className="search-price">${property.price} per week</div>
                        </div>
                      </div>
                    </div>
                  );
                })
              : "Make a new search -->"}
          </div>
        </div>
        <div className="search-mainright">
          <div className="search-mainright-title">
            <h2>Edit your search</h2>
          </div>

          <div className="search-form-row">
            <div className="search-title-section">
              <label>
                <input
                  type="radio"
                  onChange={() => {
                    setLeaseType("rent");
                  }}
                  defaultChecked="true"
                  value="rent"
                  name="leaseType"
                ></input>
                <h2>Rent</h2>
              </label>
            </div>
            <div className="search-title-section">
              <label>
                <input
                  type="radio"
                  onChange={() => {
                    setLeaseType("short");
                  }}
                  value="short"
                  name="leaseType"
                ></input>
                <h2>Short Let</h2>
              </label>
            </div>
          </div>
          <div className="search-form-row">
            {/* SUBURB STARTS HERE ----------------- */}
            <div>
              <p>Suburbyoe</p>
            </div>
            <div>
              <select
                onChange={(e) => handleSelectSuburb(e)}
                className="search-text-field"
                multiple={true}
              >
                <option value="Mount Roskill">Mount Roskill</option>
                <option value="Mount Eden">Mount Eden</option>
                <option value="Northcote">Northcote</option>
              </select>
              {/* size={"small"}
                onChange={(e, value) => {
                  setTest(value);
                }}
                isOptionEqualToValue={(option, value) => option.title === value.title} */}
              <Autocomplete
                multiple
                size={"small"}
                onChange={(e, value) => {
                  setSuburb(value);
                }}
                isOptionEqualToValue={(option, value) =>
                  option.addressSuburb === value.addressSuburb
                }
                id="checkboxes-tags-demo"
                options={top100Films}
                disableCloseOnSelect
                getOptionLabel={(option) => option.addressSuburb}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.addressSuburb}
                  </li>
                )}
                style={{ width: 200 }}
                renderInput={(params) => (
                  <TextField {...params} label="Checkboxes" placeholder="Favorites" />
                )}
              />

              {/* <input
                type="textbox"
                className="search-text-field"
                value={suburb}
                onChange={(e) => {
                  setSuburb(e.target.value);
                }}
                name="suburb"
              ></input> */}
            </div>
          </div>
          <div className="search-form-row">
            <div>
              <p>Price</p>
            </div>
            <div>
              <input
                type="textbox"
                className="search-price-field"
                // value={inputs.price || ""}
                onChange={(e) => {
                  setPriceFrom(e.target.value);
                }}
                name="price"
              ></input>
              <input
                type="textbox"
                className="search-price-field"
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
              <p>Beds</p>
            </div>
            <div>
              <select className="search-text-field">
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
                className="search-text-field"
                // value={inputs.availability || ""}
                onChange={(e) => {
                  setDate(e.target.value);
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
                multiple={false}
                className="search-text-field"
                // value={inputs.specialFeatures || ""}
                // onChange={handleChange}
                name="specialFeatures"
              >
                <option>Select Below</option>
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
              <select
                multiple={false}
                className="search-text-field"
                // value={inputs.specialFeatures || ""}
                // onChange={handleChange}
                name="propertyType"
              >
                <option>Select Below</option>
                <option value="cat">Cat</option>
                <option value="hamster">Hamster</option>
              </select>
            </div>
          </div>
          <div className="search-form-submit">
            <div>
              <p></p>
            </div>
            <div>
              <input
                className="search-sub-btn"
                type="submit"
                value="View"
                onClick={handleSubmit}
                name="submit"
              ></input>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
