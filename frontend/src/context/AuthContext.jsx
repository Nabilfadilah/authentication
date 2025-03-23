// impor React hooks dan createContext untuk membuat dan mengelola konteks
import {createContext, useContext, useEffect, useState} from "react";

// membuat konteks untuk menangani autentikasi pengguna (token dan user data)
const AuthContext = createContext();

// komponen penyedia autentikasi yang akan membungkus aplikasi
export const AuthProvider = ({children}) => {
  // state untuk menyimpan token autentikasi, mengambilnya dari localStorage jika ada
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // state untuk menyimpan data pengguna, mengambilnya dari localStorage jika ada
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // fungsi login untuk menyimpan token dan data user ke localStorage dan state
  const login = (newToken, userData) => {
    localStorage.setItem("token", newToken); // menyimpan token ke localStorage
    localStorage.setItem("user", JSON.stringify(userData)); // menyimpan user ke localStorage dalam format JSON
    setToken(newToken); // memperbarui state token
    setUser(userData); // memperbarui state user
  };

  // fungsi logout untuk menghapus token dan data user dari localStorage dan state
  const logout = () => {
    localStorage.removeItem("token"); // menghapus token dari localStorage
    localStorage.removeItem("user"); // menghapus user dari localStorage
    setToken(null); // mengosongkan state token
    setUser(null); // mengosongkan state user
  };

  return (
    // menyediakan nilai (token, user, login, logout) ke seluruh aplikasi yang menggunakannya
    <AuthContext.Provider value={{token, user, login, logout}}>
      {children}{" "}
      {/* menampilkan komponen anak (children) yang dibungkus oleh AuthProvider */}
    </AuthContext.Provider>
  );
};

// custom hook untuk menggunakan AuthContext di komponen lain
export const useAuth = () => useContext(AuthContext);

// PENJELASAN
// Keuntungan Menggunakan Context API untuk Auth:
// ✅ State Global → Tidak perlu mengoper token dan user secara manual ke setiap komponen.
// ✅ Mudah Digunakan → Cukup gunakan useAuth() untuk mendapatkan status login.
// ✅ Persistensi Data → Data tersimpan di localStorage, jadi pengguna tetap login meskipun halaman direfresh.

// Kode ini cocok untuk sistem autentikasi berbasis JWT atau session-based authentication
