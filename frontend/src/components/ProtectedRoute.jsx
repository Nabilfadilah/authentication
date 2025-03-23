// impor komponen Navigate dari react-router-dom untuk menangani navigasi
import {Navigate} from "react-router-dom";

// impor custom hook useAuth untuk mengakses state autentikasi
import {useAuth} from "../context/AuthContext";

// komponen ProtectedRoute untuk membatasi akses ke halaman tertentu
const ProtectedRoute = ({children}) => {
  // mengambil token dari context autentikasi
  const {token} = useAuth();

  // jika token tersedia (user sudah login), tampilkan children (halaman yang ingin diakses)
  // jika token tidak ada (user belum login), arahkan ke halaman login
  return token ? children : <Navigate to="/login" />;
};

// mengekspor komponen ProtectedRoute agar bisa digunakan di seluruh aplikasi
export default ProtectedRoute;
