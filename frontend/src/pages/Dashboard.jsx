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
    <div>
      <h2>Dashboard</h2>
      <p>Selamat datang, {user?.name}</p>
      <p>Role: {user?.role}</p>
      <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm">
        <Link to={"/biodata"}>Biodata</Link>
        {/* <Link to={`/biodata/${user.id}`}>Biodata</Link> */}
      </button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
