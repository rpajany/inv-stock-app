const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',   // MySQL host
    port: process.env.DB_PORT || 3306,         // MySQL port (if different from the default 3306)
    user: process.env.DB_USER || 'root',         // MySQL username
    password: process.env.DB_PASSWORD || '',   // MySQL password
    database: process.env.DB_NAME || 'stock_app', // Your database name
    waitForConnections: true,
    connectionLimit: process.env.DB_CONNECTION_LIMIT || 20,  // Connection pool limit
    queueLimit: 0,
    charset: 'utf8mb4', // Supports emojis and extended characters
    connectTimeout: 10000, // 10 seconds timeout
    multipleStatements: true // Allow multiple SQL statements per query
});



// Test the connection
async function testDbConnection() {
    try {
        const connection = await db.getConnection(); // Get a connection from the pool
        console.log('✅ Database connection successful.');
        connection.release(); // Release the connection back to the pool
    } catch (err) {
        console.error('❌ Database connection failed:', err.message);
    }
}

// Call the test function
if (process.env.NODE_ENV !== 'production') {
    testDbConnection(); // Only test DB connection in development mode
}

/* 

🚀 Improve Error Logging & Graceful Shutdown

If the app crashes, properly close the database pool.
Log detailed errors for debugging.
✅ Solution - Handle Connection Pool Errors Gracefully

*/
// Graceful shutdown
const shutdownDb = async () => {
    console.log('🔻 Closing database connection pool...');
    await db.end();
    console.log('✅ Database pool closed.');
    process.exit(0);
};

process.on('SIGINT', shutdownDb);
process.on('SIGTERM', shutdownDb);
process.on('uncaughtException', (err) => {
    console.error('🔥 Uncaught Exception:', err);
    shutdownDb();
});

// Exporting as an object: the database pool using CommonJS 
module.exports = { db }; // Export the connection pool