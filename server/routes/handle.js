const express = require('express');
const router = express.Router();
const Handle = require('../controllers/handle');
//const auth = require('../middleware/auth');

router.post('/', Handle.Get);
router.post('/set', Handle.Set);
module.exports = router;

