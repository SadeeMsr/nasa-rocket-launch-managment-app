const fs = require("fs");
const path = require("path");
const parse = require("csv-parse");

const planets = require("./planet.mongo");

// const habitablePlanets = [];

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

function loadPlanetsData() {
  return new Promise(function (resolve, reject) {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        if (isHabitablePlanet(data)) {
          // habitablePlanets.push(data);
          savePlanet(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", async() => {
        const planetCount = (await getAllPlanets()).length;
        console.log(`${planetCount} habitable planets found!`);
        resolve();
      });
  });
}

const getAllPlanets = async () => {
  return await planets.find({});
};

const savePlanet = async (planet) => {
  try {
    //upsert = update + insert, insert if not available/found;
    await planets.updateOne(
      {
        keplerName: planet.kepler_name,
      },
      {
        keplerName: planet.kepler_name,
      },
      {
        upsert: true,
      }
    );
  } catch (error) {
    console.error(`could not save the planets ${error}`);
  }
};

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
