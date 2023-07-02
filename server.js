const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors()); // Enable CORS for all routes

require("dotenv").config(); // added

const dbConfig = require("./config/dbConfig");
const port = process.env.PORT || 5000;

app.use(express.json());

const usersRoute = require("./routes/usersRoute");
const busesRoute = require("./routes/busesRoute");
const bookingsRoute = require("./routes/BookingsRoute");
const feedbackRoute = require("./routes/feedbackRoute"); // Added
app.use("/api/users", usersRoute);
app.use("/api/buses", busesRoute);
app.use("/api/bookings", bookingsRoute);
app.use("/api", feedbackRoute); // Added

app.listen(port, () => console.log(`Node server listening on port ${port}!`));
