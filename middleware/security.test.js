const security = require("./security")
const { UnauthorizedError } = require("../utils/errors")

describe("Security", () => {
  describe("test requireAuthenticatedUser", () => {
    test("Doesn't throw errors when user is present", () => {
      expect.assertions(1)
      const req = {}
      const res = { locals: { user: { username: "lebron", isAdmin: false } } }
      const next = (err) => expect(err).toBeFalsy()
      security.requireAuthenticatedUser(req, res, next)
    })

    test("Throws an Unauthorized error when no user is present", () => {
      expect.assertions(1)
      const req = {}
      const res = { locals: {} }
      const next = (err) => expect(err instanceof UnauthorizedError).toBeTruthy()
      security.requireAuthenticatedUser(req, res, next)
    })
  })
})
