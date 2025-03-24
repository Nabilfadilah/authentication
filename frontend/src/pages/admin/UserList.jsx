// Mengimpor hook dan module yang diperlukan
import {useEffect, useState} from "react"; // useEffect untuk menjalankan efek samping, useState untuk menyimpan data user
import {useAuth} from "../../context/AuthContext"; // mengambil data user dari context autentikasi
import axiosInstance from "../../utils/axiosInstance"; // import instance Axios untuk melakukan request API
import {Link, useNavigate} from "react-router-dom";

const UserList = () => {
  // mengambil data user yang sedang login dan token autentikasi dari context
  const {user, token} = useAuth();

  // state untuk menyimpan daftar user
  const [userAll, setUserAll] = useState([]);

  const navigate = useNavigate();

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

  // fungsi untuk menangani edit user
  const handleEdit = (id) => {
    navigate(`/users/${id}`); // arahkan pengguna ke halaman edit user berdasarkan ID
  };

  // fungsi untuk menangani penghapusan user
  const handleDelete = async (id) => {
    // konfirmasi sebelum menghapus user
    const confirmDelete = window.confirm("Yakin ingin menghapus user ini?");
    if (!confirmDelete) return;

    try {
      // kirim permintaan DELETE ke server dengan menyertakan token otorisasi
      await axiosInstance.delete(`/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("User berhasil dihapus"); // beri notifikasi bahwa user berhasil dihapus
      fetchUsers(); // refresh daftar user setelah penghapusan
    } catch (err) {
      console.error("Gagal menghapus user:", err);
      alert("Gagal menghapus user"); // beri notifikasi jika penghapusan gagal
    }
  };
  return (
    <div className="p-4">
      {/* judul halaman */}
      <h2 className="text-xl font-bold mb-4">Daftar User</h2>

      {/* menampilkan daftar user dalam bentuk list */}
      <ul className="space-y-2">
        {userAll.map((u) => (
          <li
            key={u.id}
            className="border p-3 rounded flex justify-between items-center"
          >
            {/* menampilkan nama, email, dan role */}
            <div>
              <p className="font-semibold">{u.name}</p>
              <p className="text-sm text-gray-600">{u.email}</p>
              <p className="text-sm text-gray-500 italic">Role: {u.role}</p>
            </div>

            {/* Tombol aksi untuk edit, delete, dan reset password */}
            <div className="flex gap-2">
              {/* Tombol Edit */}
              <button
                onClick={() => handleEdit(u.id)}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
              >
                Edit
              </button>

              {/* Tombol Delete */}
              <button
                onClick={() => handleDelete(u.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
