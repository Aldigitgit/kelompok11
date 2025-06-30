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
    const rows = [header];

    orders.forEach((order) => {
      const relatedItems = orderItems.filter(item => item.order_id === order.id);
      if (relatedItems.length === 0) return;

      relatedItems.forEach((item, index) => {
        const harga = item.harga_satuan ?? item.produk?.harga ?? 0;
        const subtotal = item.subtotal ?? harga * item.quantity;
        rows.push([
          index === 0 ? order.id : "",
          index === 0 ? order.account?.name : "",
          index === 0 ? order.account?.email : "",
          item.produk?.judul || "-",
          harga,
          item.quantity,
          subtotal,
          index === 0 ? new Date(order.created_at).toLocaleString("id-ID") : ""
        ]);
      });

      rows.push(["", "", "", "", "", "", "", ""]);
    });

    const csvContent = rows.map(row =>
      row.map(val => `"${val}"`).join(",")
    ).join("\n");

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
    <div className="p-6 max-w-7xl mx-auto font-sans">
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
        <div className="overflow-x-auto bg-white shadow-md rounded-xl">
          <table className="min-w-full text-sm table-auto">
            <thead className="bg-red-200 text-red-800 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">Account Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Total</th>
                <th className="px-4 py-3 text-left">Created At</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-red-50 transition">
                  <td className="px-4 py-2 font-medium">{order.account?.name}</td>
                  <td className="px-4 py-2">{order.account?.email}</td>
                  <td className="px-4 py-2">Rp {parseInt(order.total).toLocaleString("id-ID")}</td>
                  <td className="px-4 py-2">
                    {new Date(order.created_at).toLocaleString("id-ID")}
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    Tidak ada data order
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Order Items Table */}
      <section>
        <h2 className="text-xl font-semibold mb-2 text-gray-700 flex items-center gap-1">
          <FaBox /> Order Items
        </h2>
        <div className="overflow-x-auto bg-white shadow-md rounded-xl">
          <table className="min-w-full text-sm table-auto">
            <thead className="bg-red-200 text-red-800 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">Produk</th>
                <th className="px-4 py-3 text-left">Harga</th>
                <th className="px-4 py-3 text-left">Quantity</th>
                <th className="px-4 py-3 text-left">Subtotal</th>
                <th className="px-4 py-3 text-left">Order ID</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {orderItems.map((item) => {
                const harga = item.harga_satuan ?? item.produk?.harga ?? 0;
                const subtotal = item.subtotal ?? harga * item.quantity;
                return (
                  <tr key={item.id} className="border-b hover:bg-red-50 transition">
                    <td className="px-4 py-2">{item.produk?.judul}</td>
                    <td className="px-4 py-2">Rp {harga.toLocaleString("id-ID")}</td>
                    <td className="px-4 py-2">{item.quantity}</td>
                    <td className="px-4 py-2">Rp {subtotal.toLocaleString("id-ID")}</td>
                    <td className="px-4 py-2">{item.order_id}</td>
                  </tr>
                );
              })}
              {orderItems.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    Tidak ada data item
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
