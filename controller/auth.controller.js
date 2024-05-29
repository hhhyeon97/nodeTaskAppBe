const authController = {};
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

authController.authenticate = (req, res, next) => {
  try {
    const tokenString = req.headers.authorization; // Bearer 머머머(토큰);
    if (!tokenString) {
      throw new Error('invalid token');
    }
    const token = tokenString.replace('Bearer ', '');
    jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
      if (error) {
        throw new Error('invalid token');
      }
      //   console.log('payload???', payload);
      //   res.status(200).json({ status: 'success', userId: payload._id });
      req.userId = payload._id;
    });
    next();
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

authController.logout = (req, res) => {
  res.status(200).json({ status: 'success', message: '로그아웃 성공!' });
};

module.exports = authController;
