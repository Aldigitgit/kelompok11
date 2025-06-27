import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';

export default function NewArrivals() {
  const [produk, setProduk] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduk = async () => {
      const { data, error } = await supabase
        .from('produk')
        .select('*')
        .order('tanggal_rilis', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Gagal mengambil data produk:', error.message);
      } else {
        setProduk(data);
      }
    };

    fetchProduk();
  }, []);

  return (
    <section className="py-10 px-6 bg-white">
      <h2 className="text-2xl font-semibold mb-4">New Arrivals</h2>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 pb-2">
          {produk.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/book/${item.id}`)}
              className="min-w-[160px] bg-white rounded-lg shadow-md p-2 hover:scale-105 transition cursor-pointer"
            >
              <img
                src={item.url_gambar}
                alt={item.judul}
                className="mx-auto mb-2 h-40 object-cover rounded"
              />
              <p className="text-sm font-semibold text-center">{item.judul}</p>
              <p className="text-xs text-gray-500 text-center">{item.penerbit}</p>
              <p className="text-[11px] text-gray-600 text-center line-clamp-2">
                oleh {item.penulis}
              </p>
              <p className="text-[13px] font-bold text-center text-red-700 mt-1">
                Rp {parseInt(item.harga).toLocaleString('id-ID')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
