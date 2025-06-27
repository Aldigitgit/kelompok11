import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { FaBox, FaClipboardList } from "react-icons/fa";

export default function UserOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    if (userId) {
      fetchUserOrders();
    }
  }, [userId]);

  const fetchUserOrders = async () => {
    // Ambil semua pesanan user
    const { data: ordersData, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("account_id", userId)
      .order("created_at", { ascending: false });

    if (orderError) {
      console.error("Gagal memuat pesanan:", orderError.message);
      return;
    }
    setOrders(ordersData || []);

    // Ambil semua item dalam pesanan user
    const { data: itemsData, error: itemsError } = await supabase
      .from("order_items")
      .select("*, produk(judul, harga)")
      .in("order_id", ordersData.map((order) => order.id));

    if (itemsError) {
      console.error("Gagal memuat item pesanan:", itemsError.message);
      return;
    }
    setOrderItems(itemsData || []);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-red-700 flex items-center gap-2">
        <FaClipboardList /> Riwayat Pesanan Anda
      </h1>

      {/* Orders Table */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">Daftar Pesanan</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Order ID</th>
                <th className="p-2 border">Total</th>
                <th className="p-2 border">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="3" className="p-4 text-center text-gray-500">Belum ada pesanan.</td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="p-2 border">{order.id}</td>
                    <td className="p-2 border">Rp {parseInt(order.total).toLocaleString("id-ID")}</td>
                    <td className="p-2 border">{new Date(order.created_at).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Order Items Table */}
      {orderItems.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-2 text-gray-700 flex items-center gap-1">
            <FaBox /> Rincian Produk
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">Judul Buku</th>
                  <th className="p-2 border">Harga</th>
                  <th className="p-2 border">Jumlah</th>
                  <th className="p-2 border">Subtotal</th>
                  <th className="p-2 border">Order ID</th>
                </tr>
              </thead>
              <tbody>
                {orderItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="p-2 border">{item.produk?.judul}</td>
                    <td className="p-2 border">Rp {item.harga_satuan?.toLocaleString("id-ID")}</td>
                    <td className="p-2 border">{item.quantity}</td>
                    <td className="p-2 border">Rp {(item.harga_satuan * item.quantity).toLocaleString("id-ID")}</td>
                    <td className="p-2 border">{item.order_id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
