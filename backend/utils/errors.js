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
]


module.exports = { validateReview };