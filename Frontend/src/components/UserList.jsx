import { Trash2, UserPen } from "lucide-react";
import "../App.css";

function UserList({ users, deleteUser, setSelectedUser, getUser }) {
	return (
		<div className="p-3 bg-white rounded-2xl shadow-md max-w-2xl mx-auto max-h-[524px] overflow-y-auto custom-scrollbar">
			<h2 className="text-2xl font-bold mb-4 text-gray-800">User List</h2>
			<ul className="space-y-4">
				{users.map((user) => (
					<li
						key={user.id}
						className="flex justify-between items-center p-4 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-200 cursor-pointer shadow-sm"
						onClick={() => getUser(user.id)}
					>
						<div>
							<div className="space-y-1">
								<p className="text-xl font-semibold text-gray-800">{user.name}</p>
								<p className="text-sm text-gray-500">📧 {user.email}</p>
								<p className="text-sm text-gray-500">
									🎂 {user.age} years old &nbsp; | &nbsp; 📱 Mo. {user.number}
								</p>
							</div>
						</div>

						{/* Right Side */}
						<div className="flex gap-3">
							<button
								onClick={(e) => {
									e.stopPropagation(); // Prevent triggering the parent onClick
									setSelectedUser(user); // Pass the selected user to the parent
								}}
								className="p-2 rounded-full bg-green-200 hover:bg-green-100 transition-colors"
								title="Edit user"
							>
								<UserPen className="w-5 h-5 text-green-600" />
							</button>
							<button
								onClick={(e) => {
									e.stopPropagation(); // Prevent triggering the parent onClick
									deleteUser(user.id);
								}}
								className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition-colors"
								title="Delete user"
							>
								<Trash2 className="w-5 h-5 text-red-600" />
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}

export default UserList;
