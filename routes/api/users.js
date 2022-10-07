const router = require('express').Router();
const userController = require('../../controller/userController');

router
  .route('/')
  .put(userController.getImage)

  module.exports = router; 