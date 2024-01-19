const mongoose = require("mongoose");

const SupportTicketSchema = mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    severity: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    assignedTo: {
      type: String,
    },
    dateCreated: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    resolvedOn: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("support-ticket", SupportTicketSchema);
