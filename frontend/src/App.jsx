import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

// impor komponen ProtectedRoute untuk membatasi akses ke halaman tertentu
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import UserList from "./pages/admin/UserList";
import EditUser from "./pages/admin/EditUser";
import ResetPasswordForm from "./pages/admin/ResetPassword";
import FormEditBiodata from "./components/biodata/FormEditBiodata";
import FormCreateBiodata from "./components/biodata/FormCreateBiodat";
import BiodataView from "./components/biodata/BiodataView";
import AdminBiodataList from "./components/biodata/AdminBiodataList";
import {useAuth} from "./context/AuthContext";
import MainLayout from "./layouts/MainLayout";

const BiodataRouter = () => {
  const {user} = useAuth();
  return user?.role === "admin" ? <AdminBiodataList /> : <BiodataView />;
};

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
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Profile />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <MainLayout>
                <UserList />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/users/:id"
          element={
            <ProtectedRoute>
              <MainLayout>
                <EditUser />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/reset-password/:id"
          element={
            <ProtectedRoute>
              <MainLayout>
                <ResetPasswordForm />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* biodata router */}
        <Route
          path="/biodata"
          element={
            <ProtectedRoute>
              <MainLayout>
                <BiodataRouter />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/biodata/create"
          element={
            <ProtectedRoute>
              <MainLayout>
                <FormCreateBiodata />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/biodata/edit/:id"
          element={
            <ProtectedRoute>
              <MainLayout>
                <FormEditBiodata />
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
