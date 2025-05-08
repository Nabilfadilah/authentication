import {useState} from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function MainLayout({children}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // state untuk sidebar toggle

  // fungsi untuk membuka/menutup sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen relative">
      {/* komponen Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

      {/* konten utama */}
      <div className="flex-1 flex flex-col">
        {/* komponen Navbar */}
        <Navbar onToggleSidebar={toggleSidebar} />

        {/* area konten (yang di-render oleh children) */}
        <main className="flex-1 overflow-y-auto p-4 mt-16 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}
