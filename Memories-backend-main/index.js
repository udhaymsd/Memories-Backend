const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();

const postRoutes = require("./routes/posts");

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => app.listen(PORT, () => console.log(`server running on port ${PORT}`)))
    .catch((error) => console.log(error.message));

app.get("/", (req, res) => {
    res.send("Welcome to Memories Server");
})

app.use("/posts", postRoutes);