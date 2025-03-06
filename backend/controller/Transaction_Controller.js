const transactionModel = require('../models/transaction_model');


// load
exports.load_Transaction = async (req, res) => {
    try {
        const { StartDate, EndDate } = req.body;
        const transactData = await transactionModel.load_TransModel(StartDate, EndDate);
        // console.log('Load All transactData :', transactData)
        res.status(200).json(transactData);

    } catch (error) {
        console.log('Error load_Transaction Controller :', error);
        res.status(500).send('Internal Server Error');
    }
}

// insert
exports.insert_Transaction = async (req, res) => {
    try {
        const { masterData } = req.body;
        // console.log('masterData', masterData);

        const result = await transactionModel.insert_TransactModel(masterData);
        res.status(200).json(result);

    } catch (error) {
        console.log('Error Save_Transaction Controller :', error);
        res.status(500).send('Internal Server Error');
    }
}