import {useEffect, useState} from "react";
import axios from "../../utils/axiosInstance";
import {useAuth} from "../../context/AuthContext";
import {Link} from "react-router-dom";

const BiodataView = () => {
  // ambil data user dan token dari context authentikasi
  const {user, token} = useAuth();

  // state untuk menyimpan data biodata pengguna
  const [biodata, setBiodata] = useState(null);

  // useEffect digunakan untuk mengambil data biodata ketika komponen pertama kali dirender
  useEffect(() => {
    const fetchMyBiodata = async () => {
      try {
        // mengirim permintaan GET ke endpoint `/biodata` dengan menyertakan token untuk autentikasi
        const res = await axios.get(`/biodata`, {
          headers: {Authorization: `Bearer ${token}`},
        });

        setBiodata(res.data); // jika berhasil, menyimpan data biodata ke dalam state
      } catch (err) {
        setBiodata(null); // jika terjadi error (misalnya biodata belum ada), set biodata menjadi null
      }
    };
    fetchMyBiodata();
  }, [user]); // useEffect akan dijalankan ulang setiap kali 'user' berubah

  return (
    <div>
      <h2>Biodata Saya</h2>
      {biodata ? ( // jika biodata tersedia, tampilkan informasi biodata
        <div>
          <p>Nama: {biodata.name}</p>
          <p>Email: {biodata.email}</p>
          <p>Alamat: {biodata.address}</p>
          <p>No Telepon: {biodata.phone}</p>
          {/* tombol untuk mengedit biodata dengan mengarahkan ke halaman edit */}
          <Link to={`/biodata/edit/${biodata.id}`}>Edit Biodata</Link>
        </div>
      ) : (
        // jika biodata belum ada, tampilkan pesan dan tombol untuk membuat biodata baru
        <div>
          <p>Biodata belum tersedia.</p>
          {/* Tombol untuk membuat biodata baru */}
          <Link to="/biodata/create">Buat Biodata</Link>
        </div>
      )}
    </div>
  );
};

export default BiodataView;
