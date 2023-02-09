const Initializer = require("./initializer");
const express = require("express");
const cors = require("cors");
const PORT = 3030;

const contactRouter = require("./router/ContactRouter");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/contact", contactRouter);
Initializer.initialize();

app.listen(PORT, () => {
  console.log(`⚡Server started at ${PORT}`);
});
