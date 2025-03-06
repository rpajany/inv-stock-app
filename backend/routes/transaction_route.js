const express = require('express');
const { load_Transaction, insert_Transaction } = require('../controller/Transaction_Controller');

const router = express.Router();

router.post('/load', load_Transaction);
router.post('/insert', insert_Transaction);

module.exports = router;