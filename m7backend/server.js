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
  // Connect to DB and run query
  connectDb(req.query).catch(console.error);
  async function connectDb(searchData) {
    // Connection details
    const uri = process.env.DB_KEY;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
      await client.connect();
      console.log("Database connection was successful!");
      console.log("Search parameters received from the frontend:");
      console.log(searchData);
      await searchListingDatabase(client, searchData); // Query to run
    } catch (err) {
      console.log(err);
    } finally {
      await client.close();
    }
  }

  // Actual query
  async function searchListingDatabase(
    client,
    { suburb, priceFrom, priceTo, date, leaseType } = {}
  ) {
    const cursor = client
      .db("reubens-first-db")
      .collection("mission7")
      .find({
        $or: suburb.map(JSON.parse),
        // $or: [{ addressSuburb: "Mount Roskill" }, { addressSuburb: "Mount Eden" }] // This is what the above looks like
        price: { $gte: Number(priceFrom), $lte: Number(priceTo) },
        dateAvailable: { $gte: new Date(date) },
        leaseType: leaseType,
      });

    const results = await cursor.toArray();
    res.status(200).send(results);
    results.forEach(function (property, i, arr) {
      console.log(`The query worked! It pulled out: ${property.addressStreet}`);
    });
  }
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
