const { db } = require('../config/db'); // import an db object
const moment = require('moment');

// load all
exports.load_TransModel = async (StartDate, EndDate) => {
    try {
        // Ensure dates are properly formatted
        const startDateFormatted = moment(StartDate, 'DD-MM-YYYY').startOf('day').format('YYYY-MM-DD HH:mm:ss');
        const endDateFormatted = moment(EndDate, 'DD-MM-YYYY').endOf('day').format('YYYY-MM-DD HH:mm:ss');

        const [rows] = await db.query('SELECT * FROM tbl_transaction WHERE Date_Transact BETWEEN ? AND ? ORDER BY TR_ID DESC', [startDateFormatted, endDateFormatted]);

        const formattedData = rows.map((row) => ({
            ...row,
            Date_Transact: moment(row.Date_Transact).format('DD-MM-YYYY'),
        }));

        return formattedData; // rows

        // Return data
        // return {
        //     success: true,
        //     message: `Successfully Get_AllAuditDetail : ${formattedData}`,
        //     data: formattedData,
        // };
    } catch (error) {
        console.log('Error load_TransModel : ', error);
        // Optionally throw the error to the controller
        return {
            success: false,
            message: error.message
        };
    }
}


// insert
exports.insert_TransactModel = async (masterData) => {
    try {
        // Destructure the transact details
        const { Part_Number, Description, Stock_Qty, Type, Transact_Qty, Hand_Qty } = masterData;
        // Execute the query with parameterized values
        const [result] = await db.query(`INSERT INTO tbl_transaction
            (Part_Number, Description, Stock_Qty, Type, Transact_Qty, Hand_Qty)
            VALUES (?,?,?,?,?,?)`,
            [Part_Number, Description, Stock_Qty, Type, Transact_Qty, Hand_Qty]
        );
        // Return the newly inserted ID
        return {
            success: true,
            insertId: result.insertId,
            message: 'Transaction inserted successfully.',
        };

    } catch (error) {
        console.log('Error insert_TransModel Model : ', error);
        // Optionally throw the error to the controller
        return {
            success: false,
            message: error.message
        };
    }
}