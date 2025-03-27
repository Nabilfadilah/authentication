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
    <div className="max-w-xl mx-auto p-6 bg-white shadow-2xl rounded-lg mt-10">
      <div className="flex items-center justify-between mb-4">
        <Typography className="text-xl font-bold">Biodata Saya</Typography>

        <ButtonAll>
          <Link to={"/dashboard"} className="flex items-center gap-2">
            <BiArrowBack />
            Back
          </Link>
        </ButtonAll>
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
          <Typography className="text-lg font-semibold">
            Nama: {biodata.name}
          </Typography>
          <Typography className="text-gray-600">
            Email: {biodata.email}
          </Typography>
          <Typography className="text-gray-600">
            Alamat: {biodata.address}
          </Typography>
          <Typography className="text-gray-600 pb-5">
            No Telepon: {biodata.phone}
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
