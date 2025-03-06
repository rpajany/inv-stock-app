const express = require('express');
const { insert_PickList, update_PickList, delete_PickList } = require('../controller/PickList_Controller');

const router = express.Router();

router.post('/insert', insert_PickList);
router.post('/update', update_PickList);
router.delete('/delete', delete_PickList);

module.exports = router;