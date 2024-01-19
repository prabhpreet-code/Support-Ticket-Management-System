const express = require("express");
const supportAgentRoutes = require("../routes/supportAgentRoutes");
const supportTicketRoutes = require("../routes/supportTicketRoutes");

module.exports = function (app) {
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: false }));
  app.use("/api/support-agents", supportAgentRoutes); //support agent routes
  app.use("/api/support-tickets", supportTicketRoutes); //support ticket routes
};
