const express = require('express');
const router = express.Router();
const { ReviewImage, Review } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

// DELETE A REVIEW IMAGE
router.delete('/:imageId', requireAuth, async (req, res, next) => {
  const image = await ReviewImage.findByPk(req.params.imageId, {
    include: {
      model: Review
    }
  })
  
  if (!image) {
    const error = new Error('The image you are trying to delete could not be found');
    error.status = 404;
    error.title = 'Image not found';
    
    return next(error);
  }
  
  const imageToJSON = image.toJSON();

  if (req.user.id !== imageToJSON.Review.userId) {
    const error = new Error('You are not authorized to delete this image');
    error.status = 401;
    error.title = 'Unauthorized';

    return next(error);
  }
  
  
  await image.destroy();
  return res.json({
    "message": "Successfully deleted",
    "statusCode": 200
  })
})


module.exports = router;
