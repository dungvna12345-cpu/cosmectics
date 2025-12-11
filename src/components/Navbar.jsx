import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { categories } from '../data/mockData'
import { useCart } from '../store/cartContext'

const navItems = [
  { to: '/', label: 'Trang chủ' },
  { to: '/products', label: 'Sản phẩm' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Liên hệ' },
  { to: '/cart', label: 'Giỏ hàng' },
 
]

function Navbar() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const [open, setOpen] = useState(false)
  const [pinned, setPinned] = useState(false)
  const [isScrolled, setIsScrolled] = useState(!isHomePage) // Ở trang khác luôn có nền trắng
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollYRef = useRef(0)
  const tickingRef = useRef(false)
  const [glow, setGlow] = useState({ x: 50, y: 50, visible: false })
  const { summary } = useCart()
  const catList = categories
  const headerRef = useRef(null)
  const [logoAvailable, setLogoAvailable] = useState(true)

  useEffect(() => {
    if (!open) return
    const onDocClick = (e) => {
      if (!headerRef.current?.contains(e.target)) {
        setOpen(false)
        setPinned(false)
      }
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [open])

  useEffect(() => {
    const onScroll = () => {
      if (tickingRef.current) return
      tickingRef.current = true
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY
        const viewportHeight = window.innerHeight

        // Logic đổi màu header
        if (isHomePage) {
          setIsScrolled(currentScrollY > viewportHeight - 50)
        } else {
          setIsScrolled(true)
        }

        // Logic ẩn/hiện header
        // Nếu menu đang mở (hover hoặc đã click), giữ header hiển thị để người dùng có thể tương tác
        if (open) {
          setIsVisible(true)
        } else if (currentScrollY < 10) {
          setIsVisible(true)
        } else {
          if (currentScrollY > lastScrollYRef.current && currentScrollY > 100) {
            setIsVisible(false)
          } else if (currentScrollY < lastScrollYRef.current) {
            setIsVisible(true)
          }
        }

        lastScrollYRef.current = currentScrollY
        tickingRef.current = false
      })
    }

    // Reset state khi chuyển trang
    setIsScrolled(!isHomePage)
    setIsVisible(true)
    lastScrollYRef.current = window.scrollY

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHomePage, open])

  const handleMouseMove = (e) => {
    const rect = headerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setGlow({ x, y, visible: true })
  }

  const handleMouseLeave = () => setGlow((g) => ({ ...g, visible: false }))

  const headerClasses = useMemo(() => {
    const base = 'fixed top-0 left-0 right-0 z-50 transition-all duration-300'
    const visibility = isVisible ? 'translate-y-0' : '-translate-y-full'
    if (isScrolled) {
      return `${base} ${visibility} border-b border-slate-100/70 bg-white/92 text-slate-800 shadow-sm backdrop-blur-md`
    }
    return `${base} ${visibility} border-transparent bg-transparent text-white shadow-none backdrop-blur-none`
  }, [isScrolled, isVisible])

  return (
    <header
      ref={headerRef}
      className={headerClasses}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        glow.visible
          ? {
              background: `radial-gradient(600px at ${glow.x}% ${glow.y}%, rgba(79, 147, 230, 0.08), transparent 40%)`,
            }
          : undefined
      }
    >
      <div className="relative mx-auto fFw-full max-w-7xl flex-col items-center gap-3 px-6 py-4 sm:px-8">
        <NavLink
          to="/"
          className={`group flex flex-col items-center gap-1 text-2xl font-semibold tracking-[0.18em] transition hover:translate-y-[-1px] ${
            isScrolled ? 'text-slate-800' : 'text-white'
          }`}
        >
          {logoAvailable ? (
            <img
              src="/logo11.png"
              alt="Phuong Cosmetics"
              className="h-10 sm:h-16 md:h-20 lg:h-24 w-auto object-contain"
              onError={() => setLogoAvailable(false)}
              onLoad={() => setLogoAvailable(true)}
            />
          ) : (
            <>
              <span className={`text-3xl font-bold tracking-[0.28em] ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
                PHƯƠNG
              </span>
              <span className={`text-base font-semibold tracking-[0.36em] ${isScrolled ? 'text-slate-600' : 'text-white/80'}`}>
                COSMETICS
              </span>
            </>
          )}
        </NavLink>

        <nav className="flex flex-wrap items-center justify-center gap-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-slate-700 sm:gap-5">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative px-2 py-1 transition ${
                  isActive
                    ? 'text-rose-300'
                    : isScrolled
                    ? 'text-slate-700 hover:text-rose-500'
                    : 'text-white hover:text-rose-200'
                }`
              }
            >
              <span className="flex items-center gap-1">
                {item.label}
                {item.to === '/cart' && summary.count > 0 && (
                  <span className="ml-1 inline-flex min-w-[20px] items-center justify-center rounded-full bg-rose-500 px-2 text-[10px] font-bold text-white shadow-sm">
                    {summary.count}
                  </span>
                )}
              </span>
              <span
                className={`pointer-events-none absolute left-0 right-0 -bottom-1 mx-auto h-[2px] w-8 rounded-full bg-rose-400 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-[1px] ${
                  isScrolled ? '' : 'group-hover:bg-rose-200'
                }`}
                aria-hidden
              />
            </NavLink>
          ))}

          <div
            className="relative"
            onMouseEnter={() => { setOpen(true); }}
            onMouseLeave={() => { if (!pinned) setOpen(false) }}
          >
            <button
              onClick={() => {
                setOpen((v) => {
                  const next = !v
                  setPinned(next)
                  return next
                })
              }}
              aria-expanded={open}
              className={`flex items-center gap-1 px-2 py-1 transition ${
                isScrolled ? 'text-slate-700 hover:text-rose-500' : 'text-white hover:text-rose-200'
              }`}
            >
             DANH MỤC
              <span className={`inline-block text-xs transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden>
                ▾
              </span>
            </button>
            <div
              className={`absolute left-1/2 mt-2 w-56 -translate-x-1/2 overflow-hidden rounded-2xl border border-slate-100 bg-white/95 shadow-xl ring-1 ring-rose-50 backdrop-blur transition-all duration-250 ease-out ${
                open ? 'pointer-events-auto opacity-100 translate-y-0' : 'pointer-events-none opacity-0 -translate-y-2'
              }`}
            >
              <div className="bg-rose-50/70 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-rose-500">
                Danh mục
              </div>
              <div className="grid gap-1 p-2 text-sm">
                <Link
                  to="/products"
                  className="rounded-lg px-2 py-2 text-slate-700 font-semibold transition hover:bg-rose-50 hover:text-rose-600"
                  onClick={() => { setOpen(false); setPinned(false) }}
                >
                  Tất cả
                </Link>
                {catList.map((cat) => (
                  <Link
                    key={cat}
                    to={`/products?category=${encodeURIComponent(cat)}`}
                    className="rounded-lg px-2 py-2 text-slate-700 font-semibold transition hover:bg-rose-50 hover:text-rose-600"
                    onClick={() => { setOpen(false); setPinned(false) }}
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar

