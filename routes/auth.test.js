const request = require("supertest")
const app = require("../app")
const tokens = require("../utils/tokens")
const { commonAfterAll, commonBeforeAll, commonAfterEach, commonBeforeEach } = require("../tests/common")

beforeAll(commonBeforeAll)
afterAll(commonAfterAll)
beforeEach(commonAfterEach)
afterEach(commonBeforeEach)

const themToken = tokens.createUserJwt({ username: "them", isAdmin: false })

describe("Auth Routes", () => {
  describe("GET /auth/me", () => {
    test("Authenticated user receives their profile when hitting endpoint", async () => {
      const res = await request(app).get(`/auth/me`).set("Authorization", `Bearer ${themToken}`)
      expect(res.statusCode).toEqual(200)

      expect(res.body.user).toEqual({
        id: expect.any(Number),
        username: "them",
        email: "them@them.us",
        createdAt: expect.any(String),
        isAdmin: false,
      })
    })

    test("Unauthenticated requests throw a 401 error", async () => {
      const res = await request(app).get(`/auth/me`)

      expect(res.statusCode).toEqual(401)
    })
  })
})
