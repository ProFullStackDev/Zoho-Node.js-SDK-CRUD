const express = require("express");
const router = express.Router();
const contactController = require("../controllers/ContactController");

router.get("/read", async (req, res) => {
  const contacts = await contactController.getContacts.Run();
  res.json(contacts);
});

router.get("/create", async (req, res) => {
  const result = await contactController.createContact.Run();
  res.json(result);
});


module.exports = router;
