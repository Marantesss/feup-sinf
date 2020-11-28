/**
 * This router serves as a simple example
 * of the usage of knex.
 */

const express = require('express');
const router = express.Router();

/**
 * Returns all the posts.
 */
router.get('/',
  async (req, res) => {
    const posts = await req.app.knex('posts');
    return res.json({ status: 200, posts });
  }
);

/**
 * Creates a new post.
 */
router.post('/',
  async (req, res) => {
    const { content } = req.body;

    if (typeof content !== 'string') {
      return res.json({ status: 400 });
    }

    const newPost = { content };
    await req.app.knex('posts').insert(newPost);

    return res.json({ status: 201 });
  }
);

module.exports = router;
