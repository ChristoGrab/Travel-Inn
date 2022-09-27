const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

// Import of validation middleware
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


// Validate login function
const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

// Log in
router.post('/', validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;
  
  const user = await User.login({ credential, password });
  
  if (!user) {
    const err = new Error('Login failed');
    err.status = 401;
    err.title = 'Login failed';
    err.errors = ['Invalid credentials'];
    return next(err);
  }
  
  await setTokenCookie(res, user);

  return res.json({ user });
  
});

// Log out
router.delete('/', async (req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'success' })
});

// GET the current User
router.get('/', requireAuth, (req, res) => {
  const { user } = req;
  if (user) {
    return res.json({
      user: user.toSafeObject()
    });
  } else return res.json({});
});





module.exports = router;
