const express = require("express");

const app = express();

require("dotenv").config();

let userRoutes = require('./routes/userRoutes');

let gameStateRoutes = require ('./routes/gameStateRoutes')

let dbConnect = require("./dbConnect");

// parse requests of content-type - application / json;
app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "Welcome to mySQL application." });
});

app.use('/api/users', userRoutes);
app.use('/api/gameStates', gameStateRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port
${PORT}.`);
});
