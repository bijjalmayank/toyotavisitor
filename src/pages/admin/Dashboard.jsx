import UsersList from "./UsersList";

export default function AdminDashboard() {
    const logout = () => {
        localStorage.removeItem("vss_user");
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-black text-white p-4">
            <div className="flex justify-between mb-4">
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
                <button onClick={logout} className="bg-red-600 px-3 py-1 rounded">Logout</button>
            </div>

            <UsersList />
        </div>
    );
}
