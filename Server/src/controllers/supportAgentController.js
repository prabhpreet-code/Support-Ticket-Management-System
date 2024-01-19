const { SERVER_ERROR } = require("../errors/SERVER_ERROR");
const supportAgentModel = require("../models/supportAgentModel");
var mongodb = require("mongodb");
const Joi = require("joi");
var mongoDbQueue = require("@openwar/mongodb-queue");

const client = new mongodb.MongoClient(process.env.MONGODB_URL);
const db = client.db("test");

//@desc Create a Support Agent
//@route POST /api/support-agents
//@access public
exports.createSupportAgentData = async (req, res) => {
  try {
    const { email, phone, name, description } = req.body;

    if (!name || !email || !phone || !description) {
      res.status(400).send({
        success: false,
        code: 400,
        message: "All Fields are mandatory",
      });
    }

    //validate all params
    const { error } = createSupportAgentSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json(error);
    }

    // check if support agent already exists
    const supportAgentAvailable = await supportAgentModel.findOne({ email });
    if (supportAgentAvailable) {
      res.status(400).send({
        success: false,
        code: 400,
        message: "Support Agent already registered",
      });
    }

    // create new support agent
    const supportAgent = await supportAgentModel.create({
      email,
      phone,
      name,
      description,
      active: true,
      dateCreated: new Date(),
    });

    // Add new agent to the queue
    const queue = await mongoDbQueue(db, "agent-queue");
    const id = await queue.add({
      id: String(supportAgent._id),
      active: supportAgent.active,
    });

    res.status(200).json({
      status: true,
      supportAgent,
      msg: "New Support Agent registered successfully",
    });
  } catch (error) {
    console.log(error); // Log any errors
    res.status(500).send({ success: false, message: SERVER_ERROR }); // Send a server error response
  }
};

//@access private
// validation of support agent
const createSupportAgentSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "any.required": "Name is required.",
    "string.empty": "Name cannot be empty.",
    "string.min": "Name should be at least 3 characters long.",
    "string.max": "Name should not exceed 30 characters.",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required.",
    "string.empty": "Email cannot be empty.",
    "string.email": "Invalid email format.",
  }),
  phone: Joi.string()
    .length(10)
    .pattern(/[6-9]{1}[0-9]{9}/)
    .required()
    .messages({
      "any.required": "Phone number is required.",
      "string.empty": "Phone number cannot be empty.",
      "string.length": "Phone number must be exactly 10 digits long.",
      "string.pattern.base": "Phone number is invalid.",
    }),
  description: Joi.string().max(50).required().messages({
    "any.required": "Description is required.",
    "string.empty": "Description cannot be empty.",
    "string.max": "Description should not exceed 50 characters.",
  }),
});
