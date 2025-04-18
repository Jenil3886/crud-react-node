// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors"; // Import cors
// import db from "./models/db.js"; // Import database connection
// import userRoutes from "./routes/userRoutes.js"; // Import user routes

// dotenv.config(); // Load environment variables

// const app = express();
// const port = process.env.PORT || 3000;

// // Middleware to parse JSON
// app.use(express.json());

// // Enable CORS
// app.use(cors({ origin: "http://localhost:5173" })); // Allow requests from the frontend

// // Test database connection
// db.getConnection((err, connection) => {
// 	if (err) {
// 		console.error("Error connecting to the database:", err.message);
// 		process.exit(1); // Exit the process if the connection fails
// 	}
// 	console.log("Connected to the MySQL database.");
// 	connection.release(); // Release the connection back to the pool
// });

// // Use routes
// app.use("/api/users", userRoutes);

// app.listen(port, () => {
// 	console.log(`Server is running on http://localhost:${port}`);
// });

//importing express, environmental variables, bodyparser, router, database connection function and declaring them in a varibale to be using it in our index.js file

// import cors from "cors"; // Import cors
// import db from "./models/db.js"; // Import database connection
// import userRoutes from "./routes/userRoutes.js"; // Import user routes
// const router = require("./routes/DBOperRoutes");

// import express from "express";
// import dotenv from "dotenv";
// import ConnectDB from "./models/db";
// const app = express();
// const bodyParser = require("body-parser");"
// const cors = require("cors");

import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./models/db.js"; // assuming you're using .js extension
import userRoutes from "./routes/userRoutes.js";
import bodyParser from "body-parser";
import cors from "cors";
dotenv.config();
const app = express();
//using the port in environmental variable or 5000
const port = process.env.PORT || 5000;

// middleware to parse incoming request in bodies
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// initialize the database connection pool
let pool;

(async () => {
	pool = await ConnectDB();

	// pass the pool to the routes
	app.use((req, res, next) => {
		req.pool = pool;
		next();
	});

	// use the router
	app.use("/api/users", userRoutes);

	// start the server
	app.listen(port, () => {
		console.log(`Example app listening on port http://localhost:${port}`);
	});
})();
