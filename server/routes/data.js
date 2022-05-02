const express = require('express');
const router = express.Router();
const Data = require('../controllers/data');

router.post('/', Data.Get);
module.exports = router;

