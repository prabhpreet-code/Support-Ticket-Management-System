const express = require("express");
const {
  createSupportAgentData,
} = require("../controllers/supportAgentController");
const router = express.Router();

router
  .route("/")
  //post support-agents data
  .post(createSupportAgentData);

module.exports = router;
