const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const { MongoClient } = require("mongodb");
const cors = require("cors");

// Express Server Setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Server Connection Status -
app.get("/", (req, res) => {
  res.status(200).send("Server is connected yo");
});

app.get("/search", (req, res) => {
  async function connectDb(searchData) {
    // Connection details
    const uri = process.env.DB_KEY;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
      await client.connect();
      console.log("Database connection was successful!");
      // Run below query
      console.log(searchData);
      await findListingsWithAddressAndMinPrices(client, searchData);
    } catch (err) {
      console.log(err);
    } finally {
      await client.close();
    }
  }

  // Actual query
  async function findListingsWithAddressAndMinPrices(client, { suburb = "", priceFrom = 0 } = {}) {
    const cursor = client
      .db("reubens-first-db")
      .collection("mission7")
      .find({ addressSuburb: suburb, price: { $gte: priceFrom } });

    const results = await cursor.toArray();
    console.log(results);
    res.status(200).send(results);
    results.forEach(function (property, i, arr) {
      console.log(`Available: ${property.addressStreet}`);
    });
  }
  // Connect to DB and run query
  connectDb(req.query).catch(console.error);
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

//   // THIS QUERY FINDS ONE RESULT ONLY
//   async function findOneListing(client, suburbName) {
//     const result = await client
//       .db("reubens-first-db")
//       .collection("mission7")
//       .findOne({ addressSuburb: suburbName });
//     if (result) {
//       console.log(`Found a listing for ${suburbName}`);
//     } else {
//       console.log("nah!");
//     }
//   }
