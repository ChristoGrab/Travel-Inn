const { check } = require('express-validator');
const { handleValidationErrors } = require('./validation');

// Validation checks for signing up a new user
const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Invalid email'),
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
    .withMessage('Password must be 6 characters or more.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage("First Name is required"),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage("Last Name is required"),
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
    .isLength({ max: 50 })
    .withMessage('Please do not exceed 50 characters'),
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
