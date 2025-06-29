import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { FaBox, FaClipboardList } from "react-icons/fa";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function UserOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);

  const accountId = localStorage.getItem("account_id");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event("roleChanged"));
    window.location.href = "/login";
  };

  useEffect(() => {
    if (accountId) {
      fetchUserOrders();
    }
  }, [accountId]);

  const fetchUserOrders = async () => {
    const { data: ordersData, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("account_id", accountId)
      .order("created_at", { ascending: false });

    if (orderError) {
      console.error("Gagal memuat pesanan:", orderError.message);
      return;
    }
    setOrders(ordersData || []);

    const { data: itemsData, error: itemsError } = await supabase
      .from("order_items")
      .select("*, produk(judul, harga, url_gambar)")
      .in("order_id", ordersData.map((order) => order.id));

    if (itemsError) {
      console.error("Gagal memuat item pesanan:", itemsError.message);
      return;
    }
    setOrderItems(itemsData || []);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar role={role} handleLogout={handleLogout} />
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-red-700 flex items-center gap-2">
          <FaClipboardList /> Riwayat Pesanan Anda
        </h1>

        {orders.length === 0 ? (
          <div className="text-center text-gray-500 p-10 bg-white rounded shadow">
            Belum ada pesanan.
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const itemsInOrder = orderItems.filter((item) => item.order_id === order.id);

              return (
                <div key={order.id} className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex justify-between items-center border-b pb-2 mb-3">
                    <span className="text-gray-600 text-sm">
                      Order ID: <span className="font-semibold">{order.id}</span>
                    </span>
                    <span className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">
                      Selesai
                    </span>
                  </div>

                  <div className="space-y-3">
                    {itemsInOrder.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 border-b pb-2">
                        <img
                          src={item.produk?.url_gambar || "/placeholder.jpg"}
                          alt={item.produk?.judul}
                          className="w-16 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{item.produk?.judul || "Produk tidak ditemukan"}</h3>
                          <p className="text-sm text-gray-500">Jumlah: {item.quantity}</p>
                        </div>
                        <div className="text-right text-sm">
                          <p className="text-gray-600">Harga:</p>
                          <p className="text-red-600 font-semibold">
                            Rp {item.produk?.harga?.toLocaleString("id-ID")}
                          </p>
                          <p className="text-gray-600 mt-1">Subtotal:</p>
                          <p className="font-semibold">
                            Rp {(item.quantity * (item.produk?.harga || 0)).toLocaleString("id-ID")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-right mt-4">
                    <p className="text-gray-600 text-sm">
                      Tanggal Pesan: {new Date(order.created_at).toLocaleString()}
                    </p>
                    <p className="text-lg font-bold text-red-700 mt-1">
                      Total: Rp {parseInt(order.total).toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
