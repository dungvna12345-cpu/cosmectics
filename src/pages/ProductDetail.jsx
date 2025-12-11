import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import AccentBadge from '../components/AccentBadge'
import ProductCard from '../components/ProductCard'
import { products } from '../data/mockData'
import { useCart } from '../store/cartContext'

function ProductDetail() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const product = products.find((p) => p.id === id)
  const [added, setAdded] = useState(false)

  const related = useMemo(() => {
    if (!product) return []
    return products
      .filter((p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
      .slice(0, 4)
  }, [product])

  if (!product) {
    return <div className="py-20 text-center text-lg">Không tìm thấy sản phẩm.</div>
  }

  const price = product.salePrice ?? product.price
  const hasDiscount = Boolean(product.salePrice)
  const discount = hasDiscount ? Math.round(((product.price - price) / product.price) * 100) : 0

  return (
    <div className="space-y-10">
      <div className="grid gap-8 rounded-3xl bg-white/80 p-6 shadow-lg ring-1 ring-rose-100 md:grid-cols-2">
        <div className="space-y-4">
          <img src={product.image} alt={product.name} className="w-full rounded-2xl object-cover shadow-md" />
          <div className="flex gap-2">
            <AccentBadge>{product.category}</AccentBadge>
            <AccentBadge>{product.brand}</AccentBadge>
            {hasDiscount && <AccentBadge>-{discount}%</AccentBadge>}
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.08em] text-slate-500">{product.brand}</p>
          <h1 className="text-3xl font-bold text-slate-900">{product.name}</h1>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
              ★ {product.rating.toFixed(1)}
            </span>
            <span className="text-sm text-slate-500">{product.popularity}% quan tâm</span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-rose-600">{price.toLocaleString('vi-VN')}₫</span>
            {hasDiscount && (
              <span className="text-sm text-slate-400 line-through">
                {product.price.toLocaleString('vi-VN')}₫
              </span>
            )}
          </div>
          <p className="text-slate-700">{product.description}</p>
          <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Thành phần chính</p>
            <p>{product.ingredients}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>
          <button
            className="w-full rounded-xl bg-rose-500 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-rose-200 transition hover:bg-rose-600"
            onClick={() => {
              addToCart(product)
              setAdded(true)
              setTimeout(() => setAdded(false), 1800)
            }}
          >
            {added ? 'Đã thêm' : 'Thêm vào giỏ'}
          </button>
        </div>
      </div>

      {related.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">Gợi ý liên quan</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetail

