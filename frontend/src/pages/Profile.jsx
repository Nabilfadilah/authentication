// impor hook useAuth dari AuthContext untuk mendapatkan data pengguna yang sedang login
import {useAuth} from "../context/AuthContext";

const Profile = () => {
  // mengambil data user dari context autentikasi
  const {user} = useAuth();

  // jika user belum tersedia (misalnya saat masih loading), tampilkan teks "Loading..."
  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Profil Saya</h2>

      {/* menampilkan informasi pengguna */}
      <p>
        <strong>Nama:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Role:</strong> {user.role}
      </p>
    </div>
  );
};

export default Profile;
