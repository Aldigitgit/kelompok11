import { Search, User } from 'lucide-react'
import { useLocation } from 'react-router-dom'

const formatPath = (path) => {
  // Ubah slug jadi huruf kapital awal, ganti - dengan spasi
  return path
    .replace('-', ' ')
    .replace('/', '')
    .replace(/^\w/, (c) => c.toUpperCase())
}

const Header = () => {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white border-b sticky top-0 z-40 shadow-sm">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-400 tracking-wide">
        {pathnames.length === 0 ? (
          'Pages / Dashboard'
        ) : (
          <>
            Pages /
            {pathnames.map((name, index) => {
              const isLast = index === pathnames.length - 1
              const display = formatPath(name)

              return (
                <span key={index} className={`ml-1 ${isLast ? 'text-gray-800 font-semibold' : ''}`}>
                  {display}
                  {!isLast && ' /'}
                </span>
              )
            })}
          </>
        )}
      </div>

    </header>
  )
}

export default Header
