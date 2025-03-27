// src/components/biodata/FormCreateBiodata.jsx
import {useState} from "react";
import axios from "../../utils/axiosInstance";
import {useAuth} from "../../context/AuthContext";
import {Link, useNavigate} from "react-router-dom";
import Typography from "../elements/text/Typography";
import ButtonAll from "../elements/button/Index";
import {BiArrowBack} from "react-icons/bi";
import Label from "../elements/input/Label";
import InputForm from "../elements/input/Index";

const FormCreateBiodata = () => {
  const {user, token} = useAuth();
  const navigate = useNavigate();
  const [photoPreview, setPhotoPreview] = useState(null); // State untuk preview foto

  // state untuk menyimpan data form
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

      const data = new FormData(); // membuat objek FormData untuk mengirim data(berupa file)

      // mengonversi objek formData menjadi array pasangan [key, value] lalu melakukan iterasi pada setiap pasangan.
      Object.entries(formData).forEach(([key, value]) => {
        // mengecualikan key "photo"
        if (key !== "photo")
          // menambah setiap key-value ke dalam objek FormData
          data.append(key, value);
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

  // fungsi handleChange digunakan untuk menangani perubahan nilai pada input form
  // fungsi ini akan memperbarui state formData setiap kali pengguna mengetik atau memilih file
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
      setFormData({...formData, [name]: value});
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <Typography className="text-xl font-bold">Form Biodata</Typography>
        <ButtonAll>
          <Link to={"/biodata"} className="flex items-center gap-2">
            <BiArrowBack />
            Back
          </Link>
        </ButtonAll>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* input nama */}
        <InputForm
          label="Nama"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
        />

        {/* Input untuk Email */}
        <InputForm
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* Input untuk Nomor Telepon */}
        <InputForm
          label="No Telepon"
          name="phone"
          type="text"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        {/* Input untuk Alamat */}
        <InputForm
          label="Alamat"
          name="address"
          type="text"
          value={formData.address}
          onChange={handleChange}
          required
        />

        {/* Upload & Preview Foto */}
        <div className="mb-4">
          <Label>Upload Foto:</Label>
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
        <ButtonAll
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          Simpan
        </ButtonAll>
      </form>
    </div>
  );
};

export default FormCreateBiodata;

// kalau tidak ada menggunakan form input upload photo/image
// const handleSubmit = async (e) => {
//   e.preventDefault(); // Mencegah reload halaman

//   try {
//     // Membuat objek untuk data biodata (tanpa FormData karena tidak ada file)
//     const data = {
//       name: formData.name,
//       email: formData.email,
//       phone: formData.phone,
//       address: formData.address,
//     };

//     // Mengirim request POST ke backend untuk membuat biodata baru
//     const response = await axios.post("/biodata/create", data, {
//       headers: {
//         Authorization: `Bearer ${token}`, // Menyertakan token autentikasi
//         "Content-Type": "application/json", // Mengirim data dalam format JSON
//       },
//     });

//     console.log("Response dari backend:", response.data); // Debugging
//     alert("Biodata berhasil dibuat!"); // Notifikasi sukses

//     navigate("/biodata"); // Redirect ke halaman biodata setelah berhasil
//   } catch (err) {
//     console.error("Error saat mengirim data:", err);
//     alert("Terjadi kesalahan saat mengirim data. Coba lagi.");
//   }
// };

// // Fungsi untuk menangani perubahan input form
// const handleChange = (e) => {
//   const { name, value } = e.target;
//   setFormData({ ...formData, [name]: value });
// };
