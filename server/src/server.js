const http = require("http");

require('dotenv').config();


const app = require("./app.js");

const { mongoConnect } = require("./services/mongo");

const { loadPlanetsData } = require("./models/planet.model");
const { loadLaunchesData } = require("./models/launch.model");
const PORT = process.env.PORT || 8000;



const server = http.createServer(app);



async function startServer() {

  //mongoose server setup
  await mongoConnect();

  //executing the promise setup
  await loadPlanetsData();

  await loadLaunchesData();


  //server starts
  server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
};

startServer();

