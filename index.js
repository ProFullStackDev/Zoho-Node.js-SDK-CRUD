const Initializer = require("./initializer");
const recordRouter = require("./router/RecordRouter");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3030;

app.use(cors());
app.use(express.json());
app.use("/", recordRouter);

// Initialize SDK to access the CRM services
Initializer.initialize();

app.listen(PORT, () => {
  console.log(`⚡Server started at ${PORT}`);
});
