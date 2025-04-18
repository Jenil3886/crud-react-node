import mysql from "mysql2/promise"; // Use mysql2/promise for async/await support
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// The async function to connect to the database using credentials from environment variables
const ConnectDB = async () => {
	const pool = await mysql.createPool({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		waitForConnections: true,
		connectionLimit: 10,
		queueLimit: 0,
	});

	// Create the database if it doesn't exist
	await pool.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_DATABASE}\``);
	console.log(`Database ${process.env.DB_DATABASE} created or already exists.`);

	// Switch to the newly created database
	await pool.query(`USE \`${process.env.DB_DATABASE}\``);
	console.log(`Switched to database ${process.env.DB_DATABASE}`);

	// Create the 'users' table if it doesn't exist
	await pool.query(`CREATE TABLE IF NOT EXISTS \`${process.env.DB_TABLENAME}\` (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
	console.log(`${process.env.DB_TABLENAME} table created or already exists.`);

	// Return the pool for further queries
	return pool;
};

// Export the function using ES Module syntax
export default ConnectDB;
