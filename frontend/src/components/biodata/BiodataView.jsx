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
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Biodata Saya</h2>
        <Link
          to={"/dashboard"}
          className="px-4 py-1 bg-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-400"
        >
          Back
        </Link>
      </div>
      {biodata ? ( // jika biodata tersedia, tampilkan informasi biodata
        <div className="flex flex-col items-center">
          {/* Menampilkan biodata jika tersedia */}
          {/* {biodata.photo && ( */}
          <img
            src={biodata.photo}
            alt="Foto Profil"
            className="w-32 h-32 rounded-full object-cover border-2 border-gray-300 mb-4"
          />
          <p className="text-lg font-semibold">Nama: {biodata.name}</p>
          <p className="text-gray-600">Email: {biodata.email}</p>
          <p className="text-gray-600">Alamat: {biodata.address}</p>
          <p className="text-gray-600">No Telepon: {biodata.phone}</p>
          {/* tombol untuk mengedit biodata dengan mengarahkan ke halaman edit */}
          <Link
            to={`/biodata/edit/${biodata.id}`}
            className="mt-4 bg-blue-500 text-white text-sm px-4 py-1 rounded hover:bg-blue-600"
          >
            Edit Biodata
          </Link>
        </div>
      ) : (
        // jika biodata belum ada, tampilkan pesan dan tombol untuk membuat biodata baru
        <div className="text-center">
          <p className="text-gray-500">Biodata belum tersedia.</p>
          {/* tombol untuk membuat biodata baru */}
          <Link
            to="/biodata/create"
            className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Buat Biodata
          </Link>
        </div>
      )}
    </div>
  );
};

export default BiodataView;
