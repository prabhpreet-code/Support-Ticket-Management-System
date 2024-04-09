# Support-Ticket-Management-System

## Description 

## Round-Robin Assignment Algorithm Implementation

To implement the round-robin assignment algorithm, I've employed two queues: one for storing all available agents and another for storing unassigned tickets.

### Flow Control

#### Agent Registration:
- When a new agent registers on our platform, we save their details in the database.
- We add the agent to the agent queue since they are currently available for handling tickets.

#### Support Ticket Creation:
- When a user creates a support ticket, we check if there's an available agent in the queue.
- If an agent is available, we assign the ticket to that agent and remove them from the queue.
- If no agent is available, we place the upcoming ticket in the support tickets queue.

#### Periodic Check (Cron Job):
- Every 40 seconds, a cron job checks the availability of agents in the agent queue and any pending tickets in the support ticket queue.
- If an agent and a ticket are both available, we assign the ticket to the agent and remove both from the queues.

#### Ticket Resolution:
- If a ticket is resolved, the agent can use an API to mark the ticket as resolved by specifying their ID and the ticket ID.
- We update the statuses of both the ticket and the agent.
- The agent is then added back to the agent queue since they are now available for handling new tickets.

#### Get Request for Support Ticket Data:
- A GET request retrieves all details of sorted, filtered, and paginated support ticket data.


## Install Node.js

    $ git clone https://github.com/prabhpreet-code/Support-Ticket-Management-System.git
    $ cd Server
    $ npm install

## Configure DB

Open MongoDB Compass and create & update .env

## Running the server project

    $ nodemon server.js

## Install Vite and React.js
    $ cd Client
    $ npm install

## Running the client project

    $ npm run dev

## Backend

<img src="https://github.com/prabhpreet-code/Support-Ticket-Management-System/blob/master/Screenshots/Screenshot%20(420).png">
<img src="https://github.com/prabhpreet-code/Support-Ticket-Management-System/blob/master/Screenshots/Screenshot%20(419).png">
<img src="https://github.com/prabhpreet-code/Support-Ticket-Management-System/blob/master/Screenshots/Screenshot%20(418).png">
<img src="https://github.com/prabhpreet-code/Support-Ticket-Management-System/blob/master/Screenshots/Screenshot%20(417).png">

## Frontend

<img src="https://github.com/prabhpreet-code/Support-Ticket-Management-System/blob/master/Screenshots/Screenshot%20(421).png">
<img src="https://github.com/prabhpreet-code/Support-Ticket-Management-System/blob/master/Screenshots/image.png">


This flow ensures efficient handling of support tickets by dynamically assigning them to available agents and maintaining a streamlined process for agent availability and ticket resolution.


