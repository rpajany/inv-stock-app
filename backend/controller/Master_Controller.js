const masterModel = require('../models/master_model');

// get all maser
exports.get_AllMaster = async (req, res) => {
    try {
        const masterList = await masterModel.getAllMaster();
        res.status(200).json(masterList)

    } catch (error) {
        console.log('Error get_AllMaster :', error);
        res.status(500).send('Internal Server Error');
    }
}

// get Rack Data
exports.get_RackData = async (req, res) => {
    try {
        const { Rack } = req.params;
        // console.log('Rack :', Rack)
        const rackData = await masterModel.getRackData(Rack);
        res.status(200).json(rackData)

    } catch (error) {
        console.log('Error get_RackData :', error);
        res.status(500).send('Internal Server Error');
    }
}

// get item by partNumber
exports.getMaster_ByPN = async (req, res) => {
    try {
        const { Part_Number } = req.params;
        const result = await masterModel.get_ByPN(Part_Number);
        res.status(200).json(result);
    } catch (error) {
        console.log('Error getMaster_ByPN :', error);
        res.status(500).send('Internal Server Error');
    }
}

// get item by Name
exports.getMaster_ByName = async (req, res) => {
    try {
        const { SearchObj } = req.body;
        const result = await masterModel.get_ByName(SearchObj);
        res.status(200).json(result);
    } catch (error) {
        console.log('Error getMaster_ByPN :', error);
        res.status(500).send('Internal Server Error');
    }
}

// insert
exports.insert_Master = async (req, res) => {
    try {
        const { masterData } = req.body;
        const result = await masterModel.insertMaster(masterData);
        res.status(200).json(result);

    } catch (error) {
        console.log('Error insert_Master Controller :', error);
        res.status(500).send('Internal Server Error');
    }
}

// updater Master
exports.update_Master = async (req, res) => {
    try {
        const { masterData } = req.body;
        const result = await masterModel.updateMaster(masterData);
        res.status(200).json(result);

    } catch (error) {
        console.log('Error Update_Master Controller :', error);
        res.status(500).send('Internal Server Error');
    }
}


// updater Master Stock
exports.update_MasterStock = async (req, res) => {
    try {
        const { MS_ID, Stock_Qty } = req.body;
        const result = await masterModel.updateMasterStock(MS_ID, Stock_Qty);
        res.status(200).json(result);

    } catch (error) {
        console.log('Error Update_Master Controller :', error);
        res.status(500).send('Internal Server Error');
    }
}