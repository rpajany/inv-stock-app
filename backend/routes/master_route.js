const express = require('express');
const { get_AllMaster, get_RackData, getMaster_ByPN, getMaster_ByName, update_Master, update_MasterStock } = require('../controller/Master_Controller');

const router = express.Router();

router.get('/load', get_AllMaster);
router.get('/getRackData/:Rack', get_RackData);
router.get('/getMasterByPN/:Part_Number', getMaster_ByPN);
router.post('/getMasterByName', getMaster_ByName);
router.post('/update', update_Master);
router.post('/updateStock', update_MasterStock);

module.exports = router;