const express = require('express');
const router = express.Router();
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

// Import of validation middleware
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


router.get(
  '/',
  restoreUser,
  (req, res) => {
      const { user } = req;
      if (user) {
          return res.json({
              id: user.toSafeObject().id,
              firstName: req.user.firstName,
              lastName: req.user.lastName,
              email: user.toSafeObject().email,
              username: user.toSafeObject().username

          });
      } else {
          res.json(null)
      }
  }
);

// Validate login function
const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Email or username is required'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required'),
  handleValidationErrors
];

// Log in a User
router.post('/', validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;
  
  const user = await User.login({ credential, password });
  
  if (!user) {
    const err = new Error('Login failed');
    err.status = 401;
    err.title = 'Login failed';
    err.message = "Your username and password don't match our records"
    err.errors = "These credentials don't match our records";
    return next(err);
  }
  
  const myToken = await setTokenCookie(res, user);

  return res.json({ 
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
    token: myToken });
});


// Log out a User
router.delete('/', async (req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'success' })
});

// GET the current User
router.get('/', (req, res) => {
  const { user } = req;
  if (user) {
    const { id, firstName, lastName, email, username } = user
    return res.json({
      id,
      firstName,
      lastName,
      email,
      username
    });
  } 
  
  else { res.json(null) };
});

module.exports = router;
