const mongoose = require("mongoose");

const SupportAgentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
  dateCreated: {
    type: Date,
  },
});

module.exports = mongoose.model("support-Agent", SupportAgentSchema);
