import {useState} from "react";
import axios from "../utils/axiosInstance"; // impor instance axios yang sudah dikonfigurasi untuk komunikasi dengan backend
import {Link, useNavigate} from "react-router-dom";
import Typography from "../components/elements/text/Typography";
import ButtonAll from "../components/elements/button/Index";
import InputForm from "../components/elements/input/Index";

// komponen Register untuk menangani pendaftaran user
const Register = () => {
  // state untuk menyimpan input form (name, email, password)
  const [form, setForm] = useState({name: "", email: "", password: ""});
  // state untuk menyimpan pesan status pendaftaran (sukses/gagal)
  const [message, setMessage] = useState("");
  // hook untuk navigasi ke halaman lain setelah berhasil mendaftar
  const navigate = useNavigate();

  // fungsi untuk menangani submit form
  const handleSubmit = async (e) => {
    e.preventDefault(); // mencegah reload halaman saat form dikirim
    try {
      // mengirim data registrasi ke backend melalui axios
      await axios.post("/register", form);
      // jika berhasil, atur pesan sukses
      setMessage("Berhasil daftar, silakan login");
      // setelah 1.5 detik, arahkan ke halaman login
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      // jika terjadi error, atur pesan error dari response backend atau tampilkan "Gagal daftar"
      setMessage(err.response?.data?.message || "Gagal daftar");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      {/* container utama untuk form register */}
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <Typography className="text-2xl font-semibold text-center mb-4">
          Register
        </Typography>
        {/* form untuk registrasi */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* input untuk Nama */}
          <InputForm
            label="Nama"
            type="text"
            placeholder="Nama"
            className="focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setForm({...form, name: e.target.value})}
          />

          {/* input untuk Email */}
          <InputForm
            label="Email"
            type="email"
            placeholder="Email"
            className="focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setForm({...form, email: e.target.value})}
          />

          {/* input untuk Password */}
          <InputForm
            label="Password"
            type="password"
            placeholder="Password"
            className="focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setForm({...form, password: e.target.value})}
          />

          <div className="text-sm text-gray-500">
            Kamu sudah memiliki akun,{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              <b>Login</b>
            </Link>
          </div>

          {/* tombol Submit */}
          <ButtonAll
            type="submit"
            className="w-full bg-blue-500  hover:bg-blue-600"
          >
            Register
          </ButtonAll>
        </form>
        {/* menampilkan pesan sukses/gagal jika ada */}
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Register;
