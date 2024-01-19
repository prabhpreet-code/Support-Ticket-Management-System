const { SERVER_ERROR } = require("../errors/SERVER_ERROR");
const supportTicketModel = require("../models/supportTicketModel");
var mongodb = require("mongodb");
const Joi = require("joi");
var mongoDbQueue = require("@openwar/mongodb-queue");
const supportAgentModel = require("../models/supportAgentModel");

const client = new mongodb.MongoClient(process.env.MONGODB_URL);
const db = client.db("test");

//@desc Create a Support Ticket
//@route POST /api/support-tickets
//@access public
exports.createSupportTicketsData = async (req, res) => {
  try {
    const { topic, description, type, severity } = req.body;

    if (!topic || !type || !severity || !description) {
      res.status(400).send({
        success: false,
        code: 400,
        message: "All Fields are mandatory",
      });
    }

    //validate all params
    const { error } = createSupportTicketSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.json(error);
    }

    // Queue initialisation
    const ticketQueue = await mongoDbQueue(db, "tickets-queue");
    const agentQueue = await mongoDbQueue(db, "agent-queue");

    // check agent availability from queue
    const agentAvailable = await agentQueue.get();

    // if agent not available
    if (!agentAvailable) {
      // create a new ticket
      const supportTicket = await supportTicketModel.create({
        topic,
        description,
        type,
        severity,
        dateCreated: new Date(),
        status: "New",
      });

      // add ticket to the support tickets queue
      const id = await ticketQueue.add({
        id: String(supportTicket._id),
        topic: topic,
      });

      res.status(200).json({
        status: true,
        supportTicket,
        msg: "New Support Ticket created successfully",
      });
    }
    // if user is available
    else {
      // create a new ticket and assign available agent from the queue
      const supportTicket = await supportTicketModel.create({
        topic,
        description,
        type,
        severity,
        dateCreated: new Date(),
        status: "Assigned",
        assignedTo: agentAvailable.payload.id,
      });

      // update agent's status to false
      const activeSupportAgent = await supportAgentModel.updateOne(
        { _id: agentAvailable.payload.id },
        {
          $set: {
            active: false,
          },
        }
      );

      // remove agent from agents queue after assigning
      const removedAgentFromQueue = await agentQueue.ack(agentAvailable.ack);

      // remove agent from agents db after assigning
      const removedAgentFromDb = await db
        .collection("agent-queue")
        .deleteOne({ ack: agentAvailable.ack });

      res.status(200).json({
        status: true,
        supportTicket,
        msg: "New Support Ticket created and assigned successfully",
      });
    }
  } catch (error) {
    console.log(error); // Log any errors
    res.status(500).send({ success: false, error: SERVER_ERROR }); // Send a server error response
  }
};

//@desc Resolve a Support Ticket
//@route POST /api/support-tickets/resolve/:id
//@access public
exports.resolveSupportTicketsDataById = async (req, res) => {
  try {
    const { agentId } = req.body;
    const supportTicketId = req.params.id;

    if (!agentId) {
      res.status(400).send({
        success: false,
        code: 400,
        message: "All Fields are mandatory",
      });
    }

    // Initialise agent queue
    const agentQueue = await mongoDbQueue(db, "agent-queue");

    //After resolving ticket agent is again availaible for work
    // Add available agent to agent queue
    const agentIdFromQueue = await agentQueue.add({
      id: String(agentId),
      active: true,
    });

    // Agent is again availaible for work and update active to true
    const activeSupportAgent = await supportAgentModel.updateOne(
      { _id: agentId },
      {
        $set: {
          active: true,
        },
      }
    );

    // Update resolved ticket
    const resolvedSupportTicket = await supportTicketModel.updateOne(
      { _id: supportTicketId },
      {
        $set: {
          status: "Resolved",
          resolvedOn: new Date(),
        },
      }
    );

    res.status(200).json({
      status: true,
      resolvedSupportTicket,
      msg: "Support Ticket resolved successfully",
    });
  } catch (error) {
    console.log(error); // Log any errors
    res.status(500).send({ success: false, error: SERVER_ERROR }); // Send a server error response
  }
};

//@desc Get Support Tickets
//@route GET /api/support-tickets
//@access public
exports.getSupportTicketsData = async (req, res) => {
  try {
    //pagination
    const { page, limit } = req.query;

    // filtering
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);

    //sorting
    let sortBy;
    if (req.query.sort) {
      sortBy = req.query.sort;
    } else {
      sortBy = "-createdAt";
    }

    // count total documents
    const count = await supportTicketModel.countDocuments().exec();

    // get all support tickets from db
    const supportTickets = await supportTicketModel
      .find(queryObj)
      .sort(sortBy)
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      status: true,
      supportTickets,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalItems: count,
      msg: "All support tickets sent successfully",
    });
  } catch (error) {
    console.log(error); // Log any errors
    res.status(500).send({ success: false, error: SERVER_ERROR }); // Send a server error response
  }
};

//@access private
// validation of support ticket
const createSupportTicketSchema = Joi.object({
  topic: Joi.string().max(30).required().messages({
    "any.required": "Topic is required.",
    "string.empty": "Topic cannot be empty.",
    "string.max": "Topic should not exceed 50 characters.",
  }),
  description: Joi.string().max(50).required().messages({
    "any.required": "Description is required.",
    "string.empty": "Description cannot be empty.",
    "string.max": "Description should not exceed 50 characters.",
  }),
  type: Joi.string()
    .valid(
      "Complaint",
      "Issue related to Instructor",
      "Enquiry",
      "Issues regarding Payment"
    )
    .required()
    .messages({
      "any.required": "Type is required.",
      "string.empty": "Type cannot be empty.",
    }),
  severity: Joi.string()
    .valid("Low", "Medium", "High", "Urgent")
    .required()
    .messages({
      "any.required": "Severity is required.",
      "string.empty": "Severity cannot be empty.",
    }),
});
