const { check } = require('express-validator');
const { handleValidationErrors } = require('./validation');

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
    .withMessage('Description is required'),
  check('price')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Price per day is required'),
  handleValidationErrors
];

const validateBooking = [
  check('endDate')
    .isAfter()
    .withMessage("endDate cannot be on or before startDate")
]


module.exports = { validateReview, validateSpot, validateBooking };