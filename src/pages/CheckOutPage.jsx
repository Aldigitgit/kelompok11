import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { supabase } from "../supabase";
import { useState } from "react";

export default function PaymentPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const accountId = localStorage.getItem("account_id");
  const [loading, setLoading] = useState(false);

  const cartItems = state?.cartItems || [];
  const total = state?.total || 0;

  const handlePay = async () => {
    try {
      if (!accountId || cartItems.length === 0) return;

      setLoading(true);

      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            account_id: accountId,
            total: total,
            total_amount: total,
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = cartItems.map((item) => ({
        order_id: order.id,
        produk_id: item.produk.id,
        quantity: item.quantity,
        subtotal: item.quantity * item.produk.harga,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);
      if (itemsError) throw itemsError;

      await supabase.from("cart_items").delete().eq("account_id", accountId);

      alert("Pembayaran berhasil!");
      navigate("/userorder");
    } catch (err) {
      alert("Gagal menyelesaikan pembayaran: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar role={role} />

      <div className="max-w-4xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold mb-6">Pembayaran</h2>

        <div className="bg-white rounded-lg shadow p-6 mb-6 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b pb-4">
              <div className="flex items-center gap-4">
                <img
                  src={item.produk.url_gambar}
                  alt={item.produk.judul}
                  className="w-16 h-24 object-cover rounded border"
                />
                <div>
                  <h3 className="font-medium">{item.produk.judul}</h3>
                  <p className="text-sm text-gray-500">Jumlah: {item.quantity}</p>
                </div>
              </div>
              <p className="text-red-600 font-semibold">
                Rp {(item.quantity * item.produk.harga).toLocaleString("id-ID")}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow flex justify-between text-lg font-semibold">
          <span>Total Pembayaran:</span>
          <span className="text-red-600">Rp {total.toLocaleString("id-ID")}</span>
        </div>

        <button
          onClick={handlePay}
          disabled={loading}
          className="w-full mt-6 bg-green-600 text-white py-3 rounded-full hover:bg-green-700 font-semibold transition"
        >
          {loading ? "Memproses..." : "Bayar Sekarang"}
        </button>
      </div>

      <Footer />
    </div>
  );
}
