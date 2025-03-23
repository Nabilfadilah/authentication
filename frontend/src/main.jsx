import {StrictMode} from "react"; // impor StrictMode dari React untuk membantu mendeteksi potensi masalah dalam aplikasi
import {createRoot} from "react-dom/client"; // impor fungsi createRoot dari ReactDOM untuk merender aplikasi ke dalam elemen HTML
import "./index.css";
import App from "./App.jsx";
import {AuthProvider} from "./context/AuthContext.jsx"; // impor AuthProvider untuk menyediakan konteks autentikasi ke seluruh aplikasi

// merender aplikasi ke dalam elemen dengan id "root" di file HTML utama
createRoot(document.getElementById("root")).render(
  // StrictMode membantu menemukan potensi masalah dalam pengembangan
  <StrictMode>
    {/* AuthProvider membungkus App untuk menyediakan konteks autentikasi ke seluruh aplikasi */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
