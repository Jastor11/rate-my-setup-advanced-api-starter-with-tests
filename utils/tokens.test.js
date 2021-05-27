const jwt = require("jsonwebtoken")
const tokens = require("./tokens")
const { SECRET_KEY } = require("../config")

describe("Can sign and verify tokens", () => {
  test("Signing and verifying token with secret key works", () => {
    const claims = { username: "test_user" }
    const token = tokens.generateToken(claims)
    const decoded = tokens.validateToken(token)
    expect(decoded).toEqual({
      ...claims,
      iat: expect.any(Number),
      exp: expect.any(Number),
    })
  })

  test("Signing token with secret key and verifying token with incorrect key throws error", () => {
    const claims = { username: "test_user" }
    const token = tokens.generateToken(claims)

    try {
      jwt.verify(token, "WRONG_KEY")
    } catch (err) {
      expect(err instanceof jwt.JsonWebTokenError).toBeTruthy()
    }
  })
})

describe("Can create valid tokens for users from username", () => {
  test("Valid tokens are created for non-admin users", () => {
    const token = tokens.createUserJwt({ username: "test", isAdmin: false })
    const decoded = jwt.verify(token, SECRET_KEY)
    expect(decoded).toEqual({
      username: "test",
      isAdmin: false,
      iat: expect.any(Number),
      exp: expect.any(Number),
    })
  })

  test("Valid tokens are created for admin users", () => {
    const token = tokens.createUserJwt({ username: "test", isAdmin: true })
    const decoded = jwt.verify(token, SECRET_KEY)
    expect(decoded).toEqual({
      username: "test",
      isAdmin: true,
      iat: expect.any(Number),
      exp: expect.any(Number),
    })
  })

  test("Tokens set the isAdmin value to false by default", () => {
    const token = tokens.createUserJwt({ username: "test" })
    const decoded = jwt.verify(token, SECRET_KEY)
    expect(decoded).toEqual({
      username: "test",
      isAdmin: false,
      iat: expect.any(Number),
      exp: expect.any(Number),
    })
  })
})
