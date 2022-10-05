const router = require('express').Router();
const userController = require('../../controller/userController');

router
  .route('/')
  .get(userController.getImage)

  module.exports = router; 