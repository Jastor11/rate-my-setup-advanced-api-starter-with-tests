const Post = require("../models/post")
const { BadRequestError, ForbiddenError } = require("../utils/errors")

/**
 * Checks to make sure that the authenticated user is the owner of the post.
 * If they aren't, throws a ForbiddenError.
 * Otherwise, attaches the post to res.locals
 *
 */
const authedUserOwnsPost = async (req, res, next) => {
  try {
    const { user } = res.locals
    const { postId } = req.params
    const post = await Post.fetchPostById(postId)

    if (post.userEmail !== user.email) {
      throw new ForbiddenError("User is not allowed to update other users' posts.")
    }

    res.locals.post = post

    return next()
  } catch (err) {
    return next(err)
  }
}

const authedUserIsNotPostOwner = async (req, res, next) => {
  try {
    const { user } = res.locals
    const { postId } = req.params
    const post = await Post.fetchPostById(postId)

    if (post.userEmail === user.email) {
      throw new BadRequestError("Users are not allowed to rate their own posts.")
    }

    res.locals.post = post

    return next()
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  authedUserOwnsPost,
  authedUserIsNotPostOwner,
}
