// src/components/biodata/AdminBiodataList.jsx
import {useEffect, useState} from "react";
import axios from "../../utils/axiosInstance";
import {useAuth} from "../../context/AuthContext";

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
    <div>
      <h2>List Biodata Semua User</h2>
      <ul>
        {/* melakukan mapping terhadap array biodataList */}
        {biodataList.map((b) => (
          <li key={b.id}>
            {b.name} - {b.email} - {b.phone} - {b.address}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminBiodataList;
