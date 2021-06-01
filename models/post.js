const db = require("../db")
const { BadRequestError, NotFoundError } = require("../utils/errors")

class Post {
  static async listPosts() {
    // list all posts in the database
    // from most recent to least recent
    // each post should include all of its ratings

    const results = await db.query(`
      SELECT p.id,
             p.caption,
             p.image_url AS "imageUrl",
             p.user_id AS "userId",
             u.username AS "username",
             AVG(r.rating) AS "rating",
             COUNT(r.rating) AS "totalRatings",
             p.created_at AS "createdAt",
             p.updated_at AS "updatedAt"
      FROM posts AS p
        LEFT JOIN users AS u ON u.id = p.user_id
        LEFT JOIN ratings AS r ON r.post_id = p.id
      GROUP BY p.id, u.username
      ORDER BY p.created_at DESC
    `)

    return results.rows
  }

  static async fetchPostById(postId) {
    // fetch a post by its id
    // the post should include all of its ratings

    const results = await db.query(
      `
      SELECT p.id,
             p.caption,
             p.image_url AS "imageUrl",
             p.user_id AS "userId",
             AVG(r.rating) AS "rating",
             COUNT(r.rating) AS "totalRatings",
             u.username AS "username",             
             p.created_at AS "createdAt",
             p.updated_at AS "updatedAt"
      FROM posts AS p
        LEFT JOIN ratings AS r ON r.post_id = p.id
        LEFT JOIN users AS u ON u.id = p.user_id        
      WHERE p.id = $1
      GROUP BY p.id, u.username
    `,
      [postId]
    )

    const post = results.rows[0]

    if (!post) {
      throw new NotFoundError("Post not found.")
    }

    return post
  }

  static async createNewPost({ post, user }) {
    const requiredFields = ["caption", "imageUrl"]
    requiredFields.forEach((field) => {
      if (!post.hasOwnProperty(field) || !post[field]) {
        throw new BadRequestError(`Required field - ${field} - missing from request body.`)
      }
    })

    if (post.caption.length > 140) {
      throw new BadRequestError(`Post caption must be 140 characters or less.`)
    }

    // insert a new post into the database
    const results = await db.query(
      `
      INSERT INTO posts (caption, image_url, user_id)
      VALUES ($1, $2, (SELECT id FROM users WHERE username = $3))
      RETURNING id, 
                caption, 
                image_url AS "imageUrl",
                user_id AS "userId",
                $3 AS "username",
                created_at AS "createdAt",
                updated_at AS "updatedAt"
    `,
      [post.caption, post.imageUrl, user.username]
    )

    return results.rows[0]
  }

  static async editPost({ postUpdate, postId }) {
    const requiredFields = ["caption"]
    requiredFields.forEach((field) => {
      if (!postUpdate.hasOwnProperty(field)) {
        throw new BadRequestError(`Required field - ${field} - missing from request body.`)
      }
    })

    // update a single post
    const result = await db.query(
      `
      UPDATE posts
      SET caption = $1,
          updated_at = NOW()
      WHERE id = $2
      RETURNING id, 
                caption, 
                image_url AS "imageUrl",
                user_id AS "userId",
                created_at AS "createdAt",
                updated_at AS "updatedAt"
    `,
      [postUpdate.caption, postId]
    )

    return result.rows[0]
  }
}

module.exports = Post
