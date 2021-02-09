const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 8080;
const cors = require('cors');
const app = express();
const eventsRoute = require('./routes/events');
const { writeLogs } = require('./middlewares/logs');

// Requiring dotenv package for using environment variables from .env file while development
require("dotenv").config()

// Config cors middleware it to allow access from frontend
app.use(cors({origin: process.env.FRONTEND || 'http://localhost:3000'}));

// Config custom middleware for console requests ips by time
app.use(writeLogs);

// Using body parser to support parsing of application/json type post data and parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routing for the events api
app.use('/event', eventsRoute);

// Running the app on specified port with express.
app.listen(port, () => console.log(`Listening on port ${port}`));