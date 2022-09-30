const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth')
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { validateSignup } = require('../../utils/errors')

const router = express.Router();


// Sign up
router.post('/', validateSignup, async (req, res) => {
    const { 
      email, 
      password, 
      username, 
      firstName, 
      lastName } = req.body;
      
    const user = await User.signup({ 
      email, 
      username, 
      password, 
      firstName, 
      lastName 
    });

    const token = await setTokenCookie(res, user);
    
    user.token = token;

    return res.json({
      id: user.id,
      firstName,
      lastName,
      email,
      username,
      token
    });
  }
);

module.exports = router;