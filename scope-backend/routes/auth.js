const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../config');
const middlewares = require('../middlewares');

const router = express.Router();

router.post('/login',
  async (req, res) => {
    const { email, password } = req.body;

    // Check if authorization header is set
    const { authorization } = req.headers;
    if (authorization !== null && authorization !== undefined) {
      return res.json({ status: 401, message: 'Authorization header already set' });
    }

    // Check if user exists
    const user = await req.app.knex('user').where('email', email).first();
    if (!user) {
      return res.json({ status: 404, message: 'Data does not match our logs' });
    }

    // Check if password matches
    const match = bcrypt.compareSync(password, user.password);
    if (!match) {
      return res.json({ status: 404, message: 'Data does not match our logs' });
    }

    // check if user already has a session available
    const session = await req.app.knex('session').where('userId', user.id).first();
    if (session) {
      await res.app.knex('session').where('id', session.id).delete();
    }

    // Generate JWT token and set expiration date for 1 week
    const token = jwt.sign({ sub: user.id }, jwtSecret, { expiresIn: '1w' });
    // Create session
    await req.app.knex('session').insert({ userId: user.id });
    return res.json({ status: 200, token });
  },
);

router.post('/logout',
  middlewares.authenticate,
  async (req, res) => {
    const { user } = req;

    // Check if user exists
    if (!user) {
      return res.json({ status: 404, message: 'Data does not match our logs' });
    }

    // Destroy session / Revoke token
    await req.app.knex('session').where('userId', user.id).delete();
    return res.json({ status: 200 });
  },
);

module.exports = router;
