import {useEffect, useState} from "react";
import axios from "../../utils/axiosInstance";
import {useAuth} from "../../context/AuthContext";
import {Link} from "react-router-dom";
import Typography from "../elements/text/Typography";
import ButtonAll from "../elements/button/Index";
import {BiArrowBack} from "react-icons/bi";
import {FaEdit} from "react-icons/fa";

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
    <div class="p-6 bg-white shadow-lg rounded-xl max-w-xl mx-auto">
      <div class="flex items-center justify-between mb-6 border-b pb-3">
        <Typography className="text-xl font-bold">Biodata Saya</Typography>
      </div>
      {biodata ? ( // jika biodata tersedia, tampilkan informasi biodata
        <div class="flex flex-col items-center text-center">
          {/* Menampilkan biodata jika tersedia */}
          {/* {biodata.photo && ( */}
          <img
            src={biodata.photo}
            alt="Foto Profil"
            class="w-32 h-32 rounded-full object-cover border-4 border-indigo-200 shadow-sm mb-4"
          />
          <Typography className="text-xl font-semibold text-gray-900">
            {biodata.name}
          </Typography>
          <Typography class="text-gray-600 mt-1">📧 {biodata.email}</Typography>
          <Typography className="text-gray-600">
            🏠 {biodata.address}
          </Typography>
          <Typography className="text-gray-600 mb-5">
            📞 {biodata.phone}
          </Typography>
          {/* tombol untuk mengedit biodata dengan mengarahkan ke halaman edit */}
          <ButtonAll className="bg-blue-500 hover:bg-blue-600">
            <Link
              to={`/biodata/edit/${biodata.id}`}
              className="flex items-center gap-2"
            >
              <FaEdit />
              Edit
            </Link>
          </ButtonAll>
        </div>
      ) : (
        // jika biodata belum ada, tampilkan pesan dan tombol untuk membuat biodata baru
        <div className="text-center">
          <Typography className="text-gray-500">
            Biodata belum tersedia.
          </Typography>
          {/* tombol untuk membuat biodata baru */}
          <ButtonAll className="bg-green-500 hover:bg-green-600">
            <Link to="/biodata/create">Buat Biodata</Link>
          </ButtonAll>
        </div>
      )}
    </div>
  );
};

export default BiodataView;
