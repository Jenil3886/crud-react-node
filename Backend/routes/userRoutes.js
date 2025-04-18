import express from "express";
const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
	try {
		const [results] = await req.pool.query(`SELECT * FROM ${process.env.DB_TABLENAME}`);
		res.json(results);
	} catch (error) {
		// Basic error handling
		console.error("Error fetching users:", error.message);
		res.status(500).send("Internal server error");
	}
});

// Get user by ID
router.get("/:id", async (req, res) => {
	const { id } = req.params;

	try {
		// Fetch the user by ID
		const [results] = await req.pool.query(`SELECT * FROM ${process.env.DB_TABLENAME} WHERE id = ?`, [id]);

		// If no user is found, return a 404 response
		if (results.length === 0) {
			return res.status(404).json({ error: "User not found" });
		}

		// Return the user details
		res.json(results[0]);
	} catch (error) {
		// Basic error handling
		console.error("Error fetching user details:", error.message);
		res.status(500).send("Internal server error");
	}
});

// Create a new user
router.post("/", async (req, res) => {
	const { name, email, age, number } = req.body;

	// Check if any field is missing or empty
	if (!name || !email || !age || !number || name === "" || email === "" || age === "" || number === "") {
		return res.status(400).send("All fields are required");
	}

	try {
		// Check if the user already exists
		const [checkResults] = await req.pool.query(`SELECT COUNT(*) AS count FROM ${process.env.DB_TABLENAME} WHERE email = ?`, [email]);
		if (checkResults[0].count > 0) {
			return res.status(409).send("User already exists");
		}

		// Create the new user
		const [insertResults] = await req.pool.query(`INSERT INTO ${process.env.DB_TABLENAME} (name, email, age, number) VALUES (?, ?, ?, ?)`, [
			name,
			email,
			age,
			number,
		]);

		// Send a success response
		res.status(201).json({ id: insertResults.insertId, name, email, age, number });
	} catch (error) {
		// Basic error handling
		console.error("Error inserting data:", error.message);
		res.status(500).send("Internal server error");
	}
});

// Update a user
router.put("/:id", async (req, res) => {
	const { id } = req.params; // Extract id from URL parameters
	const { name, email, age, number } = req.body; // Extract updated fields from request body

	// Check if any field is missing or empty
	if (!name || !email || !age || !number || name === "" || email === "" || age === "" || number === "") {
		return res.status(400).send("All fields are required");
	}

	try {
		// Check if the user exists
		const [checkIfUserExists] = await req.pool.query(`SELECT COUNT(*) AS count FROM ${process.env.DB_TABLENAME} WHERE id = ?`, [id]);

		if (checkIfUserExists[0].count === 0) {
			return res.status(404).send("User does not exist.");
		}

		// Update the user
		await req.pool.query(`UPDATE ${process.env.DB_TABLENAME} SET name = ?, email = ?, age = ?, number = ? WHERE id = ?`, [
			name,
			email,
			age,
			number,
			id,
		]);

		// Send a success response
		res.status(200).json({ id, name, email, age, number });
	} catch (error) {
		// Basic error handling
		console.error("Error updating data:", error.message);
		res.status(500).send("Internal server error");
	}
});

// Delete a user
router.delete("/:id", async (req, res) => {
	const { id } = req.params; // Extract id from URL parameters

	// Check if the id exists in the database
	if (!id) {
		return res.status(400).send("User ID is required");
	}

	try {
		// Check if the user exists
		const [checkIfUserExists] = await req.pool.query(`SELECT COUNT(*) AS count FROM ${process.env.DB_TABLENAME} WHERE id = ?`, [id]);

		if (checkIfUserExists[0].count === 0) {
			return res.status(404).send("User does not exist.");
		}

		// Delete the user
		await req.pool.query(`DELETE FROM ${process.env.DB_TABLENAME} WHERE id = ?`, [id]);

		// Send a success response
		res.status(200).send(`User with ID ${id} deleted successfully`);
	} catch (error) {
		// Basic error handling
		console.error("Error deleting data:", error.message);
		res.status(500).send("Internal server error");
	}
});

export default router;
