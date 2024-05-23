const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

// 1. 회원가입 endpoint
// router.post('/', (req, res) => {
//   res.send('create user controller will be here');
// });
router.post('/', userController.createUser);

module.exports = router;
