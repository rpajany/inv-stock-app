const { db } = require('../config/db'); // import an db object

// Get all master
exports.getAllMaster = async () => {
    try {
        const [rows] = await db.query('SELECT * FROM tbl_master');
        // Return data
        return {
            success: true,
            message: `Successfully Load AllMaster : ${rows}`,
            data: rows
        }
    } catch (error) {
        console.error('Error Load AllMaster :', error);

        // Optionally throw the error to the controller
        return {
            success: false,
            message: error.message,
        };
    }
}

// get RackData
exports.getRackData = async (Rack) => {
    try {
        const [rows] = await db.query('SELECT * FROM tbl_master WHERE Rack=?', [Rack]);
        // Return data
        return {
            success: true,
            message: `Successfully Get RackData : ${rows}`,
            data: rows
        }
    } catch (error) {
        console.error('Error Get RackData :', error);

        // Optionally throw the error to the controller
        return {
            success: false,
            message: error.message,
        };
    }
}

// get item by partNumber
exports.get_ByPN = async (Part_Number) => {
    try {

        const [rows] = await db.query('SELECT * FROM tbl_master WHERE Part_Number=?', [Part_Number]);

        // Return data
        return {
            success: true,
            message: `Success getMaster_ByPN : ${rows}`,
            data: rows
        }
    } catch (error) {
        console.error('Error Load AllMaster :', error);
        // Optionally throw the error to the controller
        return {
            success: false,
            message: error.message,
        };
    }
}

exports.get_ByName = async (SearchObj) => {
    try {

        // console.log('SearchObj : ', SearchObj);

        const { Line, Machine, Classification, Part_Name } = SearchObj || {};

        const [rows = []] = await db.query('SELECT * FROM tbl_master WHERE Line=? AND Machine=? AND Classification=? AND Description=?',
            [Line?.trim() || '', Machine?.trim() || '', Classification?.trim() || '', Part_Name?.trim() || '']);

        // Return data
        return {
            success: true,
            message: `Success getMaster_ByName : ${JSON.stringify(rows, null, 2)}`,
            data: rows
        }
    } catch (error) {
        console.error('Error Load AllMaster :', error);
        // Optionally throw the error to the controller
        return {
            success: false,
            message: error.message || 'An unknown error occurred',
        };
    }
}

// insert 
exports.insertMaster = async (masterData) => {
    try {
        // Destructure the PickList data
        const { Rack, Part_Number, Description, Stock_Qty, Location } = masterData;
        // Execute the query with parameterized values
        const [result] = await db.query(`INSERT INTO tbl_master
            (Rack, Part_Number, Description, Stock_Qty, Location)
            VALUES (?,?,?,?,?)`,
            [Rack, Part_Number, Description, Stock_Qty, Location]
        );
        // Return the newly inserted ID
        return {
            success: true,
            insertId: result.insertId,
            message: 'Successfully insert Master.',
        };
    } catch (error) {
        console.error('Error insert_Master Model :', error);
        // Optionally throw the error to the controller
        return {
            success: false,
            message: error.message,
        };
    }
}

// update master
exports.updateMaster = async (masterData) => {
    try {
        // Destructure the PickList data
        const { MS_ID, Rack, Part_Number, Description, Stock_Qty, Location } = masterData;

        const [rows] = await db.query('UPDATE tbl_master SET Rack=?, Part_Number=?, Description=?, Stock_Qty=?, Location=? WHERE MS_ID=?',
            [Rack, Part_Number, Description, Stock_Qty, Location, MS_ID]);

        // Return data
        return {
            success: true,
            message: `Successfully UpdateMaster : ${rows}`,
            data: rows,
        };

    } catch (error) {
        console.error('Error UpdateMaster Model :', error);
        // Optionally throw the error to the controller
        return {
            success: false,
            message: error.message,
        };
    }
}

// update master Stock
exports.updateMasterStock = async (MS_ID, Stock_Qty) => {
    try {

        const [rows] = await db.query('UPDATE tbl_master SET Stock_Qty=? WHERE MS_ID=?',
            [Stock_Qty, MS_ID]);

        // Return data
        return {
            success: true,
            message: `Successfully Update_MasterStock : ${rows}`,
            data: rows,
        };

    } catch (error) {
        console.error('Error Update_MasterStock Model :', error);
        // Optionally throw the error to the controller
        return {
            success: false,
            message: error.message,
        };
    }
}