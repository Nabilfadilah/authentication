import {useAuth} from "../context/AuthContext";
import {Link, useNavigate} from "react-router-dom";

const Dashboard = () => {
  const {user, logout} = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <p className="text-gray-600">
          Selamat datang, <span className="font-semibold">{user?.name}</span>
        </p>
        <p className="text-gray-500">
          Role: <span className="font-medium">{user?.role}</span>
        </p>
      </div>

      {/* Tombol Navigasi */}
      <div className="flex gap-4">
        <Link
          to="/biodata"
          className="bg-blue-600 text-white text-sm px-4 py-1 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Biodata
        </Link>

        {user.role === "admin" && (
          <Link
            to="/users"
            className="bg-green-600 text-white text-sm px-4 py-1 rounded-lg hover:bg-green-700 transition duration-200"
          >
            Users
          </Link>
        )}

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white text-sm px-4 py-1 rounded-lg hover:bg-red-700 transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
