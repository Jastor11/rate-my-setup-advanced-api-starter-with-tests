const request = require("supertest")
const app = require("./app")
const db = require("./db")

describe("Test application", () => {
  test("Not found for site 404", async () => {
    const res = await request(app).get("/wrong-endpoint")
    expect(res.statusCode).toEqual(404)
  })

  test("Health check route returns valid response", async () => {
    const res = await request(app).get("/")
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({ ping: "pong" })
  })
})

afterAll(async () => {
  await db.end()
})
