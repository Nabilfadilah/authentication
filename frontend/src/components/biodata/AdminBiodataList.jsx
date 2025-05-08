// src/components/biodata/AdminBiodataList.jsx
import {useEffect, useState} from "react";
import axios from "../../utils/axiosInstance";
import {useAuth} from "../../context/AuthContext";
import {Link} from "react-router-dom";
import Typography from "../elements/text/Typography";
import ButtonAll from "../elements/button/Index";
import {BiArrowBack} from "react-icons/bi";

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
    <div class="p-6 bg-white shadow-md rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <Typography className="text-xl font-bold">
          List Biodata Semua User
        </Typography>
      </div>

      {/* Tabel Responsif */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-2 px-4 border text-start">No.</th>
              <th className="py-2 px-4 border text-start">Nama</th>
              <th className="py-2 px-4 border text-start">Email</th>
              <th className="py-2 px-4 border text-start">No Telepon</th>
              <th className="py-2 px-4 border text-start">Alamat</th>
              <th className="py-2 px-4 border">Poto</th>
            </tr>
          </thead>
          <tbody>
            {/* Mapping data biodataList ke dalam tabel */}
            {biodataList.map((b, index) => (
              <tr key={b.id} className="text-start border-b">
                <td className="py-2 px-4 border w-11 text-center">
                  {index + 1}.
                </td>
                <td className="py-2 px-4 border font-semibold">{b.name}</td>
                <td className="py-2 px-4 border text-gray-600">{b.email}</td>
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
