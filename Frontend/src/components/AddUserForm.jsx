import { useState, useEffect } from "react";
import { User, Mail, Cake, Phone } from "lucide-react";

function AddUserForm({ saveUser, selectedUser, clearSelectedUser }) {
	const [user, setUser] = useState({ name: "", email: "", age: "", number: "" });

	// Populate the form with the selected user's data when editing
	useEffect(() => {
		if (selectedUser) {
			setUser(selectedUser);
		} else {
			setUser({ name: "", email: "", age: "", number: "" });
		}
	}, [selectedUser]);

	const handleSubmit = (e) => {
		e.preventDefault();
		saveUser(user);
		setUser({ name: "", email: "", age: "", number: "" });
		clearSelectedUser(); // Clear the selected user after saving
	};

	return (
		<form onSubmit={handleSubmit} className="max-w-md mx-auto p-8 bg-gray-50 rounded-2xl shadow-lg space-y-6">
			<h2 className="text-3xl font-bold text-blue-600 mb-4 text-center">{selectedUser ? "Update User" : " Add New User"}</h2>

			{/* Name */}
			<div>
				<label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
					<User className="w-4 h-4" /> Name
				</label>
				<input
					type="text"
					placeholder="John Doe"
					value={user.name}
					onChange={(e) => setUser({ ...user, name: e.target.value })}
					className="w-full px-4 py-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
					required
				/>
			</div>

			{/* Email */}
			<div>
				<label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
					<Mail className="w-4 h-4" /> Email
				</label>
				<input
					type="email"
					placeholder="email@example.com"
					value={user.email}
					onChange={(e) => setUser({ ...user, email: e.target.value })}
					className="w-full px-4 py-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
					required
				/>
			</div>

			{/* Age */}
			<div>
				<label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
					<Cake className="w-4 h-4" /> Age
				</label>
				<input
					type="number"
					placeholder="e.g. 25"
					value={user.age}
					onChange={(e) => setUser({ ...user, age: e.target.value })}
					className="w-full px-4 py-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
					required
				/>
			</div>

			{/* Number */}
			<div>
				<label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
					<Phone className="w-4 h-4" /> Mobile Number
				</label>
				<input
					type="tel"
					placeholder="e.g. 9876543210"
					value={user.number}
					onChange={(e) => setUser({ ...user, number: e.target.value })}
					className="w-full px-4 py-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
					required
				/>
			</div>

			{/* Submit */}
			<button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-200">
				{selectedUser ? "✏️ Update User" : "+ Add User"}
			</button>
		</form>
	);
}

export default AddUserForm;
