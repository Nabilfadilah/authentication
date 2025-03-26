import {useEffect, useState} from "react";
import {useParams, useNavigate, Link} from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import {useAuth} from "../../context/AuthContext";

const EditUser = () => {
  const {id} = useParams(); // mengambil ID user dari URL
  const navigate = useNavigate();
  const {user, token} = useAuth(); // mengambil data user yang sedang login dan token otorisasi

  // state untuk menyimpan data form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });

  const [error, setError] = useState(""); // state untuk menangani error

  // ambil data user berdasarkan ID ketika komponen pertama kali dimuat
  useEffect(() => {
    // fungsi async untuk mengambil data user berdasarkan ID dari parameter URL
    const fetchUser = async () => {
      try {
        // melakukan request GET ke endpoint API untuk mengambil data user
        const res = await axiosInstance.get(`/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // mengirim token autentikasi dalam header
          },
        });

        // menyimpan data user yang didapat ke dalam state formData
        const selectedUser = res.data;
        setFormData((prev) => ({
          ...prev, // menjaga nilai state sebelumnya
          name: selectedUser.name, // mengisi nama user
          email: selectedUser.email, // mengisi email user
          role: selectedUser.role, // mengisi role user
        }));
      } catch (err) {
        // jika terjadi error saat mengambil data, set pesan error
        setError("Gagal mengambil data user");
      }
    };

    // memanggil fungsi fetchUser saat ID user berubah
    fetchUser();
  }, [id]); // dependency array memastikan data diambil setiap kali ID berubah

  // fungsi untuk menangani perubahan input pada form
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  // fungsi untuk menangani submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // menentukan data yang akan dikirim berdasarkan role user
      const updatePayload = {
        name: formData.name,
        email: formData.email,
        role: user.role === "admin" ? formData.role : undefined, // role hanya bisa diubah oleh admin
      };

      // kirim request update ke server
      await axiosInstance.put(`/user/${id}/edit`, updatePayload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("User berhasil diperbarui");
      navigate("/users"); // redirect ke halaman daftar user setelah update berhasil
    } catch (err) {
      setError(err.response?.data?.message || "Gagal update user"); // menangani error jika gagal update
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Edit User</h2>
        <Link
          to={"/users"}
          className="px-4 py-1 bg-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-400"
        >
          Back
        </Link>
      </div>
      {/* tampilkan pesan error jika ada */}
      {error && <p className="text-red-600 mb-2">{error}</p>}{" "}
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* input untuk Nama */}
        <div>
          <label>Nama</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

        {/* input untuk Email */}
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

        {/* Dropdown Role, hanya ditampilkan jika user yang login adalah admin */}
        {user.role === "admin" && (
          <div>
            <label>Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        )}

        {/* tombol Simpan Perubahan */}
        <button
          type="submit"
          className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
};

export default EditUser;
