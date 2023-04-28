const express = require('express');
const router = express('router');
const { Spot, User, ReviewImage, Review, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { validateReview } = require('../../utils/errors');


// GET ALL REVIEWS OF CURRENT USER
router.get('/current', requireAuth, async (req, res) => {
  const myReviews = await Review.findAll({
    where: {
      userId: req.user.id
    },
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: Spot,
        attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country',
          'lat', 'lng', 'name', 'price'],
        include: {
          model: SpotImage
        }
      },
      {
        model: ReviewImage,
        attributes: ['id', 'url']
      }
    ]
  })

  // Create an array of reviews converted to JSON
  const reviewsList = [];
  myReviews.forEach(review => {
    reviewsList.push(review.toJSON())
  })

  // Iterate through each review
  reviewsList.forEach(review => {
    review.Spot.SpotImages.forEach(spotImage => {

      if (spotImage.preview) {
        review.Spot.previewImage = spotImage.url

      } else {
        review.Spot.previewImage = "This spot doesn't have a preview image yet"
      }
    })

    // Make sure to remove the SpotImages from response
    delete review.Spot.SpotImages;
  })

  return res.json({ "Reviews": reviewsList })
});

// ADD AN IMAGE TO A REVIEW BASED ON THE REVIEW'S ID
router.post('/:reviewId/images', requireAuth, async (req, res) => {
  const review = await Review.findByPk(req.params.reviewId, {
    include: [
      {
        model: ReviewImage,
        // attributes: []
      }
    ]
  })

  // Return 404 if review doesn't exist
  if (!review) {
    res.status(404)
    return res.json({
      "message": "Review couldn't be found",
      "statusCode": 404
    })
  }

  // Return 403 if review belongs to a different user
  if (review.userId !== req.user.id) {
    res.status(403)
    return res.json({
      "message": "Unauthorized request",
      "statusCode": 403
    })
  }

  // Return 403 if review already has 10 images
  const reviewJSON = review.toJSON();

  if (reviewJSON.ReviewImages.length >= 10) {
    res.status(403)
    return res.json({
      "message": "Maximum number of images for this resource was reached",
      "statusCode": 403
    })
  }

  const { url } = req.body

  const newImage = await ReviewImage.create({
    reviewId: req.params.reviewId,
    url
  })

  return res.json({
    id: newImage.id,
    url
  })
})

// EDIT A REVIEW
router.put('/:reviewId', requireAuth, validateReview, async (req, res, next) => {
  try {
    const reviewToEdit = await Review.findByPk(req.params.reviewId)

    // Return 404 error if review doesn't exist
    if (!reviewToEdit) {
      const error = new Error("The review you are trying to edit doesn't exist");
      error.status = 404
      error.title = "Review not found"
      throw error;

    }

    // Return 403 error if current user is not creator of this review
    if (reviewToEdit.userId !== req.user.id) {
      const error = new Error("You are not authorized to edit this review");
      error.status = 403
      error.title = "Unauthorized request"
      throw error;
    }

    const { review, stars } = req.body

    const editedReview = await reviewToEdit.update({
      review,
      stars
    })

    return res.json({
      id: editedReview.id,
      userId: editedReview.userId,
      spotId: editedReview.spotId,
      review,
      stars,
      createdAt: editedReview.createdAt,
      updatedAt: editedReview.updatedAt
    })

  } catch (err) {
    next(err)
  }
})


// DELETE A REVIEW

router.delete('/:reviewId', requireAuth, async (req, res, next) => {
  const review = await Review.findByPk(req.params.reviewId);

  // Return 404 error if review does not exist
  if (!review) {
    const error = new Error("The review you are trying to delete doesn't exist");
    error.status = 404
    error.title = "Review not found"
    throw error;
    }

  // Return 403 error if current user is not creator of Review
  if (review.userId !== req.user.id) {
    const error = new Error("You are not authorized to delete this review");
    error.status = 403
    error.title = "Unauthorized request"
    throw error;
  }

  await review.destroy();

  res.json({
    "message": "Successfully deleted",
    "statusCode": 200
  })
})

module.exports = router;
