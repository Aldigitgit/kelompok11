import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const accountId = localStorage.getItem("account_id"); // ✅ ganti user_id jadi account_id

  const handleLogout = () => {
    localStorage.removeItem("role");
    window.dispatchEvent(new Event("roleChanged"));
    navigate("/login");
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      const { data, error } = await supabase
        .from("cart_items")
        .select("id, quantity, produk:produk_id (id, judul, harga, url_gambar, status)")
        .eq("account_id", accountId); // ✅ ganti user_id

      if (error) {
        console.error("Gagal ambil keranjang:", error);
      } else {
        setCartItems(data);

        const totalHarga = data.reduce((sum, item) => {
          return item.produk ? sum + item.quantity * item.produk.harga : sum;
        }, 0);

        setTotal(totalHarga);
      }
    };

    if (accountId) fetchCartItems();
  }, [accountId]);

  const handleCheckout = async () => {
    try {
      if (!cartItems.length) return alert("Keranjang kosong!");
      if (!accountId) return alert("Belum login!");

      // Step 1: Insert ke orders
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

      // Step 2: Insert ke order_items
      const orderItems = cartItems
        .filter((item) => item.produk)
        .map((item) => ({
          order_id: order.id,
          produk_id: item.produk.id,
          quantity: item.quantity,
          subtotal: item.quantity * item.produk.harga,
        }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Step 3: Kosongkan keranjang
      const { error: deleteError } = await supabase
        .from("cart_items")
        .delete()
        .eq("account_id", accountId);

      if (deleteError) throw deleteError;

      alert("Checkout berhasil!");
      setCartItems([]);
      setTotal(0);
      navigate("/user/orders");
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Gagal checkout: " + err.message);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar role={role} handleLogout={handleLogout} />

      <main className="px-6 md:px-16 py-10">
        <h2 className="text-3xl font-bold mb-6">Cart <span className="text-red-600">List</span></h2>

        <div className="bg-white rounded-lg shadow p-5 space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Keranjang kosong.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b pb-4">
                {!item.produk ? (
                  <div className="text-red-600">Produk tidak ditemukan atau telah dihapus.</div>
                ) : (
                  <>
                    <div className="flex items-center gap-4">
                      <img src={item.produk.url_gambar} alt="Book" className="w-20 h-28 object-cover rounded" />
                      <div>
                        <p
                          className="font-semibold text-lg cursor-pointer text-blue-700 hover:underline"
                          onClick={() => navigate(`/detail/${item.produk.id}`)}
                        >
                          {item.produk.judul}
                        </p>
                        <p className="text-sm text-gray-500">Kategori: {item.produk.status}</p>
                        <p className="text-sm text-gray-600">Jumlah: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-semibold text-lg text-red-600">
                      Rp {(item.quantity * item.produk.harga).toLocaleString("id-ID")}
                    </p>
                  </>
                )}
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <>
            <h2 className="text-3xl font-bold mt-10 mb-4">Cart <span className="text-red-600">Total</span></h2>
            <div className="bg-white p-6 rounded shadow max-w-md">
              <div className="flex justify-between mb-2">
                <span>SubTotal:</span>
                <span>Rp {total.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between border-t pt-2 mt-2 font-semibold">
                <span>Total:</span>
                <span>Rp {total.toLocaleString("id-ID")}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full mt-6 bg-red-600 text-white py-3 rounded-full hover:bg-red-700 transition font-semibold"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
