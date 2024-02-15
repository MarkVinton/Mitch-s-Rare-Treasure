const request = require("supertest");
const seed = require("../db/seed");
const data = require("../db/data/test-data/index");
const db = require("../db/index");
const app = require("../app");

beforeEach(() => seed(data));

afterAll(() => db.end());

describe("GET /api/treasures", () => {
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
        expect(treasures).toBeSortedBy("age");
      });
  });
});

describe("GET /notARoute", () => {
  it("404: responds with 404 Not Found", () => {
    return request(app)
      .get("/notARoute")
      .expect(404)
      .then(({ body: { message } }) => {
        expect(message).toBe("Not Found");
      });
  });
});

describe("GET /api/treasures?sort_by", () => {
  it("responds with an array of treasures sorted by age, ascending", () => {
    return request(app)
      .get("/api/treasures?sort_by=age")
      .expect(200)
      .then(({ body: { treasures } }) => {
        expect(treasures).toBeSortedBy("age");
      });
  });
  it("responds with an array of treasures sorted by cost_at_auction, ascending", () => {
    return request(app)
      .get("/api/treasures?sort_by=cost_at_auction")
      .expect(200)
      .then(({ body: { treasures } }) => {
        expect(treasures).toBeSortedBy("cost_at_auction");
      });
  });
  it("responds with an array of treasures sorted by treasure_name, ascending", () => {
    return request(app)
      .get("/api/treasures?sort_by=treasure_name")
      .expect(200)
      .then(({ body: { treasures } }) => {
        expect(treasures).toBeSortedBy("treasure_name");
      });
  });
  it("400: responds with Bad request when trying SQL injection", () => {
    return request(app)
      .get("/api/treasures?sort_by=age ; DROP TABLE treasures")
      .expect(400)
      .then(({ body: { message } }) => {
        expect(message).toBe("Bad Request");
      });
  });
  it("400: responds with Bad Request when using invalid query", () => {
    return request(app)
      .get("/api/treasures?sort_by=colour")
      .expect(400)
      .then(({ body: { message } }) => {
        expect(message).toBe("Bad Request");
      });
  });
});

describe("GET /api/treasures?order=desc", () => {
  it("responds with an array of treasures sorted by age, descending", () => {
    return request(app)
      .get("/api/treasures?order=desc")
      .expect(200)
      .then(({ body: { treasures } }) => {
        expect(treasures).toBeSortedBy("age", { descending: true });
      });
  });
  it("400: responds with Bad Request when using invalid query", () => {
    return request(app)
      .get("/api/treasures?order=colour")
      .expect(400)
      .then(({ body: { message } }) => {
        expect(message).toBe("Bad Request");
      });
  });
  it("400: responds with Bad request when trying SQL injection", () => {
    return request(app)
      .get("/api/treasures?order=desc ; DROP TABLE treasures")
      .expect(400)
      .then(({ body: { message } }) => {
        expect(message).toBe("Bad Request");
      });
  });
});

describe("GET /api/treasures?colour=gold", () => {
  test("200: responds with array of treasures only containing treasures with colour gold", () => {
    return request(app)
      .get("/api/treasures?colour=gold")
      .expect(200)
      .then(({ body: { treasures } }) => {
        expect(treasures.length).toBe(2);
      });
  });
  test("400: responds with bad request when using an invalid query", () => {
    return request(app)
      .get("/api/treasures?colour=notcolour")
      .expect(400)
      .then(({ body: { message } }) => {
        expect(message).toBe("Bad Request");
      });
  });
});

describe.only("POST /api/treasures", () => {
  test("201: inserts new treasure to the shop", () => {
    const body = {
      treasure_name: "treasure-a1",
      colour: "gold",
      age: 4,
      cost_at_auction: 10,
      shop_id: 1,
    };
    return request(app)
      .post("/api/treasures")
      .send(body)
      .expect(201)
      .then(({body:{treasure}}) => {
        const newTreasure = {
          treasure_id: 27,
          treasure_name: "treasure-a1",
          colour: "gold",
          age: 4,
          cost_at_auction: 10,
          shop_id: 1,
        };
        expect(treasure).toMatchObject(newTreasure);
      });
  });
  test.only('POST:400 responds with an appropriate status and error message when provided with a bad team (no team name)', () => {
    return request(app)
      .post('/api/treasures')
      .send({
        treasure_name: "treasure-a2"
      })
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe('Bad request');
      });
  });
});
