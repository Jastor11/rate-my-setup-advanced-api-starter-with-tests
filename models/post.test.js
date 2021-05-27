const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")
const Post = require("./post")
const { commonAfterAll, commonBeforeAll, commonAfterEach, commonBeforeEach } = require("../tests/common")
const { TestWatcher } = require("@jest/core")

beforeAll(commonBeforeAll)
afterAll(commonAfterAll)
beforeEach(commonAfterEach)
afterEach(commonBeforeEach)

const newPost = {
  caption: "test",
  imageUrl: "test",
}

describe("Post", () => {
  test("dummy test", () => {
    expect(1).toBeTruthy()
  })
  // describe the create post
  // describe the listPosts
  // describe fetchPostById
})
