const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const authController = require('../controller/auth.controller');

// 1. 회원가입 endpoint
// router.post('/', (req, res) => {
//   res.send('create user controller will be here');
// });
router.post('/', userController.createUser);
router.post('/login', userController.loginWithEmail);
// 토큰을 통해 유저 id 빼내고 = > 그 아이디로 유저 객체 찾아서 보내주기
// 미들웨어컨셉
router.get('/me', authController.authenticate, userController.getUser);

router.post('/logout', authController.logout);

module.exports = router;
