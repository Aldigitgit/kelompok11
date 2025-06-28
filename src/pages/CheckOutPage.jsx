import { useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function CheckoutPage() {
  const { state } = useLocation();
  const produk = state?.produk;
     const role = localStorage.getItem("role");

      const handleLogout = () => {
    localStorage.removeItem("role");
    window.dispatchEvent(new Event("roleChanged"));
    navigate("/login");
  };

  if (!produk) return <div className="p-6">Tidak ada produk yang dipilih.</div>;

  return (
    <div>

        <Navbar role={role} handleLogout={handleLogout} /> 
 
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <div className="bg-white rounded shadow p-6 mb-6">
        <img
          src={produk.url_gambar}
          alt={produk.judul}
          className="w-32 h-40 object-cover rounded mb-4"
        />
        <h3 className="text-lg font-semibold">{produk.judul}</h3>
        <p className="text-sm text-gray-500">Penulis: {produk.penulis}</p>
        <p className="text-sm text-gray-500">Penerbit: {produk.penerbit}</p>
        <p className="text-red-600 font-bold text-lg mt-2">
          Rp {parseInt(produk.harga).toLocaleString("id-ID")}
        </p>
      </div>

      <button className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 font-semibold">
        Konfirmasi & Bayar
      </button>
    </div>
      <Footer></Footer>
       </div>
  );
}
