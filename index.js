require("dotenv").config();
const Initializer = require("./initializer");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
