const express = require('express');
const router = express.Router();
const Device = require('../controllers/device');
//const auth = require('../middleware/auth');

router.post('/', Device.Get);
router.post('/setLevel', Device.SetLevel);
router.post('/setStatus', Device.Setstatus);
module.exports = router;

