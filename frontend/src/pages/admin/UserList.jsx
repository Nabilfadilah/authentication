// Mengimpor hook dan module yang diperlukan
import {useEffect, useState} from "react"; // useEffect untuk menjalankan efek samping, useState untuk menyimpan data user
import {useAuth} from "../../context/AuthContext"; // mengambil data user dari context autentikasi
import axiosInstance from "../../utils/axiosInstance"; // import instance Axios untuk melakukan request API
import {Link, useNavigate} from "react-router-dom";
import {FaEdit, FaTrash, FaRedo} from "react-icons/fa";
import Typography from "../../components/elements/text/Typography";
import ButtonAll from "../../components/elements/button/Index";
import {BiArrowBack} from "react-icons/bi";

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
    <div className="p-6 bg-white shadow-md rounded-lg">
      {/* judul halaman */}
      <div className="flex items-center justify-between mb-4">
        <Typography className="text-xl font-bold">
          Daftar User Register
        </Typography>
      </div>

      {/* menampilkan daftar user dalam bentuk list */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-2 px-4 border text-start">No.</th>
              <th className="py-2 px-4 border text-start">Nama</th>
              <th className="py-2 px-4 border text-start">Email</th>
              <th className="py-2 px-4 border text-start">Role</th>
              <th className="py-2 px-4 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {userAll.map((user, index) => (
              <tr
                key={user.id}
                className="text-center border-b hover:bg-gray-100"
              >
                <td className="py-2 px-4 border w-11 text-center">
                  {index + 1}.
                </td>

                {/* menampilkan nama, email, dan role */}
                <td className="py-2 px-4 border font-semibold text-start">
                  {user.name}
                </td>
                <td className="py-2 px-4 border text-gray-600 text-start">
                  {user.email}
                </td>
                <td className="py-2 px-4 border text-gray-500 italic text-start">
                  {user.role}
                </td>

                {/* tombol Aksi */}
                <td className="py-2 px-4 border flex justify-center gap-2">
                  {/* tombol edit */}
                  <ButtonAll
                    onClick={() => handleEdit(user.id)}
                    className="bg-blue-600  hover:bg-blue-700 flex items-center gap-1"
                  >
                    <FaEdit /> Edit
                  </ButtonAll>

                  {/* tombol delete */}
                  <ButtonAll
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-600  hover:bg-red-700 text-sm flex items-center gap-1"
                  >
                    <FaTrash /> Delete
                  </ButtonAll>

                  {/* link reset password */}
                  <ButtonAll className="bg-yellow-600 hover:bg-yellow-700">
                    <Link
                      to={`/admin/reset-password/${user.id}`}
                      className="flex items-center gap-2"
                    >
                      <FaRedo /> Reset
                    </Link>
                  </ButtonAll>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
