import { Outlet } from "react-router-dom"
import Header from "./Header"
import Sidebar from "./Sidebar"

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar tetap */}
      <Sidebar />

      {/* Konten utama */}
      <div className="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
        {/* Header tetap di atas */}
        <Header />

        {/* Main content bisa di-scroll */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
