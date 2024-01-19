const cron = require("node-cron");
var mongoDbQueue = require("@openwar/mongodb-queue");
var mongodb = require("mongodb");
const supportTicketModel = require("../models/supportTicketModel");

const client = new mongodb.MongoClient(process.env.MONGODB_URL);
const db = client.db("test");

module.exports = function () {
  //runs every 40 sec to keep a check on two queues for agent and ticket availability
  const job = cron.schedule(
    "*/40 * * * * *",
    async () => {
      console.log("Cron job executed at:", new Date().toLocaleTimeString());

      const agentQueue = await mongoDbQueue(db, "agent-queue");
      const ticketQueue = await mongoDbQueue(db, "tickets-queue");

      //fetch agent and tickets availability
      const agentAvailable = await agentQueue.get();
      const ticketsAvailable = await ticketQueue.get();

      //check agent availability
      if (agentAvailable) {
        // check ticket availability
        if (ticketsAvailable) {
          // Assign available agent to the ticket
          const assignedNewAgentToTicket = await supportTicketModel.updateOne(
            { _id: ticketsAvailable.payload.id },
            {
              $set: {
                assignedTo: agentAvailable.payload.id,
                status: "Assigned",
              },
            }
          );

          // remove agent from agent queue
          const removedAgentFromQueue = await agentQueue.ack(
            agentAvailable.ack
          );
          // remove ticket from ticket queue
          const removedTicketsFromQueue = await agentQueue.ack(
            ticketsAvailable.ack
          );

          // remove ticket from agent db
          const removedAgentFromDb = await db
            .collection("agent-queue")
            .deleteOne({ ack: agentAvailable.ack });

          // remove ticket from ticket db
          const removedTicketFromDb = await db
            .collection("tickets-queue")
            .deleteOne({ ack: ticketsAvailable.ack });
        }
      }
    },
    {
      scheduled: false,
    }
  );

  job.start();
};
