import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import {
  FiShoppingCart
} from "react-icons/fi";
import {
  FaHome, FaStore, FaPhone
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const userId = localStorage.getItem("user_id");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      const { data, error } = await supabase
        .from("cart_items")
        .select("id, quantity, produk:produk_id (id, judul, harga, url_gambar, status)")
        .eq("user_id", userId);

      if (error) {
        console.error("Gagal ambil keranjang:", error);
      } else {
        setCartItems(data);

        const totalHarga = data.reduce((sum, item) => sum + item.quantity * item.produk.harga, 0);
        setTotal(totalHarga);
      }
    };

    if (userId) fetchCartItems();
  }, [userId]);

  const handleCheckout = async () => {
    try {
      if (!cartItems.length) return alert("Keranjang kosong!");

      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            account_id: userId,
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
        harga_satuan: item.produk.harga,
      }));

      const { error: itemError } = await supabase.from("order_items").insert(orderItems);
      if (itemError) throw itemError;

      const { error: deleteError } = await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", userId);

      if (deleteError) throw deleteError;

      alert("Checkout berhasil!");
      setCartItems([]);
      setTotal(0);
      navigate("/riwayat"); // arahkan ke halaman riwayat atau invoice
    } catch (err) {
      console.error("Checkout error:", err.message);
      alert("Gagal checkout, coba lagi.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-4 shadow bg-white sticky top-0 z-50">
        <div className="text-2xl font-bold text-red-700">PeriPlus</div>
        <nav className="space-x-6 text-sm font-medium hidden md:flex items-center">
          <a href="/" className="hover:text-red-700 flex items-center gap-1"><FaHome /> Home</a>
          <a href="/shop" className="hover:text-red-700 flex items-center gap-1"><FaStore /> Shop</a>
          <a href="/contact" className="hover:text-red-700 flex items-center gap-1"><FaPhone /> Contact</a>
        </nav>
        <div className="text-red-600 text-xl"><FiShoppingCart /></div>
      </header>

      {/* Cart List */}
      <main className="px-6 md:px-16 py-10">
        <h2 className="text-3xl font-bold mb-6">Cart <span className="text-red-600">List</span></h2>

        <div className="bg-white rounded-lg shadow p-5 space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Keranjang kosong.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b pb-4">
                <div className="flex items-center gap-4">
                  <img src={item.produk.url_gambar} alt="Book" className="w-20 h-28 object-cover rounded" />
                  <div>
                    <p className="font-semibold text-lg">{item.produk.judul}</p>
                    <p className="text-sm text-gray-500">Category: {item.produk.status}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-semibold text-lg text-red-600">
                  Rp {(item.quantity * item.produk.harga).toLocaleString("id-ID")}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Cart Total */}
        {cartItems.length > 0 && (
          <>
            <h2 className="text-3xl font-bold mt-10 mb-4">Cart <span className="text-red-600">Total</span></h2>
            <div className="bg-white p-6 rounded shadow max-w-md">
              <div className="flex justify-between mb-2">
                <span>SubTotal:</span><span>Rp {total.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between border-t pt-2 mt-2 font-semibold">
                <span>Total:</span><span>Rp {total.toLocaleString("id-ID")}</span>
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
    </div>
  );
}
