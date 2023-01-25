const { check } = require('express-validator');
const { handleValidationErrors } = require('./validation');

// Validation checks for signing up a new user
const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email address.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username is required and cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Please create a password containing 6 or more characters.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .isAlpha()
    .withMessage("Please provide your first name"),
  check('lastName')
    .exists({ checkFalsy: true })
    .isAlpha()
    .withMessage("Please provide your last name"),
  handleValidationErrors
];

// Validation checks for creating or editing Reviews
const validateReview = [
  check('review')
    .exists({ checkFalsy: true})
    .notEmpty()
    .withMessage('Review text is required'),
  check('stars')
    .isInt({ min: 1, max: 5 })
    .withMessage('Please provide a whole number between 1 and 5'),
    handleValidationErrors
];

// Validation checks for creating or editing Spots
const validateSpot = [
  check('address')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Street address is required'),
  check('city')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('City is required'),
  check('state')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('State is required'),
  check('country')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Country is required'),
  check('description')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 200 })
    .withMessage('Please do not exceed 200 characters'),
  check('price')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Price per day is required'),
  check('price')
    .isNumeric()
    .withMessage('Please provide a valid price'),
  handleValidationErrors
];

// Validations for bookings
// const validateBooking = [
//   check('endDate')
//     .isAfter()
//     .withMessage("endDate cannot be on or before startDate")
// ]




module.exports = { validateReview, validateSpot, validateSignup };
