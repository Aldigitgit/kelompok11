import React, { useState } from 'react'
import { Star } from 'lucide-react'

const ReviewPage = () => {
  const order = {
    productName: 'Puzzle Edukasi Anak',
    price: 45000,
    date: '28 Mei 2025',
  }

  const [review, setReview] = useState({
    rating: 0,
    comment: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleStarClick = (star) => {
    setReview((prev) => ({ ...prev, rating: star }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setReview(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (review.rating === 0) {
      alert("Mohon berikan rating dulu ya!")
      return
    }
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4 py-10">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-blue-800">🎉 Terima kasih sudah berbelanja!</h1>

        <div className="bg-gray-50 border border-gray-200 p-5 rounded-2xl">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">🧾 Ringkasan Pembelian</h2>
          <div className="text-sm text-gray-600 space-y-1">
            <p><span className="font-medium">Produk:</span> {order.productName}</p>
            <p><span className="font-medium">Harga:</span> Rp {order.price.toLocaleString()}</p>
            <p><span className="font-medium">Tanggal:</span> {order.date}</p>
          </div>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-medium text-gray-800 mb-2">Rating Anda:</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-7 h-7 cursor-pointer transition ${
                      star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
                    onClick={() => handleStarClick(star)}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block font-medium text-gray-800 mb-2">Komentar:</label>
              <textarea
                name="comment"
                value={review.comment}
                onChange={handleChange}
                rows={4}
                placeholder="Tulis ulasan Anda..."
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Kirim Review
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 p-5 rounded-2xl text-green-800">
              <h2 className="text-lg font-semibold mb-1">✅ Review Terkirim!</h2>
              <p>Terima kasih atas review Anda. Review ini sangat membantu pengguna lainnya.</p>
            </div>

            {/* ⬇️ Menampilkan hasil review */}
            <div className="bg-white border border-gray-100 shadow p-5 rounded-2xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">📝 Review Anda</h3>
              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 ${
                      star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-700 whitespace-pre-line">{review.comment}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ReviewPage
