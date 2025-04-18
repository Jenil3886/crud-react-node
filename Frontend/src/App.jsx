import { useState, useEffect } from "react";
import axios from "axios";
import AddUserForm from "./components/AddUserForm";
import UserList from "./components/UserList";
import "./App.css";
import { X } from "lucide-react";

function App() {
	const [users, setUsers] = useState([]);
	const [selectedUser, setSelectedUser] = useState(null);

	// Fetch users from the backend
	useEffect(() => {
		axios
			.get("http://localhost:3000/api/users")
			.then((response) => setUsers(response.data))
			.catch((error) => {
				console.error("Error fetching users:", error.message);
				console.error("Error details:", error);
			});
	}, []);

	// Add or update a user
	const saveUser = (user) => {
		if (user.id) {
			// Update user
			axios
				.put(`http://localhost:3000/api/users/${user.id}`, user) // Send updated user data to the backend
				.then(() => {
					// Fetch the latest data from the backend
					axios
						.get("http://localhost:3000/api/users")
						.then((response) => setUsers(response.data))
						.catch((error) => console.error("Error fetching updated users:", error.message));

					alert("User updated successfully!");
					setSelectedUser(null); // Clear the selected user after updating
				})
				.catch((error) => {
					console.error("Error updating user:", error.message);
					alert("Failed to update user.");
				});
		} else {
			// Add new user
			axios
				.post("http://localhost:3000/api/users", user) // Send new user data to the backend
				.then((response) => {
					if (response.data && response.data.id) {
						setUsers([...users, response.data]); // Add the new user to the list
					} else {
						console.error("Invalid response from the server:", response.data);
					}
				})
				.catch((error) => console.error("Error adding user:", error));
		}
	};

	// Delete a user
	const deleteUser = (id) => {
		axios
			.delete(`http://localhost:3000/api/users/${id}`)
			.then(() => setUsers(users.filter((user) => user.id !== id)))
			.catch((error) => console.error("Error deleting user:", error));
	};

	return (
		<div className="App max-w-5xl mx-auto px-4 py-8">
			<h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8 tracking-tight">🚀 User Management Dashboard</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* Left: Add or Update User Form */}
				<div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
					<h2 className="text-xl font-semibold text-gray-800 mb-4">{selectedUser ? "✏️ Update User" : "➕ Add User"}</h2>
					<AddUserForm saveUser={saveUser} selectedUser={selectedUser} clearSelectedUser={() => setSelectedUser(null)} />
				</div>

				{/* Right: User List */}
				<div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 ">
					<h2 className="text-xl font-semibold text-gray-800 mb-4">👥 User List</h2>
					<UserList users={users} deleteUser={deleteUser} setSelectedUser={setSelectedUser} />
				</div>
			</div>

			{/* Bottom: Selected User */}
			{selectedUser && (
				<div className="mt-8 max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md border border-gray-200">
					<div className=" flex justify-between">
						<h3 className="text-2xl font-bold text-blue-600 flex items-center gap-2 mb-4">👤 Selected User</h3>
						<X className="hover:bg-red-100 rounded-full p-0.5 duration-200 " onClick={() => setSelectedUser(null)} />
					</div>
					<div className="space-y-2 text-gray-700">
						<p>
							<span className="font-semibold">👤 Name:</span> {selectedUser.name}
						</p>
						<p>
							<span className="font-semibold">📧 Email:</span> {selectedUser.email}
						</p>
						<p>
							<span className="font-semibold">🎂 Age:</span> {selectedUser.age} years
						</p>
						<p>
							<span className="font-semibold">📱 Mobile:</span> {selectedUser.number}
						</p>
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
