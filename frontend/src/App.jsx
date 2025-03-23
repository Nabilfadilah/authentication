import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

// impor komponen ProtectedRoute untuk membatasi akses ke halaman tertentu
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import UserList from "./pages/admin/UserList";

function App() {
  return (
    // BrowserRouter digunakan sebagai pembungkus utama untuk mengaktifkan fitur routing di aplikasi
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* route untuk halaman dashboard, yang hanya bisa diakses jika user sudah login */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UserList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
