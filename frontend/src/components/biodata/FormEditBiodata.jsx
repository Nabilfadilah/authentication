// Import React hooks dan library yang dibutuhkan
import {useEffect, useState} from "react";
import axios from "../../utils/axiosInstance";
import {useAuth} from "../../context/AuthContext";
import {useParams, useNavigate, Link} from "react-router-dom";

const FormEditBiodata = () => {
  // mengambil user & token dari AuthContext
  const {user, token} = useAuth();

  // mengambil ID dari parameter URL
  const {id} = useParams();

  // untuk navigasi setelah submit
  const navigate = useNavigate();

  // state untuk preview foto
  const [photoPreview, setPhotoPreview] = useState(null);

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
        setFormData(res.data); // mengisi form dengan data yang diambil dari backend

        // jika ada foto sebelumnya, gunakan sebagai preview awal
        if (res.data.photo) {
          setPhotoPreview(res.data.photo);
        }

        console.log("apakah data terambil? : ", res.data);
      } catch (error) {
        console.error("Gagal mengambil data biodata:", error);
      }
    };
    fetchBiodata();
  }, [id, user]); // useEffect akan dijalankan saat 'id' atau 'user' berubah

  // fungsi untuk menangani perubahan input termasuk foto
  const handleChange = (e) => {
    const {name, value, type, files} = e.target; // mendapatkan properti dari event target (input yang berubah)

    // jika input berupa file (misalnya upload foto)
    if (type === "file") {
      const file = files[0]; // ambil file pertama yang diunggah
      if (file) {
        setFormData({...formData, photo: file}); // simpan file foto
        setPhotoPreview(URL.createObjectURL(file)); // menampilkan preview foto yang baru diunggah
      }
    } else {
      setFormData({...formData, [name]: value}); // simpan input teks
    }
  };

  // fungsi untuk menangani submit form
  const handleSubmit = async (e) => {
    e.preventDefault(); // mencegah reload halaman

    try {
      const data = new FormData(); // membuat objek FormData untuk mengirim data
      // mengonversi objek formData menjadi array pasangan [key, value] lalu melakukan iterasi pada setiap pasangan.
      Object.entries(formData).forEach(([key, value]) => {
        // mengecualikan key "photo" jika tidak berupa file
        if (key !== "photo" || value instanceof File)
          // menambah setiap key-value ke dalam objek FormData
          data.append(key, value);
      });

      // mengirim data ke backend dengan metode PUT untuk mengupdate biodata
      await axios.put(`/biodata/edit/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // harus multipart karena ada file yang dikirim
        },
      });

      console.log("sukses update data? : ", data);
      alert("Biodata berhasil diubah!");

      // redirect ke halaman biodata setelah update berhasil
      navigate("/biodata");
    } catch (err) {
      console.error("Gagal mengupdate biodata:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Edit Biodata</h2>
        <Link
          to={"/biodata"}
          className="px-4 py-1 bg-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-400"
        >
          Back
        </Link>
      </div>

      {/* Input untuk Nama */}
      <input
        type="text"
        name="name"
        value={formData.name} // nilai input dikendalikan oleh state formData
        onChange={handleChange} // memanggil handleChange saat pengguna mengetik
        required
        className="w-full p-2 mb-3 border rounded-md"
      />

      {/* Input untuk Email */}
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full p-2 mb-3 border rounded-md"
      />

      {/* Input untuk Alamat */}
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        required
        className="w-full p-2 mb-3 border rounded-md"
      />

      {/* Input untuk Nomor Telepon */}
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        required
        className="w-full p-2 mb-3 border rounded-md"
      />

      {/* Upload & Preview Foto */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold text-sm mb-2">
          Upload Foto:
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />

        {/* menampilkan preview foto jika tersedia */}
        {photoPreview && (
          <div className="mt-3 flex justify-center">
            <img
              src={photoPreview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-md shadow-md"
            />
          </div>
        )}
      </div>

      {/* Tombol Submit */}
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded-md"
      >
        Update
      </button>
    </form>
  );
};

export default FormEditBiodata;

// kalau tidak ada menggunakan form input upload photo/image
// const handleSubmit = async (e) => {
//   e.preventDefault(); // Mencegah reload halaman

//   try {
//     // Membuat objek data yang akan dikirim (tanpa FormData)
//     const data = {
//       name: formData.name,
//       email: formData.email,
//       phone: formData.phone,
//       address: formData.address,
//     };

//     // Mengirim request PUT ke backend untuk update biodata
//     const response = await axios.put(`/biodata/edit/${id}`, data, {
//       headers: {
//         Authorization: `Bearer ${token}`, // Menyertakan token autentikasi
//         "Content-Type": "application/json", // Mengirim data dalam format JSON
//       },
//     });

//     console.log("Response dari backend:", response.data); // Debugging
//     alert("Biodata berhasil diperbarui!"); // Notifikasi sukses

//     navigate("/biodata"); // Redirect ke halaman biodata setelah berhasil
//   } catch (err) {
//     console.error("Error saat mengupdate biodata:", err);
//     alert("Terjadi kesalahan saat mengupdate biodata. Coba lagi.");
//   }
// };

// // Fungsi untuk menangani perubahan input form
// const handleChange = (e) => {
//   const { name, value } = e.target;
//   setFormData({ ...formData, [name]: value });
// };

// // Mengambil data biodata berdasarkan ID (agar form terisi otomatis saat edit)
// useEffect(() => {
//   const fetchBiodata = async () => {
//     try {
//       const res = await axios.get(`/biodata/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setFormData(res.data); // Mengisi form dengan data dari backend
//     } catch (error) {
//       console.error("Gagal mengambil data biodata:", error);
//     }
//   };
//   fetchBiodata();
// }, [id]); // useEffect dijalankan saat 'id' berubah
