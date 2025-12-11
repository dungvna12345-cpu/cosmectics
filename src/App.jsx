import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import Blog from './pages/Blog'
import BlogDetail from './pages/BlogDetail'
import Cart from './pages/Cart'
import Home from './pages/Home'
import Contact from './pages/Contact'
import ProductDetail from './pages/ProductDetail'
import Products from './pages/Products'
import Wishlist from './pages/Wishlist'

function App() {
  return (
    <div className="min-h-screen text-slate-900">
      <Navbar />
      <ScrollToTop />
      <main className="mx-auto max-w-6xl px-6 pt-24 pb-10 sm:pt-28 sm:pb-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route
            path="*"
            element={<div className="py-20 text-center text-lg">Không tìm thấy trang.</div>}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App

