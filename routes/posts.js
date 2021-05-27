const express = require("express")
const Post = require("../models/post")
const Rating = require("../models/rating")
const security = require("../middleware/security")
const permissions = require("../middleware/permissions")
const router = express.Router()

router.post("/", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    // create a new post
    const { user } = res.locals
    const post = await Post.createNewPost({ user, post: req.body })
    return res.status(201).json({ post })
  } catch (err) {
    next(err)
  }
})

router.get("/", async (req, res, next) => {
  try {
    // list all posts
    const posts = await Post.listPosts()
    return res.status(200).json({ posts })
  } catch (err) {
    next(err)
  }
})

router.get("/:postId", async (req, res, next) => {
  try {
    // fetch a single post by id
    const { postId } = req.params
    const post = await Post.fetchPostById(postId)
    return res.status(200).json({ post })
  } catch (err) {
    next(err)
  }
})

router.patch("/:postId", security.requireAuthenticatedUser, permissions.authedUserOwnsPost, async (req, res, next) => {
  try {
    // update a single post by its id
    const { postId } = req.params
    const post = await Post.editPost({ postUpdate: req.body, postId })
    return res.status(200).json({ post })
  } catch (err) {
    next(err)
  }
})

router.post(
  "/:postId/ratings",
  security.requireAuthenticatedUser,
  permissions.authedUserIsNotPostOwner,
  async (req, res, next) => {
    try {
      // create a new rating for a post
      const { postId } = req.params
      const { user } = res.locals
      const rating = await Rating.createRatingForPost({ rating: req.body.rating, user, postId })
      return res.status(201).json({ rating })
    } catch (err) {
      next(err)
    }
  }
)

module.exports = router
