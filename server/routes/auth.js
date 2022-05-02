const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check } = require('express-validator');

const Auth = require('../controllers/auth');

router.get(
  '/', 
  auth, 
  Auth.Get);

router.post(
  '/checkLogin',   
  [check('username', 'Username is required').not().isEmpty(), check('password', 'Password is required').exists()],
  Auth.Check);

router.post(
  '/',
  [check('username', 'Username is required').not().isEmpty(), check('password', 'Password is required').exists()],
  Auth.Login
);
router.post(
  '/upload',
  [check('username', 'Username is required').not().isEmpty()],
  Auth.Upload
);
module.exports = router;
