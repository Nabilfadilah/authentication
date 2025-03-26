// src/components/biodata/FormCreateBiodata.jsx
import {useState} from "react";
import axios from "../../utils/axiosInstance";
import {useAuth} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";

const FormCreateBiodata = () => {
  const {user, token} = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    photo: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault(); // mencegah reload halaman
    try {
      //--------
      // opsi 1 = membuat objek FormData untuk mengirim data dengan format multipart/form-data
      // const data = new FormData();
      // data.append("name", formData.name);
      // data.append("email", formData.email);
      // data.append("phone", formData.phone);
      // data.append("address", formData.address);

      // // mengecek apakah photo merupakan file valid sebelum ditambahkan ke FormData
      // if (formData.photo instanceof File) {
      //   data.append("photo", formData.photo);
      // } else {
      //   console.error("Photo bukan file yang valid:", formData.photo);
      //   return alert("Foto harus berupa file yang valid!");
      // }

      // // debugging: Menampilkan data yang akan dikirim ke backend
      // console.log("Data yang dikirim (entries):", [...data.entries()]);
      // console.log(
      //   "Data yang dikirim (object):",
      //   Object.fromEntries(data.entries())
      // );
      //--------

      // mengirim request POST ke backend dengan data yang telah dikumpulkan

      const data = new FormData(); // membuat objek FormData untuk mengirim data

      // Tambahkan semua field kecuali photo ke FormData
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "photo") data.append(key, value);
      });

      // Validasi dan tambahkan photo jika valid
      if (!(formData.photo instanceof File)) {
        alert("Foto harus berupa file yang valid!");
        return;
      }
      data.append("photo", formData.photo);

      const response = await axios.post("/biodata/create", data, {
        headers: {
          Authorization: `Bearer ${token}`, // menyertakan token autentikasi
          "Content-Type": "multipart/form-data", // menentukan tipe konten
        },
      });

      // Debugging: menampilkan response dari backend
      console.log("Response dari backend:", response.data);

      alert("Biodata berhasil dibuat!"); // notifikasi jika berhasil
      navigate("/biodata"); // mengarahkan ke halaman biodata setelah form dikirim
    } catch (err) {
      console.error("Error saat mengirim data:", err);
      alert("Terjadi kesalahan saat mengirim data. Coba lagi."); // menampilkan alert jika ada error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Form Biodata</h2>
      {/* Input untuk Nama */}
      <input
        type="text"
        placeholder="Nama"
        // evenHandler  yang dijalankan setiap kali nilai input beruba
        // setFormData() digunakan untuk memperbarui state formData
        // {...formData} menyebarkan (spread) semua properti yang ada dalam formData agar tidak hilang saat diperbarui.
        // e adalah event yang terjadi pada elemen input.
        // e.target mengacu pada elemen input itu sendiri.
        // e.target.value mengambil nilai terbaru yang diketik oleh pengguna.
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        required
      />
      {/* Input untuk Email */}
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        required
      />
      {/* Input untuk Nomor Telepon */}
      <input
        type="text"
        placeholder="Telepon"
        onChange={(e) => setFormData({...formData, phone: e.target.value})}
        required
      />
      {/* Input untuk Alamat */}
      <input
        type="text"
        placeholder="Alamat"
        onChange={(e) => setFormData({...formData, address: e.target.value})}
        required
      />
      {/* Input untuk Upload Foto */}
      <input
        type="file"
        onChange={(e) => setFormData({...formData, photo: e.target.files[0]})}
      />
      <button type="submit">Simpan</button>
    </form>
  );
};

export default FormCreateBiodata;
