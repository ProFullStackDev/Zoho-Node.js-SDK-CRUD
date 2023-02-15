const express = require("express");
const router = express.Router();
const recordController = require("../controllers/RecordController");
const { Record } = require("../controllers/RecordController/testRecord");

// Import capitalize function
require("../utils/string");

// Module can be contacts or leads
router.get("/:module/", async (req, res) => {
  const module = req.params.module.capitalize();
  try {
    const records = await recordController.getRecords(module);
    res.status(200).json(records);
  } catch (error) {
    res.status(400).json({
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
    res.status(400).json({
      error: error.message,
    });
  }
});

router.get("/:module/update/:recordId", async (req, res) => {
  const module = req.params.module.capitalize();
  try {
    await recordController.updateRecord(module, req.params.recordId, req.query);
    res.status(200).json({
      success: "A record is updated successfully!",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

router.get("/:module/delete/:recordId", async (req, res) => {
  const module = req.params.module.capitalize();
  try {
    await recordController.deleteRecord(module, req.params.recordId);
    res.status(200).json({
      success: "A record is deleted successfully!",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

router.get("/:module/test", async (req, res) => {
  await Record.createRecords();
  res.status(200).json({
    success: "test record is executed successfully",
  });
});

module.exports = router;
