const express = require("express");
const {
  createSupportTicketsData,
  getSupportTicketsData,
  resolveSupportTicketsDataById,
} = require("../controllers/supportTicketController");
const router = express.Router();

router
  .route("/")
  //post support-tickets data
  .post(createSupportTicketsData)
  //get support-tickets data
  .get(getSupportTicketsData);

router
  .route("/resolve/:id")
  //resolve support-tickets
  .post(resolveSupportTicketsDataById);

module.exports = router;
