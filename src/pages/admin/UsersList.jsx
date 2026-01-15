import { useEffect, useState } from "react";
import {
    getAllUsers,
    deleteUser,
} from "../../services/sheetsApi";

export default function UsersList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        setLoading(true);
        const res = await getAllUsers();
        if (res.status === "OK") {
            setUsers(res.data);
        }
        setLoading(false);
    };

    const handleDelete = async (employee_id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        await deleteUser(employee_id);
        setUsers((prev) =>
            prev.filter((u) => u.employee_id !== employee_id)
        );
    };

    return (
        <div className="space-y-3">
            <h2 className="text-lg font-bold mb-2">All Users</h2>

            {loading && (
                <p className="text-white/60">Loading users...</p>
            )}

            {users.map((u) => (
                <div
                    key={u.user_id}
                    className="flex justify-between items-center border border-white/10 rounded-xl p-3 bg-white/5 backdrop-blur"
                >
                    <div>
                        <p className="font-semibold">{u.employee_name}</p>
                        <p className="text-xs text-white/60">
                            {u.username} • {u.role.toUpperCase()}
                        </p>
                        <p className="text-xs text-white/40">
                            {u.department}
                        </p>
                    </div>

                    <button
                        onClick={() => handleDelete(u.employee_id)}
                        className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-sm"
                    >
                        Delete
                    </button>
                </div>
            ))}

            {users.length === 0 && !loading && (
                <p className="text-white/60 text-sm">
                    No users found
                </p>
            )}
        </div>
    );
}
