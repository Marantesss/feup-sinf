const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../config');
const { authenticate, validate } = require('../middlewares');
const { login } = require('../schemas')

const router = express.Router();

/**
 * Login route
 * - validate middleware makes sure that the request body is in the correct format { emmail. password }
 * - route does some verifications (users exsists, password matches, ...)
 * - signs new jwt token and creates new session
 * - sends token to client
 */
router.post('/login',
  validate(login),
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

/**
 * Logout route
 * - authenticate middleware makes sure that the user is authenticated before logging in
 * - route does some verifications (users exists
 * - destroys session
 */
router.post('/logout',
  authenticate,
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
