const express = require('express');
const router = express.Router();
const { Spot, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3');


// UPLOAD AN IMAGE TO AWS
router.post('/upload', singleMulterUpload("image"), async (req, res) => {
  console.log("hello")
  const imageUrl = await singlePublicFileUpload(req.file);
  if (res.status === 403) {
    console.log("fuck")
  }
  return res.json({ imageUrl });
})

// DELETE A SPOT IMAGE
router.delete('/:imageId', requireAuth, async (req, res) => {
  const image = await SpotImage.findByPk(req.params.imageId, {
      include: [
        {
          model: Spot
        }
      ]
  });
  
  if (!image) {
    res.status(404);
    return res.json({
      "message": "Spot Image couldn't be found",
      "statusCode": 404
    })
  }
  
  const imageToJSON = image.toJSON();
  
  if (req.user.id !== imageToJSON.Spot.ownerId) {
    res.status(403);
    return res.json({
      "message": "Unauthorized request",
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
