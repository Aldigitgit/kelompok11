import React, { useState } from 'react';
import { FaMapMarkerAlt, FaWhatsapp, FaInstagram, FaClock, FaSearch } from 'react-icons/fa';

export default function About() {
  const [language, setLanguage] = useState('english');
  const [searchTerm, setSearchTerm] = useState('');

  const content = {
    english: {
      title: "About Periplus",
      subtitle: "MULTIPLE",
      subtitle2: "BOOKSTORE",
      intro: "PERIPLUS was founded in 1985 to provide high-quality imported books and magazines to readers in Indonesia. Through the years, our network has grown and we now have over 56 retail outlets in strategic shopping areas around Indonesia including airports and malls. And our latest outlet is at Petitenget, Bali.",
      stores: "PERIPLUS BOOKSTORES make the latest air-flown imported books and magazines available in an attractive environment. Our staff are trained to be knowledgeable and helpful.",
      kiosk: "PERIPLUS E-KIOSK TERMINALS allow in-store staff to assist you in ordering any book or magazine from around the world and have it delivered directly to your home or office.",
      online: "PERIPLUS.COM ONLINE BOOKSTORE enables you to select from over 21 million international books and magazines with fast, guaranteed delivery and low prices.",
      whyBest: "This service is regarded as the best online retailer in Indonesia for the following reasons:",
      reasons: [
        "Fast delivery for best-selling products",
        "Advance preordering of best-selling books and magazines for delivery to your home or office within 2 days of the official release date in Indonesia",
        "Convenient online shopping puts you just a click away from your favorite books and magazines in the comfort of your home or office without fighting traffic and crowds",
        "No hidden costs because unlike other online stores Periplus does not charge extra fees or taxes later after you order. All prices shown on our website include delivery and taxes",
        "Secure online payments managed by reputable banks. Periplus does not receive or retain your credit card data as payments are handled via a secure link direct to the bank portal"
      ],
      conclusion: "Periplus is the leading Indonesian bookstore for all your reading needs with friendly staff who are ready to help you anytime. If you have a question or problem you can email or call us and get an immediate reply. That's our promise!",
      searchPlaceholder: "Search stores...",
      businessHours: "Business Hours",
      everyDay: "Every Day",
      viewLocation: "View Location",
      ourStores: "Our Store Location"
    },
    indonesia: {
      title: "Tentang Periplus",
      subtitle: "MULTIPLE",
      subtitle2: "BOOKTORE",
      intro: "PERIPLUS didirikan pada tahun 1985 untuk menyediakan buku dan majalah impor berkualitas tinggi bagi pembaca di Indonesia. Selama bertahun-tahun, jaringan kami telah berkembang dan kini kami memiliki lebih dari 56 gerai ritel di lokasi strategis di seluruh Indonesia termasuk bandara dan mal. Gerai terbaru kami berada di Petitenget, Bali.",
      stores: "TOKO BUKU PERIPLUS menyediakan buku dan majalah impor terbaru yang langsung diimpor dalam lingkungan yang menarik. Staf kami dilatih untuk menjadi berpengetahuan dan membantu.",
      kiosk: "TERMINAL E-KIOSK PERIPLUS memungkinkan staf di toko membantu Anda memesan buku atau majalah dari seluruh dunia dan mengirimkannya langsung ke rumah atau kantor Anda.",
      online: "TOKO BUKU ONLINE PERIPLUS.COM memungkinkan Anda memilih dari lebih dari 21 juta buku dan majalah internasional dengan pengiriman cepat, terjamin, dan harga murah.",
      whyBest: "Layanan ini dianggap sebagai pengecer online terbaik di Indonesia karena alasan berikut:",
      reasons: [
        "Pengiriman cepat untuk produk terlaris",
        "Pemesanan lebih awal buku dan majalah terlaris untuk pengiriman ke rumah atau kantor Anda dalam 2 hari setelah tanggal rilis resmi di Indonesia",
        "Belanja online yang nyaman membuat Anda hanya satu klik dari buku dan majalah favorit Anda dengan nyaman di rumah atau kantor tanpa harus berhadapan dengan kemacetan dan keramaian",
        "Tidak ada biaya tersembunyi karena tidak seperti toko online lainnya, Periplus tidak mengenakan biaya atau pajak tambahan setelah Anda memesan. Semua harga yang ditampilkan di situs web kami sudah termasuk pengiriman dan pajak",
        "Pembayaran online yang aman dikelola oleh bank ternama. Periplus tidak menerima atau menyimpan data kartu kredit Anda karena pembayaran ditangani melalui tautan aman langsung ke portal bank"
      ],
      conclusion: "Periplus adalah toko buku terkemuka di Indonesia untuk semua kebutuhan membaca Anda dengan staf yang ramah dan siap membantu Anda kapan saja. Jika Anda memiliki pertanyaan atau masalah, Anda dapat mengirim email atau menelepon kami dan mendapatkan balasan segera. Itu janji kami!",
      searchPlaceholder: "Cari toko...",
      businessHours: "Jam Operasional",
      everyDay: "Setiap Hari",
      viewLocation: "Lihat Lokasi",
      ourStores: "Lokasi Toko Kami"
    }
  };

  const currentContent = content[language];

  const storeData = [
    {
      name: 'Periplus Margo City Mall',
      address: 'Lantai LG, Jl. Margonda Raya No.358, Kemiri Muka, Kec. Beji, Depok',
      hours: '10:00 - 22:00',
      phone: '0859-50098461',
      ig: 'periplus.margocitymall',
      image: 'https://images.unsplash.com/photo-1551029506-0807df4e2031'
    },
    {
      name: 'Periplus Grand Indonesia',
      address: 'Grand Indonesia East Mall LG, unit 20-23, Jl. M.H. Thamrin No.1, Menteng, Jakarta Pusat',
      hours: '10:00 - 22:00',
      phone: '0859-50098476',
      ig: 'periplus.grandindonesia',
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f'
    },
    {
      name: 'Periplus Lotte Shopping Avenue',
      address: 'Jl. Prof. Dr. Satrio Kav. 3-5, Kuningan, LG Floor Unit 08, Jakarta Selatan',
      hours: '10:00 - 22:00',
      phone: '021-29885678',
      ig: 'periplus.lottesh',
      image: 'https://images.unsplash.com/photo-1589998059171-988d887df646'
    },
    {
      name: 'Periplus Setiabudi One',
      address: 'Jl. H.R. Rasuna Said, Kuningan, Lantai GF Kav 64, DKI Jakarta',
      hours: '10:00 - 22:00',
      phone: '0877-5721767',
      ig: 'periplus.setabudione',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac'
    },
    {
      name: 'Periplus Plaza Indonesia',
      address: 'Jl. MH Thamrin Kav. 28-30, Basement Floor 84-86, Jakarta Pusat',
      hours: '10:00 - 22:00',
      phone: '0877-82866044',
      ig: 'periplus.plazaindonesia',
      image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66'
    },
    {
      name: 'Periplus Pondok Indah Mall',
      address: 'Metro Pondok Indah Blok III B Lt. I No.148, Jakarta Selatan',
      hours: '10:00 - 22:00',
      phone: '0877-82866046',
      ig: 'periplus.pondokindahmall',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da'
    },
    {
      name: 'Periplus Pacific Place',
      address: 'Pacific Place Mall, SCBD, Jl. Jend. Sudirman Kav. 52-53 Lot 385, Jakarta',
      hours: '10:00 - 22:00',
      phone: '0859-50098449',
      ig: 'periplus.pacificplace',
      image: 'https://images.unsplash.com/photo-1551029506-0807df4e2031'
    },
    {
      name: 'Periplus Gandaria City',
      address: 'Jl. K.H. M. Syafi\'i Hadzami No.8, LG 14F17, Jakarta Selatan',
      hours: '10:00 - 22:00',
      phone: '0877-82866051',
      ig: 'periplus.gandariacity',
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f'
    },
    {
      name: 'Periplus #buybooksfromhome',
      address: 'Jl. Rawa Gelam IV No.9, Kawasan Industri Pulogadung, Jakarta Timur',
      hours: '10:00 - 22:00',
      phone: '0877-82866052',
      ig: 'periplus.buybooksfromhome',
      image: 'https://images.unsplash.com/photo-1589998059171-988d887df646'
    }
  ];

  const filteredStores = storeData.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="bg-gray-50 py-12 px-6 md:px-10 lg:px-32">
      <div className="max-w-6xl mx-auto">
        {/* Language Toggle */}
        <div className="flex justify-end mb-8">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => setLanguage('english')}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${language === 'english' ? 'bg-red-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('indonesia')}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${language === 'indonesia' ? 'bg-red-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              Bahasa Indonesia
            </button>
          </div>
        </div>

        {/* Header with Store Image - Carousel */}
        <div className="relative w-full rounded-xl overflow-hidden mb-6">
          <div className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth h-64">
            {[
              "https://upload.wikimedia.org/wikipedia/commons/9/9d/Periplus_Bookshop_Pondoh_Indah_Mall_%282023-07-07%29.jpg",
              "https://cms.westjavatoday.com/uploads/images/2025/01/image_750x500_677a9139b6c32.jpg",
              "https://cdn1.katadata.co.id/media/images/thumb/2025/01/06/Toko_buku_Periplus-2025_01_06-15_44_39_20ecd1067e3de5fd445678a256da4b4b_960x640_thumb.jpg"
            ].map((src, index) => (
              <div key={index} className="snap-center flex-shrink-0 w-full h-64 relative">
                <img
                  src={src}
                  alt={`Periplus Store ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">{currentContent.title}</h1>
                    <div className="flex justify-center space-x-8">
                      <span className="text-xl font-semibold text-white drop-shadow">{currentContent.subtitle}</span>
                      <span className="text-xl font-semibold text-white drop-shadow">{currentContent.subtitle2}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
          <div className="p-8 md:p-12">
            <p className="text-lg mb-6 leading-relaxed">{currentContent.intro}</p>

            {/* Store Images Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1551029506-0807df4e2031?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                  alt="Periplus Store Front"
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                  alt="Periplus Store Interior"
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold mb-4 text-red-600">PERIPLUS BOOKSTORES</h3>
                <p className="text-gray-700">{currentContent.stores}</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold mb-4 text-red-600">PERIPLUS E-KIOSK TERMINALS</h3>
                <p className="text-gray-700">{currentContent.kiosk}</p>
              </div>
            </div>

            <div className="bg-red-50 p-6 rounded-lg border border-red-200 mb-10">
              <h3 className="text-xl font-semibold mb-4 text-red-600">PERIPLUS.COM ONLINE BOOKSTORE</h3>
              <p className="text-gray-700">{currentContent.online}</p>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">{currentContent.whyBest}</h2>
              <ul className="space-y-3">
                {currentContent.reasons.map((reason, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">•</span>
                    <span className="text-gray-700">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg">
              <p className="text-gray-700 italic">{currentContent.conclusion}</p>
            </div>
          </div>
        </div>

        {/* Store Gallery */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            {currentContent.ourStores}
          </h2>

          {/* Search Bar */}
          {/* If you want to re-enable the search bar, uncomment the following block */}
          {/* <div className="relative mb-6 max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={currentContent.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div> */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStores.map((store, index) => (
              <div key={index} className="rounded-xl overflow-hidden shadow-lg bg-white transition hover:shadow-xl hover:-translate-y-1">
                <div className="h-48 overflow-hidden">
                  <img
                    src={store.image}
                    alt={store.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{store.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{store.address}</p>

                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <FaClock className="mr-2" />
                    <span>{currentContent.businessHours}: {currentContent.everyDay} {store.hours}</span>
                  </div>

                  <div className="flex space-x-4 justify-center"> {/* Centered icons */}
                    <a
                      href={`https://wa.me/62${store.phone.replace(/-/g, '').substring(1)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700 transition"
                      title="WhatsApp"
                    >
                      <FaWhatsapp size={24} /> {/* Increased size slightly for better visibility */}
                    </a>
                    <a
                      href={`https://instagram.com/${store.ig}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-600 hover:text-pink-700 transition"
                      title="Instagram"
                    >
                      <FaInstagram size={24} />
                    </a>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 hover:text-red-700 transition"
                      title="View on Map"
                    >
                      <FaMapMarkerAlt size={24} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          {language === 'english' ? 'Last updated: June 2024' : 'Terakhir diperbarui: Juni 2024'}
        </div>
      </div>
      <Footer></Footer>
    </section>
  );
}