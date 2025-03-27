import {useAuth} from "../context/AuthContext";
import {Link, useNavigate} from "react-router-dom";
import Typography from "../components/elements/text/Typography";
import ButtonAll from "../components/elements/button/Index";

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
        <Typography className="text-2xl font-bold text-gray-800">
          Dashboard
        </Typography>
        <Typography className="text-gray-600">
          Selamat datang, <span className="font-semibold">{user?.name}</span>
        </Typography>
        <Typography className="text-gray-500">
          Role: <span className="font-medium">{user?.role}</span>
        </Typography>
      </div>

      {/* Tombol Navigasi */}
      <div className="flex gap-4">
        <ButtonAll className="bg-blue-700 hover:bg-blue-800">
          <Link to="/biodata">Biodata</Link>
        </ButtonAll>

        {user.role === "admin" && (
          <ButtonAll className="bg-green-700 hover:bg-green-800">
            <Link to="/users">Users</Link>
          </ButtonAll>
        )}

        <ButtonAll
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 transition duration-200"
        >
          Logout
        </ButtonAll>
      </div>
    </div>
  );
};

export default Dashboard;
