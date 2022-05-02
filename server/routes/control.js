const express = require('express');
const router = express.Router();
const control = require('../controllers/control');


router.post('/', control.Set);
module.exports = router;

