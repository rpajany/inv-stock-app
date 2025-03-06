const pickListModel = require('../models/pickList_model');

exports.insert_PickList = async (req, res) => {
    try {
        const { pickListData } = req.body;
        const result = await pickListModel.insert_PickListModel(pickListData);
        res(200).json(result);

    } catch (error) {
        console.log('Error insert_PickList Controller : ', error);
        res.status(500).send('Internal Server Error');
    }
}

exports.update_PickList = async (req, res) => {
    try {
        const { pickListData } = req.body;
        const result = await pickListModel.update_PickListModel(pickListData);
        res(200).json(result);

    } catch (error) {
        console.log('Error update_PickList Controller : ', error);
        res.status(500).send('Internal Server Error');
    }
}

exports.delete_PickList = async (req, res) => {
    try {
        const { PK_ID } = req.params;
        const result = await pickListModel.delete_PickListModel(PK_ID);
        res(200).json(result);

    } catch (error) {
        console.log('Error delete_PickList Controller : ', error);
        res.status(500).send('Internal Server Error');
    }
}