// EventDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt, FaPlayCircle, FaArrowLeft, FaMoneyBillWave, FaTag } from 'react-icons/fa';

export default function EventDetail() {
  const { id } = useParams(); // Mengambil ID dari URL
  const navigate = useNavigate(); // Untuk navigasi setelah pendaftaran atau jika event tidak ditemukan

  const [event, setEvent] = useState(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    paymentMethod: '',
  });
  const [paymentStatus, setPaymentStatus] = useState(''); // 'idle', 'pending', 'success', 'failed'

  // Dummy event data (memastikan konsisten dengan Event.js dan menambahkan harga)
  // Saya menggunakan kembali link gambar yang sudah Anda sesuaikan
  const allEvents = [
    {
      id: '1',
      title: 'Meet & Greet with Bestselling Author',
      location: 'Periplus Grand Indonesia',
      date: 'Sab, 27 Jul 2024',
      category: 'Author Event',
      image: 'https://asset-2.tstatic.net/jakarta/foto/bank/images/diskusi-mengenai-buku-dan-film-crazy-rich-asians_20180923_161721.jpg', // Book signing
      description: 'Bergabunglah dalam sesi temu sapa eksklusif dengan penulis terkenal dari "The Whispering Pages." Dapatkan tanda tangan buku Anda dan berpartisipasi dalam sesi Tanya Jawab. Jangan lewatkan kesempatan langka ini untuk berinteraksi langsung dengan idola literatur Anda. Acara ini terbuka untuk umum dan gratis, namun registrasi diperlukan untuk memastikan ketersediaan tempat. Sesi ini juga akan menampilkan diskusi singkat tentang proses kreatif di balik novel terbarunya.',
      price: 0, // Gratis
      videoUrl: 'https://www.youtube.com/embed/j1lO2D9uB7A' // Contoh video YouTube (video pendek ulasan buku)
    },
    {
      id: '2',
      title: 'Children Storytelling Adventure',
      location: 'Periplus Pondok Indah Mall',
      date: 'Min, 28 Jul 2024',
      category: 'Kids Event',
      image: 'https://www.balairungpress.com/wp-content/uploads/2018/09/image1-768x576.jpeg', // Kids reading
      description: 'Ajak si kecil untuk petualangan dongeng yang ajaib. Pendongeng ahli kami akan menghidupkan karakter-karakter kesayangan. Cocok untuk anak usia 4-8 tahun. Kegiatan ini bertujuan untuk menumbuhkan minat baca sejak dini. Akan ada juga sesi mewarnai dan permainan interaktif yang seru. Biaya masuk termasuk paket snack untuk anak-anak.',
      price: 50000, // Rp 50.000
      videoUrl: 'https://www.youtube.com/embed/3QYh-WpLd7g' // Contoh video anak-anak
    },
    {
      id: '3',
      title: 'Book Club Discussion: Sci-Fi Genre',
      location: 'Periplus Lotte Shopping Avenue',
      date: 'Rab, 31 Jul 2024',
      category: 'Book Club',
      image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=400&h=250&q=80',
      description: 'Selami dunia fiksi ilmiah dengan klub buku bulanan kami. Bulan ini, kita akan membahas novel dystopian klasik "1984" oleh George Orwell. Diskusi akan mencakup tema-tema penting, karakter, dan relevansinya di masa kini. Datanglah dengan pikiran terbuka dan siap untuk berbagi pandangan Anda. Teh dan kopi akan disediakan. Acara ini gratis, namun registrasi diperlukan untuk persiapan tempat.',
      price: 0, // Gratis
      videoUrl: 'https://www.youtube.com/embed/vK7B1HkI1wM' // Contoh diskusi buku
    },
    {
      id: '4',
      title: 'Creative Writing Workshop',
      location: 'Periplus Pacific Place',
      date: 'Sab, 03 Agu 2024',
      category: 'Workshop',
      image: 'https://asset-2.tstatic.net/batam/foto/bank/images/Kegiatan-Nusa-Membaca-di-Gramedia-BCS-Mall-Batam.jpg',
      description: 'Bebaskan penulis dalam diri Anda! Pelajari teknik-teknik penting untuk bercerita, pengembangan karakter, dan konstruksi plot dalam lokakarya interaktif ini. Dipandu oleh penulis berpengalaman, Anda akan mendapatkan umpan balik langsung dan latihan praktis. Materi workshop dan alat tulis akan disediakan. Terbatas untuk 20 peserta, segera daftar!',
      price: 150000, // Rp 150.000
      videoUrl: 'https://www.youtube.com/embed/gI8V_L_Qk3Q' // Contoh workshop menulis
    },
    {
      id: '5',
      title: 'Graphic Novel & Comic Book Fair',
      location: 'Periplus Gandaria City',
      date: 'Min, 04 Agu 2024',
      category: 'Fair',
      image: 'https://jurnalposmedia.com/wp-content/uploads/2024/02/1-1.jpg',
      description: 'Jelajahi dunia novel grafis dan buku komik yang dinamis. Temukan artis baru, kisah klasik, dan edisi eksklusif. Akan ada sesi tanda tangan dengan beberapa ilustrator lokal, diskon khusus untuk pembelian koleksi tertentu, dan area baca yang nyaman. Ini adalah surga bagi para penggemar komik dan kesempatan bagus untuk kolektor.',
      price: 0, // Gratis
      videoUrl: 'https://www.youtube.com/embed/Pj15xY49_5o' // Contoh pameran komik
    },
    {
      id: '6',
      title: 'Japanese Manga & Anime Culture Day',
      location: 'Periplus Plaza Indonesia',
      date: 'Sab, 10 Agu 2024',
      category: 'Culture Event',
      image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&w=400&h=250&q=80',
      description: 'Benamkan diri Anda dalam budaya pop Jepang dengan diskusi, cosplay, dan rilis manga spesial. Akan ada kompetisi cosplay dengan hadiah menarik, sesi workshop menggambar manga, dan stand merchandise resmi. Ini adalah perayaan bagi semua pecinta budaya Jepang!',
      price: 75000, // Rp 75.000
      videoUrl: 'https://www.youtube.com/embed/2uJ24B0vQjY' // Contoh event anime
    },
    {
      id: '7',
      title: 'Poetry Reading & Open Mic Night',
      location: 'Periplus Central Park',
      date: 'Jum, 16 Agu 2024',
      category: 'Performance',
      image: 'https://akcdn.detik.net.id/community/pasma/2024/12/02/17331506911021659594.jpg?w=350',
      description: 'Bagikan suara Anda atau nikmati malam puisi yang kuat. Semua penyair dan penggemar dipersilakan! Acara ini memberikan platform bagi bakat-bakat baru dan kesempatan bagi penonton untuk menikmati karya sastra yang indah. Tersedia juga makanan ringan dan minuman. Gratis untuk audiens, biaya registrasi untuk tampil di Open Mic.',
      price: 25000, // Rp 25.000 (untuk yang ingin tampil)
      videoUrl: 'https://www.youtube.com/embed/V6jE35Y-h_8' // Contoh open mic puisi
    },
    {
      id: '8',
      title: 'Local Author Showcase',
      location: 'Periplus Kota Kasablanka',
      date: 'Sab, 24 Agu 2024',
      category: 'Author Event',
      image: 'https://media.suara.com/pictures/653x366/2023/12/20/36711-book-gedebook-di-periplus-tirtodipuran-istimewapeta-digital.jpg',
      description: 'Temukan talenta-talenta baru dari kancah sastra lokal kami. Temui penulis, diskusikan karya-karya mereka, dan dukung penulisan lokal. Akan ada sesi penjualan buku dan tanda tangan, serta diskusi panel singkat tentang tantangan dan peluang bagi penulis di Indonesia. Gratis dan terbuka untuk umum, mari dukung karya anak bangsa!',
      price: 0, // Gratis
      videoUrl: 'https://www.youtube.com/embed/Q0P_pQj53tQ' // Contoh showcase penulis
    }
  ];

  useEffect(() => {
    const foundEvent = allEvents.find(e => e.id === id);
    if (foundEvent) {
      setEvent(foundEvent);
    } else {
      navigate('/events'); // Arahkan kembali jika event tidak ditemukan
    }
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    setPaymentStatus('pending'); // Set status pembayaran menjadi pending

    // Simulasi proses pendaftaran dan pembayaran
    setTimeout(() => {
      // Validasi sederhana
      if (!formData.name || !formData.email || !formData.phone) {
        setPaymentStatus('failed');
        alert('Mohon lengkapi semua bidang yang diperlukan.');
        return;
      }

      if (event.price > 0 && !formData.paymentMethod) {
        setPaymentStatus('failed');
        alert('Mohon pilih metode pembayaran untuk event berbayar.');
        return;
      }

      // Jika validasi sukses, anggap pembayaran/pendaftaran berhasil
      setPaymentStatus('success');
      alert(`Pendaftaran berhasil untuk ${formData.name}! \nDetail konfirmasi akan dikirim ke ${formData.email}.`);
      setShowRegistrationForm(false); // Sembunyikan form setelah pendaftaran
      setFormData({ // Reset form data
        name: '',
        email: '',
        phone: '',
        paymentMethod: '',
      });
    }, 2000); // Simulasi 2 detik proses
  };

  if (!event) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl text-gray-700">Memuat detail event...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
      {/* Header Section */}
      <div className="bg-red-800 text-white py-6 px-6 sm:px-10 lg:px-20 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/events" className="text-xl font-bold hover:text-red-200 transition flex items-center">
            <FaArrowLeft className="mr-2" /> Kembali
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold">{event.title}</h1>
          <div></div> {/* Placeholder for alignment */}
        </div>
      </div>

      {/* Event Detail Content */}
      <div className="max-w-7xl mx-auto py-12 px-6 sm:px-10 lg:px-20 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Image, Description & Video */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-8">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-80 object-cover rounded-lg mb-6 shadow-md"
          />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{event.title}</h2>
          <div className="flex flex-wrap items-center text-gray-700 mb-2">
            <FaCalendarAlt className="mr-3 text-red-600 text-xl" />
            <span className="text-lg mr-4">{event.date}</span>
            <FaMapMarkerAlt className="mr-3 text-red-600 text-xl" />
            <span className="text-lg mr-4">{event.location}</span>
            <FaTag className="mr-3 text-red-600 text-xl" />
            <span className="text-lg">{event.category}</span>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Tentang Event</h3>
          <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
            {event.description}
          </p>

          {event.videoUrl && (
            <div className="mt-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-3 flex items-center">
                <FaPlayCircle className="mr-3 text-red-600" /> Video Highlight
              </h3>
              <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
                <iframe
                  src={event.videoUrl}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
                  title="Event Video"
                ></iframe>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Registration and Payment */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-8 sticky top-6 self-start">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Daftar Event Ini</h3>

          <div className="flex items-center justify-between bg-red-50 text-red-800 p-4 rounded-lg mb-6 font-semibold">
            <FaMoneyBillWave className="text-2xl mr-3" />
            {event.price === 0 ? (
              <span className="text-xl">GRATIS</span>
            ) : (
              <span className="text-xl">Harga: Rp {event.price.toLocaleString('id-ID')}</span>
            )}
          </div>

          {!showRegistrationForm && (
            <button
              onClick={() => setShowRegistrationForm(true)}
              className="w-full bg-red-700 text-white py-4 rounded-lg font-bold text-lg hover:bg-red-800 transition duration-300 shadow-md"
            >
              {event.price === 0 ? 'Daftar Sekarang' : 'Beli Tiket Sekarang'}
            </button>
          )}

          {showRegistrationForm && (
            <form onSubmit={handleRegistrationSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nama Lengkap</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Nomor Telepon</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              {event.price > 0 && (
                <div>
                  <label htmlFor="paymentMethod" className="block text-gray-700 text-sm font-bold mb-2">Metode Pembayaran</label>
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    className="shadow border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                    required
                  >
                    <option value="">Pilih Metode Pembayaran</option>
                    <option value="bank_transfer">Transfer Bank</option>
                    <option value="credit_card">Kartu Kredit</option>
                    <option value="e_wallet">E-Wallet</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                className={`w-full py-4 rounded-lg font-bold text-lg transition duration-300 shadow-md
                  ${paymentStatus === 'pending' ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-700 hover:bg-red-800 text-white'}`}
                disabled={paymentStatus === 'pending'}
              >
                {paymentStatus === 'pending' ? 'Memproses Pembayaran...' : (event.price === 0 ? 'Daftar' : 'Bayar Sekarang')}
              </button>

              {paymentStatus === 'success' && (
                <p className="mt-4 text-center text-green-600 font-semibold">Pendaftaran berhasil!</p>
              )}
              {paymentStatus === 'failed' && (
                <p className="mt-4 text-center text-red-600 font-semibold">Pendaftaran gagal. Silakan coba lagi.</p>
              )}
            </form>
          )}
           {/* Tombol kembali ke halaman Event jika form pendaftaran sudah muncul */}
           {showRegistrationForm && paymentStatus !== 'pending' && ( // Sembunyikan tombol batal jika sedang memproses
            <button
              onClick={() => {
                setShowRegistrationForm(false);
                setPaymentStatus('idle'); // Reset status pembayaran saat batal
              }}
              className="w-full mt-4 bg-gray-300 text-gray-700 py-3 rounded-lg font-bold text-lg hover:bg-gray-400 transition duration-300 shadow-sm"
            >
              Batal
            </button>
          )}
        </div>
      </div>
    </div>
  );
}