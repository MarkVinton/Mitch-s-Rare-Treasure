const request = require("supertest");
const seed = require("../db/seed");
const data = require("../db/data/test-data/index");
const db = require("../db/index");
const app = require("../app");

beforeEach(() => seed(data));

afterAll(() => db.end());

describe.only("GET /api/treasures", () => {
  it("responds with a 200 status code", () => {
    return request(app).get("/api/treasures").expect(200);
  });
  it("responds with an array of all treasures objects", () => {
    return request(app)
      .get("/api/treasures")
      .expect(200)
      .then(({ body: { treasures } }) => {
        expect(treasures.length).toBe(26);
        treasures.forEach((treasure) => {
          expect(treasure).toHaveProperty("treasure_id", expect.any(Number));
          expect(treasure).toHaveProperty("treasure_name", expect.any(String));
          expect(treasure).toHaveProperty("colour", expect.any(String));
          expect(treasure).toHaveProperty("age", expect.any(Number));
          expect(treasure).toHaveProperty(
            "cost_at_auction",
            expect.any(Number)
          );
          expect(treasure).toHaveProperty("shop_name", expect.any(String));
        });
      });
  });
  it("responds with an array of all treasure objects sorted by age ascending", () => {
    return request(app)
      .get("/api/treasures")
      .expect(200)
      .then(({ body: { treasures } }) => {
        expect(treasures.length).toBe(26);
        expect(treasures).toBeSortedBy("age")
      });
  });
});
