import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white/80 backdrop-blur">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-8 text-sm text-slate-600 md:grid-cols-4">
        <div className="space-y-2">
          <p className="text-lg font-bold text-rose-600">Phương Cosmectics</p>
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Beauty & Lifestyle</p>
        </div>
        <div className="space-y-2 font-semibold text-slate-800">
          <p className="text-slate-500">Khám phá</p>
          <Link to="/" className="block hover:text-rose-600">
            Trang chủ
          </Link>
          <Link to="/products" className="block hover:text-rose-600">
            Sản phẩm
          </Link>
          <Link to="/blog" className="block hover:text-rose-600">
            Blog & Brand story
          </Link>
        </div>
        <div className="space-y-2 font-semibold text-slate-800">
          <p className="text-slate-500">Tài khoản</p>
          <Link to="/cart" className="block hover:text-rose-600">
            Giỏ hàng
          </Link>
          <Link to="/wishlist" className="block hover:text-rose-600">
            Yêu thích
          </Link>
        </div>
        <div className="space-y-3">
          <p className="text-slate-500">Liên hệ</p>
          <a href="mailto:quynhphuong11a8@gmail.com" className="font-semibold text-slate-800 hover:underline">quynhphuong11a8@gmail.com</a>
          <div className="flex gap-3 text-sm font-semibold text-rose-600">
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:text-rose-700">Instagram</a>
            <a href="https://www.facebook.com/quynhphuong.kieuthi.16" target="_blank" rel="noopener noreferrer" className="hover:text-rose-700">Facebook</a>
            <a href="https://www.tiktok.com/@04kphuongphuba27" target="_blank" rel="noopener noreferrer" className="hover:text-rose-700">TikTok</a>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-100 bg-white/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-4 text-xs text-slate-500 sm:flex-row">
          <span>© 2025 Phương Cosmectics. Demo UI for clean beauty & lifestyle.</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer

