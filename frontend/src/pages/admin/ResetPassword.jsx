// src/pages/admin/ResetPasswordForm.jsx
import {useState} from "react";
import {useParams, useNavigate, Link} from "react-router-dom";
import axios from "../../utils/axiosInstance";
import {useAuth} from "../../context/AuthContext";
import Typography from "../../components/elements/text/Typography";
import ButtonAll from "../../components/elements/button/Index";
import InputForm from "../../components/elements/input/Index";
import {BiArrowBack} from "react-icons/bi";
import {FiEye, FiEyeOff} from "react-icons/fi";

const ResetPasswordForm = () => {
  const {id} = useParams(); // ambil id user dari parameter URL
  const navigate = useNavigate();
  const {token} = useAuth(); // ambil token yang sedang login

  const [newPassword, setNewPassword] = useState(""); // state untuk password baru
  const [confirmPassword, setConfirmPassword] = useState(""); // state untuk konfirmasi password baru
  const [message, setMessage] = useState(""); // state untuk pesan error atau sukses

  const [showNewPassword, setShowNewPassword] = useState(false); // state untuk melihat/menutup new password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // state untuk melihat/menutup konfirm new password

  const handleReset = async (e) => {
    e.preventDefault();

    // validasi: pastikan password dan konfirmasinya cocok
    if (newPassword !== confirmPassword) {
      return setMessage("Password dan konfirmasi tidak cocok");
    }

    try {
      // mengirim permintaan PUT untuk reset password user berdasarkan ID
      await axios.put(
        `/admin/reset-password/${id}`,
        {newPassword},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Password berhasil di-reset");
      // redirect ke halaman users setelah 1.5 detik
      setTimeout(() => navigate("/users"), 1500);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Gagal mereset password user"
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 border p-6 rounded shadow">
      <div className="flex items-center justify-between mb-4">
        <Typography className="text-xl font-semibold">
          Reset Password User
        </Typography>
        <ButtonAll>
          <Link to={"/users"} className="flex items-center gap-2">
            <BiArrowBack />
            Back
          </Link>
        </ButtonAll>
      </div>

      {/* menampilkan pesan sukses atau error jika ada */}
      <p
        className={`mb-4 text-sm font-semibold ${
          message.includes("berhasil") ? "text-green-500" : "text-red-500"
        }`}
      >
        {message}
      </p>

      <form onSubmit={handleReset}>
        {/* New Password */}
        <div className="mb-4 relative">
          <label className="block mb-1 font-medium">Password Baru</label>

          {/* tipe input bisa berubah dari "password" ke "text" tergantung state showNewPassword */}
          <input
            type={showNewPassword ? "text" : "password"} // toggle tipe input
            value={newPassword} // nilai input diambil dari state newPassword
            onChange={(e) => setNewPassword(e.target.value)} // update state saat user mengetik
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
            required
          />

          {/* Icon mata / mata tertutup untuk toggle visibility */}
          {/* Posisi absolut agar icon berada di dalam input, sisi kanan */}
          <div
            className="absolute top-9 right-3 text-gray-600 cursor-pointer"
            onClick={() => setShowNewPassword(!showNewPassword)} // toggle visibilitas
          >
            {/* tampilkan icon FiEyeOff jika password sedang terlihat, jika tidak FiEye */}
            {showNewPassword ? <FiEyeOff /> : <FiEye />}
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-4 relative">
          <label className="block mb-1 font-medium">Konfirmasi Password</label>

          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword} // nilai diambil dari state confirmPassword
            onChange={(e) => setConfirmPassword(e.target.value)} // update state saat diketik
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
            required
          />

          {/* icon mata toggle untuk konfirmasi password */}
          <div
            className="absolute top-9 right-3 text-gray-600 cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)} // toggle state
          >
            {/* tampilkan icon sesuai state showConfirmPassword */}
            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
          </div>
        </div>

        <div className="text-center">
          <ButtonAll type="submit" className="bg-blue-600 hover:bg-blue-700">
            Reset Password
          </ButtonAll>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
