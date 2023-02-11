const express = require("express");
const router = express.Router();
const recordController = require("../controllers/RecordController");

// Import capitalize function
require("../utils/string");

// Module can be contacts or leads
router.get("/:module/", async (req, res) => {
  const module = req.params.module.capitalize();
  try {
    const records = await recordController.getRecords(module);
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

router.get("/:module/create", async (req, res) => {
  const module = req.params.module.capitalize();
  try {
    await recordController.createRecord(module, req.query);
    res.status(200).json({
      success: "A record is created successfully!",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;
