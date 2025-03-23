// import library axios untuk melakukan HTTP request
import axios from 'axios';

// membuat instance axios untuk konfigurasi default koneksi ke backend/server
const axiosInstance = axios.create({
  // baseURL alamat server backend yang akan digunakan
  baseURL: 'http://localhost:3200/api',

  // withCredentials: true memungkinkan pengiriman cookie atau token saat melakukan request
  withCredentials: true,

  // headers menentukan tipe data yang dikirim dalam request, di sini menggunakan JSON
  headers: {
    "Content-Type": "application/json"
  }
});

// mengekspor axiosInstance agar bisa digunakan di seluruh aplikasi untuk melakukan request ke backend
export default axiosInstance;
