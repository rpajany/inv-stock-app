const { db } = require('../config/db'); // import an db object

exports.insert_PickListModel = async (pickListData) => {
    try {
        // Destructure the PickList data
        const { Part_Number, Description, Pick_Qty, Location } = pickListData;
        // Execute the query with parameterized values
        const [result] = await db.query(`INSERT INTO tbl_picklist
            (Part_Number, Description, Pick_Qty, Location)
            VALUES (?,?,?,?)`,
            [Part_Number, Description, Pick_Qty, Location]
        );
        // Return the newly inserted ID
        return {
            success: true,
            insertId: result.insertId,
            message: 'PickList inserted successfully.',
        };
    } catch (error) {
        console.error('Error insert_PickList Model :', error);
        // Optionally throw the error to the controller
        return {
            success: false,
            message: error.message,
        };
    }
}

// update
exports.update_PickListModel = async (pickListData) => {
    try {
        // Destructure the PickList data
        const { PK_ID, Status, Date_Put } = pickListData;
        const [rows] = await db.query('UPDATE tbl_picklist SET Status=?, Date_Put=? WHERE PK_ID=?', [Status, Date_Put, PK_ID]);

        // Return data
        return {
            success: true,
            message: `Successfully Update_PickListModel: ${rows}`,
            data: rows,
        };

    } catch (error) {
        console.error('Error update_PickList Model :', error);
        // Optionally throw the error to the controller
        return {
            success: false,
            message: error.message,
        };
    }
}

// update
exports.delete_PickListModel = async (PK_ID) => {
    try {
        const [result] = await db.query('DELETE FROM tbl_picklist WHERE PK_ID = ?', [PK_ID]);

        // Check if rows were affected
        if (result.affectedRows === 0) {
            throw new Error(`No record found in tbl_picklist with PK_ID: ${PK_ID}`);
        }

        // Return confirmation or affected rows
        return {
            success: true,
            message: `Successfully deleted PickList with PK_ID: ${PK_ID}`,
            affectedRows: result.affectedRows,
        };


    } catch (error) {
        console.error('Error delete_PickList Model :', error);
        // Optionally throw the error to the controller
        return {
            success: false,
            message: error.message,
        };
    }
}