// Mengimpor hook dan module yang diperlukan
import {useEffect, useState} from "react"; // useEffect untuk menjalankan efek samping, useState untuk menyimpan data user
import {useAuth} from "../../context/AuthContext"; // mengambil data user dari context autentikasi
import axiosInstance from "../../utils/axiosInstance"; // import instance Axios untuk melakukan request API

const UserList = () => {
  // mengambil data user yang sedang login dan token autentikasi dari context
  const {user, token} = useAuth();

  // state untuk menyimpan daftar user
  const [userAll, setUserAll] = useState([]);

  // useEffect akan berjalan setiap kali user berubah
  useEffect(() => {
    if (user?.role === "admin") {
      fetchUsers(); // jika user adalah admin, ambil data user dari API
    }
  }, [user]); // dependensi: user (akan dipanggil ulang jika user berubah)

  // fungsi untuk mengambil daftar user dari API
  const fetchUsers = async () => {
    try {
      // mengirim request GET ke endpoint "/users" dengan menyertakan token autentikasi
      const res = await axiosInstance.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`, // menambahkan token ke header untuk otorisasi
        },
      });

      console.log("Data user:", res.data); // debugging untuk melihat data yang diterima

      setUserAll(res.data.users); // menyimpan daftar user ke dalam state
    } catch (err) {
      console.error("Gagal mengambil data user:", err); // menampilkan error jika gagal mengambil data
    }
  };

  // jika user bukan admin, tampilkan pesan akses terbatas
  if (user?.role !== "admin") {
    return <p>Hanya admin yang bisa melihat data user.</p>;
  }

  return (
    <div className="p-4">
      {/* judul halaman */}
      <h2 className="text-xl font-bold mb-4">Daftar User</h2>

      {/* menampilkan daftar user dalam bentuk list */}
      <ul className="space-y-2">
        {userAll.map((u) => (
          <li key={u.id}>
            {/* menampilkan nama, email, dan role */}
            {u.name} - {u.email} ({u.role}){" "}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
