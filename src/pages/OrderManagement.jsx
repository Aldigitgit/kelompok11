import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { FaBox, FaClipboardList, FaDownload } from "react-icons/fa";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    const { data: ordersData } = await supabase
      .from("orders")
      .select("*, account(name, email)")
      .order("created_at", { ascending: false });
    setOrders(ordersData || []);

    const { data: itemsData } = await supabase
      .from("order_items")
      .select("*, produk(judul, harga)")
      .order("id", { ascending: false });
    setOrderItems(itemsData || []);
  };

  const handleDownloadCSV = () => {
    const header = [
      "Order ID",
      "Account Name",
      "Email",
      "Produk",
      "Harga Satuan",
      "Quantity",
      "Subtotal",
      "Tanggal Order",
    ];
    const rows = [];

    orderItems.forEach((item) => {
      const order = orders.find((o) => o.id === item.order_id);
      const harga = item.harga_satuan ?? item.produk?.harga ?? 0;
      const subtotal = item.subtotal ?? harga * item.quantity;

      rows.push([
        item.order_id,
        order?.account?.name || "-",
        order?.account?.email || "-",
        item.produk?.judul || "-",
        harga,
        item.quantity,
        subtotal,
        order ? new Date(order.created_at).toLocaleString("id-ID") : "-",
      ]);
    });

    const csvContent = [header, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const tempLink = document.createElement("a");
    tempLink.href = url;
    tempLink.setAttribute("download", "data_order.csv");
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-red-700 flex items-center gap-2">
          <FaClipboardList /> Admin - Order Overview
        </h1>
        <button
          onClick={handleDownloadCSV}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition"
        >
          <FaDownload /> Download CSV
        </button>
      </div>

      {/* Orders Table */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Account Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Total</th>
                <th className="p-2 border">Created At</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="p-2 border">{order.account?.name}</td>
                  <td className="p-2 border">{order.account?.email}</td>
                  <td className="p-2 border">
                    Rp {parseInt(order.total).toLocaleString("id-ID")}
                  </td>
                  <td className="p-2 border">
                    {new Date(order.created_at).toLocaleString("id-ID")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Order Items Table */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2 text-gray-700 flex items-center gap-1">
          <FaBox /> Order Items
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Produk</th>
                <th className="p-2 border">Harga</th>
                <th className="p-2 border">Quantity</th>
                <th className="p-2 border">Subtotal</th>
                <th className="p-2 border">Order ID</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item) => {
                const harga = item.harga_satuan ?? item.produk?.harga ?? 0;
                const subtotal = item.subtotal ?? harga * item.quantity;
                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="p-2 border">{item.produk?.judul}</td>
                    <td className="p-2 border">
                      Rp {harga.toLocaleString("id-ID")}
                    </td>
                    <td className="p-2 border">{item.quantity}</td>
                    <td className="p-2 border">
                      Rp {subtotal.toLocaleString("id-ID")}
                    </td>
                    <td className="p-2 border">{item.order_id}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
