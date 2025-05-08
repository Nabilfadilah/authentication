import {useNavigate, NavLink} from "react-router-dom";
import {useAuth} from "../context/AuthContext"; // buat context auth sesuai kebutuhan
import ButtonAll from "../components/elements/button/Index";
import {BiHomeAlt, BiLogOut} from "react-icons/bi";
import {FaUserGear} from "react-icons/fa6";
import {AiOutlineProfile} from "react-icons/ai";

export default function Sidebar({isOpen, onClose}) {
  const navigate = useNavigate(); // hook untuk navigasi programatik
  const {user, logout} = useAuth(); // mengakses user dan fungsi logout dari context

  const role = user?.role; // mendapatkan peran user (admin/user)

  // membuat array navItems berisi menu navigasi default yang selalu ditampilkan,
  const navItems = [
    {name: "Dashboard", path: "/dashboard", icon: <BiHomeAlt />},
  ];

  // mengecek role user untuk menentukan menu tambahan yang akan ditampilkan di sidebar.
  // jika user memiliki role "admin", maka akan diberikan akses ke dua menu tambahan:
  if (role === "admin") {
    navItems.push({
      name: "User List",
      path: "/users",
      icon: <FaUserGear />,
    });
    navItems.push({
      name: "Biodata List",
      path: "/biodata",
      icon: <AiOutlineProfile />,
    });
  }
  // jika role-nya adalah "user" biasa, maka hanya diberikan akses ke 1 menu:
  else if (role === "user") {
    navItems.push({
      name: "Biodata",
      path: "/biodata",
      icon: <AiOutlineProfile />,
    });
  }

  // fungsi logout
  const handleLogout = async () => {
    await logout();
    navigate("/login"); // arahkan ke halaman login setelah logout
  };

  return (
    <div
      className={`fixed inset-0 z-40 flex transition-transform duration-300 ${
        isOpen ? "" : "hidden"
      } md:static md:inset-auto md:translate-x-0 md:flex`}
    >
      {/* overlay hitam untuk mode mobile */}
      <div
        className="fixed inset-0 bg-black opacity-50 md:hidden"
        onClick={onClose}
      ></div>

      {/* kontainer sidebar */}
      <div className="w-64 bg-gray-900 text-white z-50 h-full flex flex-col">
        {/* header sidebar */}
        <div className="p-6 text-2xl font-bold border-b border-gray-700">
          Dashboard Panel
        </div>

        {/* menu navigasi */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({isActive}) =>
                `flex items-center gap-3 py-2 px-4 rounded hover:bg-gray-700 ${
                  isActive ? "bg-gray-800 font-semibold" : ""
                }`
              }
              onClick={onClose} // menutup sidebar saat link diklik (untuk mobile)
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* tombol logout */}
        <div className="p-4 border-t border-gray-700">
          <ButtonAll
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 flex items-center justify-center gap-2"
          >
            <BiLogOut className="text-lg" />
            Logout
          </ButtonAll>
        </div>
      </div>
    </div>
  );
}
