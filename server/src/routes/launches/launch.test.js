const request = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");
const { loadPlanetsData } = require("../../models/planets.model");

describe("Launches api test", ()=> {

  beforeEach(async() => {
    await mongoConnect();
    await loadPlanetsData();
  });

  afterEach(async() => {
    await mongoDisconnect();
  });

  describe("Test GET /launches", () => {
    test("This will respond with 200 success", async () => {
      const response = await request(app)
        .get("/v1/launches")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("Test POST /launches", () => {
    const completeLaunchData = {
      mission: "blah blah company",
      rocket: "luxmi cheat rocket 2.0",
      target: "Kepler-442 b",
      launchDate: "January 7, 1999",
    };

    const launchDataWithoutDate = {
      mission: "blah blah company",
      rocket: "luxmi cheat rocket 2.0",
      target: "Kepler-442 b",
    };

    const launchDataWithInvalidDate = {
      mission: "blah blah company",
      rocket: "luxmi cheat rocket 2.0",
      target: "Kepler-442 b",
      launchDate: "hahaha",
    };

    test("This will respond with 201 created", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(completeLaunchData)
        .expect("Content-Type", /json/)
        .expect(201);

      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();
      expect(requestDate).toBe(responseDate);

      expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    test("it will catch missing required properties", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchDataWithoutDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Missing required launch property!",
      });
    });

    test("it will catch invalid dates", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchDataWithInvalidDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Invalid date property!",
      });
    });
  });

 
});
