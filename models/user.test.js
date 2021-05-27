const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")
const User = require("./user")
const { commonAfterAll, commonBeforeAll, commonAfterEach, commonBeforeEach } = require("../tests/common")

beforeAll(commonBeforeAll)
afterAll(commonAfterAll)
beforeEach(commonAfterEach)
afterEach(commonBeforeEach)

const newUser = {
  username: "fake_user_three",
  email: "fake_three@user.io",
  isAdmin: false,
}

describe("User", () => {
  describe("Test user registration", () => {
    test("User can succesfully register with proper credentials", async () => {
      const user = await User.register({ ...newUser, password: "pw" })
      expect(user).toEqual({
        id: expect.any(Number),
        username: newUser.username,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        createdAt: expect.any(Date),
      })
    })

    test("Registering with duplicate email throws error", async () => {
      expect.assertions(1)

      try {
        await User.register({ ...newUser, password: "pw" })
        await User.register({ ...newUser, username: "something_else", password: "pw" })
      } catch (err) {
        expect(err instanceof BadRequestError).toBeTruthy()
      }
    })

    test("Registering with duplicate username throws error", async () => {
      expect.assertions(1)

      try {
        await User.register({ ...newUser, password: "pw" })
        await User.register({ ...newUser, email: "something@else.io", password: "pw" })
      } catch (err) {
        expect(err instanceof BadRequestError).toBeTruthy()
      }
    })
  })
})
