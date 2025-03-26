// Import React hooks dan library yang dibutuhkan
import {useEffect, useState} from "react";
import axios from "../../utils/axiosInstance";
import {useAuth} from "../../context/AuthContext";
import {useParams, useNavigate} from "react-router-dom";

const FormEditBiodata = () => {
  // mengambil user & token dari AuthContext
  const {user, token} = useAuth();

  // mengambil ID dari parameter URL
  const {id} = useParams();

  // untuk navigasi setelah submit
  const navigate = useNavigate();

  // state untuk menyimpan data form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    photo: null,
  });

  // useEffect untuk mengambil data biodata berdasarkan ID (get by id)
  useEffect(() => {
    const fetchBiodata = async () => {
      try {
        const res = await axios.get(`/biodata/${id}`, {
          headers: {Authorization: `Bearer ${token}`},
        });
        setFormData(res.data); // Mengisi form dengan data yang diambil dari backend
        console.log("apakah data terambil? : ", res.data);
      } catch (error) {
        console.error("Gagal mengambil data biodata:", error);
      }
    };
    fetchBiodata();
  }, [id, user]); // useEffect akan dijalankan saat `id` atau `user` berubah

  // fungsi untuk menangani submit form
  const handleSubmit = async (e) => {
    e.preventDefault(); // mencegah reload halaman

    try {
      const data = new FormData(); // membuat objek FormData untuk dikirim ke backend
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("address", formData.address);

      // jika ada foto yang diunggah, tambahkan ke FormData
      if (formData.photo) data.append("photo", formData.photo);

      // mengirim data ke backend dengan metode PUT untuk mengupdate biodata
      await axios.put(`/biodata/edit/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Harus multipart karena ada file yang dikirim
        },
      });

      console.log("sukses update data? : ", data);

      // redirect ke halaman biodata setelah update berhasil
      navigate("/biodata");
    } catch (err) {
      console.error("Gagal mengupdate biodata:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Biodata</h2>

      {/* input untuk Nama */}
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
      />

      {/* input untuk Email */}
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        required
      />

      {/* input untuk Alamat */}
      <input
        type="text"
        value={formData.address}
        onChange={(e) => setFormData({...formData, address: e.target.value})}
      />

      {/* input untuk Nomor Telepon */}
      <input
        type="text"
        value={formData.phone}
        onChange={(e) => setFormData({...formData, phone: e.target.value})}
      />

      {/* input untuk Upload Foto */}
      <input
        type="file"
        onChange={(e) => setFormData({...formData, photo: e.target.files[0]})}
      />

      {/* Tombol Submit */}
      <button type="submit">Update</button>
    </form>
  );
};

export default FormEditBiodata;
