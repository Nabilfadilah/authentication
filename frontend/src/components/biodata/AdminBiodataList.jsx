// src/components/biodata/AdminBiodataList.jsx
import {useEffect, useState} from "react";
import axios from "../../utils/axiosInstance";
import {useAuth} from "../../context/AuthContext";
import {Link} from "react-router-dom";

const AdminBiodataList = () => {
  // ambil data user dan token dari context authentikasi
  const {user, token} = useAuth();

  // state untuk menyimpan daftar biodata semua pengguna
  const [biodataList, setBiodataList] = useState([]);

  // digunakan untuk mengambil data semua biodata saat komponen pertama kali dirender
  useEffect(() => {
    const fetchAll = async () => {
      try {
        // mengirim permintaan GET ke endpoint `/biodata` dengan menyertakan token untuk autentikasi
        const res = await axios.get("/biodata", {
          headers: {Authorization: `Bearer ${token}`},
        });

        // menyimpan data yang diperoleh ke dalam state biodataList
        setBiodataList(res.data);
      } catch (error) {
        console.error("Gagal mengambil data biodata:", error);
        setBiodataList([]); // jika terjadi error, set biodataList menjadi array kosong
      }
    };

    // memanggil fungsi fetchAll untuk mengambil data biodata semua pengguna
    fetchAll();
  }, [user]); // useEffect akan dijalankan ulang setiap kali 'user' berubah

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">List Biodata Semua User</h2>
        <Link
          to={"/dashboard"}
          className="px-4 py-1 bg-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-400"
        >
          Back
        </Link>
      </div>

      {/* Tabel Responsif */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
              <th className="py-2 px-4 border">Nama</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">No Telepon</th>
              <th className="py-2 px-4 border">Alamat</th>
              <th className="py-2 px-4 border">Photo</th>
            </tr>
          </thead>
          <tbody>
            {/* Mapping data biodataList ke dalam tabel */}
            {biodataList.map((b) => (
              <tr key={b.id} className="text-center border-b">
                <td className="py-2 px-4 border">{b.name}</td>
                <td className="py-2 px-4 border">{b.email}</td>
                <td className="py-2 px-4 border">{b.phone}</td>
                <td className="py-2 px-4 border">{b.address}</td>
                <td className="py-2 px-4 border">
                  {/* Menampilkan foto jika ada, jika tidak tampilkan placeholder */}
                  <img
                    src={b.photo ? b.photo : "https://via.placeholder.com/50"}
                    alt="User"
                    className="w-12 h-12 rounded-full mx-auto object-cover"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBiodataList;
