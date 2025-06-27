import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { FaBox, FaShoppingCart, FaClipboardList } from "react-icons/fa";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

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

    const { data: cartsData } = await supabase
      .from("cart_items")
      .select("*, account(name), produk(judul, harga)")
      .order("id", { ascending: false });
    setCartItems(cartsData || []);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-red-700 flex items-center gap-2">
        <FaClipboardList /> Admin - Order Overview
      </h1>

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
                  <td className="p-2 border">Rp {parseInt(order.total).toLocaleString("id-ID")}</td>
                  <td className="p-2 border">{new Date(order.created_at).toLocaleString()}</td>
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
              {orderItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-2 border">{item.produk?.judul}</td>
                  <td className="p-2 border">Rp {item.harga_satuan?.toLocaleString("id-ID")}</td>
                  <td className="p-2 border">{item.quantity}</td>
                  <td className="p-2 border">Rp {(item.subtotal || item.harga_satuan * item.quantity).toLocaleString("id-ID")}</td>
                  <td className="p-2 border">{item.order_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
