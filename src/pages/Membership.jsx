import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { FaStar, FaCrown, FaGem } from "react-icons/fa";

const tiers = {
  Silver: {
    name: "Silver",
    icon: FaStar,
    color: "text-gray-500",
    bg: "bg-gray-100",
    border: "border-gray-300",
    criteria: "Transaksi Rp1.000.000 - Rp4.999.999 / tahun",
    benefits: ["Diskon 5%", "Gratis Ongkir Jabotabek", "Hadiah ulang tahun"],
  },
  Gold: {
    name: "Gold",
    icon: FaCrown,
    color: "text-yellow-500",
    bg: "bg-yellow-100",
    border: "border-yellow-300",
    criteria: "Transaksi Rp5.000.000 - Rp9.999.999 / tahun",
    benefits: ["Semua Silver", "Styling gratis", "Undangan event privat"],
  },
  Platinum: {
    name: "Platinum",
    icon: FaGem,
    color: "text-indigo-400",
    bg: "bg-indigo-100",
    border: "border-indigo-300",
    criteria: "Transaksi ≥ Rp10.000.000 / tahun",
    benefits: ["Semua Gold", "Produk eksklusif", "Prioritas layanan pelanggan"],
  },
};

export default function MemberSegmentPage() {
  const [profile, setProfile] = useState(null);
  const accountId = localStorage.getItem("account_id");

  useEffect(() => {
    if (accountId) fetchProfile();
  }, [accountId]);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from("account")
      .select("name, email, segmentasi")
      .eq("id", accountId)
      .single();

    if (error) {
      console.error("Gagal ambil data akun:", error.message);
    } else {
      setProfile(data);
    }
  };

  const currentTier = profile?.segmentasi && tiers[profile.segmentasi] ? tiers[profile.segmentasi] : null;
  const TierIcon = currentTier?.icon;

  return (
    <div className="min-h-screen bg-gradient-to-tr from-white via-gray-50 to-white pt-28 pb-16 px-4">
      <div className="max-w-4xl mx-auto">

        {/* CARD UTAMA PROFIL */}
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center mb-12 border border-gray-200">
          <div className={`inline-block p-5 ${currentTier?.bg || "bg-gray-100"} rounded-full mb-5 border-4 border-white shadow-inner`}>
            {TierIcon && <TierIcon className={`w-16 h-16 ${currentTier.color}`} />}
          </div>
          <h2 className="text-3xl font-bold tracking-wide text-gray-800">{profile?.name || "Loading..."}</h2>
          <p className="text-gray-500 mt-1 mb-3">{profile?.email || ""}</p>
          <span className={`inline-block text-lg font-semibold px-4 py-1 rounded-full ${currentTier?.bg} ${currentTier?.color}`}>
            {currentTier?.name || "Belum Ditentukan"}
          </span>
        </div>

        {/* LIST SEGMENTASI */}
        <div className="bg-white rounded-3xl shadow-md p-8 border border-gray-100">
          <h3 className="text-2xl font-bold text-center mb-6 text-gray-700">Level Membership & Benefit</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {Object.values(tiers).map((tier, i) => {
              const Icon = tier.icon;
              return (
                <div
                  key={i}
                  className={`p-5 rounded-2xl shadow-sm border-2 ${tier.border} hover:shadow-md transition duration-300 bg-white`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className={`w-6 h-6 ${tier.color}`} />
                    <div>
                      <h4 className={`text-lg font-semibold ${tier.color}`}>{tier.name}</h4>
                      <p className="text-sm text-gray-500 italic">{tier.criteria}</p>
                    </div>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-2 mt-2">
                    {tier.benefits.map((b, j) => (
                      <li key={j} className="flex items-start">
                        <span className="text-green-500 mr-2 mt-1">✔</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
