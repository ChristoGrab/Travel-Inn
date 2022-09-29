const express = require('express');
const router = express.Router();
const { ReviewImage, Review } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

// DELETE A REVIEW IMAGE
router.delete('/:imageId', requireAuth, async (req, res) => {
  const image = await ReviewImage.findByPk(req.params.imageId, {
    include: {
      model: Review
    }
  })
  
  if (!image) {
    res.status(404)
    return res.json({
      "message": "Review Image couldn't be found",
      "statusCode": 404
    })
  }
  
  const imageToJSON = image.toJSON();

  if (req.user.id !== imageToJSON.Review.userId) {
    res.status(403)
    return res.json({
      "message": "Forbidden",
      "statusCode": 403
    })
  }
  
  
  await image.destroy();
  return res.json({
    "message": "Successfully deleted",
    "statusCode": 200
  })
})


module.exports = router;