import {useState} from "react";
import Typography from "../components/elements/text/Typography";
import ButtonAll from "../components/elements/button/Index";

// impor instance Axios yang telah dikonfigurasi untuk komunikasi dengan backend
import axios from "../utils/axiosInstance";

import {Link, useNavigate} from "react-router-dom";

// impor useAuth untuk mengakses fungsi login dari AuthContext
import {useAuth} from "../context/AuthContext";
import InputForm from "../components/elements/input/Index";

const Login = () => {
  // mengambil fungsi login dari context autentikasi
  const {login} = useAuth();

  // hook useNavigate untuk navigasi setelah login berhasil
  const navigate = useNavigate();

  // state untuk menyimpan data form (email dan password)
  const [form, setForm] = useState({email: "", password: ""});

  // state untuk menyimpan pesan error jika login gagal
  const [error, setError] = useState("");

  // fungsi yang dijalankan saat form dikirimkan
  const handleSubmit = async (e) => {
    e.preventDefault(); // mencegah reload halaman saat submit
    try {
      // mengirim permintaan login ke server
      const res = await axios.post("/login", form);

      // jika berhasil, simpan token dan user di context lalu arahkan ke dashboard
      login(res.data.token, res.data.user);
      navigate("/dashboard");
    } catch (err) {
      // jika terjadi error, tampilkan pesan error dari server atau default
      setError(err.response?.data?.message || "Login gagal");
    }
  };

  return (
    // membungkus tampilan login dengan flexbox untuk membuatnya berada di tengah layar
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <Typography className="text-2xl font-semibold text-center text-gray-700 mb-4">
          Login
        </Typography>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* email */}
          <InputForm
            label="Email"
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setForm({...form, email: e.target.value})}
          />

          {/* password */}
          <InputForm
            label="Password"
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setForm({...form, password: e.target.value})}
          />

          <div className="text-sm text-gray-500">
            Kamu belum memiliki akun?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              <b>Register</b>
            </Link>{" "}
            sekarang.
          </div>

          <ButtonAll
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 transition duration-300"
          >
            Login
          </ButtonAll>
        </form>
        {error && <p className="mt-3 text-center text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
