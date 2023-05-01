const express = require('express');
const router = express.Router();
const { Spot, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3');


// UPLOAD AN IMAGE TO AWS
router.post('/upload', singleMulterUpload("image"), async (req, res) => {
  
  const imageUrl = await singlePublicFileUpload(req.file);

  return res.json({ imageUrl });
})

// DELETE A SPOT IMAGE
router.delete('/:imageId', requireAuth, async (req, res, next) => {
  const image = await SpotImage.findByPk(req.params.imageId, {
      include: [
        {
          model: Spot
        }
      ]
  });
  
  // Check if the image exists, and throw an error if not
  if (!image) {
    const error = new Error('The image you are trying to delete could not be found');
    error.status = 404;
    error.title = 'Image not found';
    
    return next(error);
  }
  
  const imageToJSON = image.toJSON();
  
  // Check if the user is the owner of the spot, and throw an error if not
  if (req.user.id !== imageToJSON.Spot.ownerId) {
    const error = new Error('You are not authorized to delete this image');
    error.status = 401;
    error.title = 'Unauthorized';
    
    return next(error);
  }
  
  // Else, delete the image
  await image.destroy();
  return res.json({
    "message": "Image successfully deleted",
    "statusCode": 200
  })
})

module.exports = router; 
