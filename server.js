const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3002;
require("dotenv").config();

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/dist"));
}

// Add routes, both API and view
const pathToFile = path.resolve(__dirname, "./client/public/");
app.use(express.static(pathToFile));

app.use(routes);

app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);
