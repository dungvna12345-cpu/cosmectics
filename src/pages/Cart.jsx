import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../store/cartContext'

function Cart() {
  const { items, updateQty, remove, clear, summary } = useCart()
  const [success, setSuccess] = useState(false)

  const handleCheckout = () => {
    setSuccess(true)
    setTimeout(() => setSuccess(false), 2000)
    clear()
  }
 








  
  if (items.length === 0) {
    return (
      <div className="rounded-3xl bg-white/80 p-6 text-center shadow-lg ring-1 ring-rose-100">


        <h1 className="text-2xl font-bold text-slate-900">ㅤ</h1>
           <h1 className="text-2xl font-bold text-slate-900">ㅤ</h1>
         <h1 className="text-2xl font-bold text-slate-900">ㅤ</h1>
        <h1 className="text-2xl font-bold text-slate-900">ㅤ</h1>
        <h1 className="text-2xl font-bold text-slate-900">ㅤ</h1>
        <h1 className="text-2xl font-bold text-slate-900">ㅤ</h1>

        <h1 className="text-2xl font-bold text-slate-900">Giỏ hàng</h1>
        <p className="mt-3 text-slate-600">Chưa có sản phẩm nào.</p>
        <Link to="/products" className="mt-4 inline-flex rounded-xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-600">
          Xem sản phẩm
        </Link>
      </div>
    )
  }

  return (
    
    <div className="space-y-4 rounded-3xl bg-white/80 p-6 shadow-lg ring-1 ring-rose-100">
        <h1 className="text-2xl font-bold text-slate-900">ㅤ</h1>
        <h1 className="text-2xl font-bold text-slate-900">ㅤ</h1>
      <div className="flex items-center justify-between">
        
        <h1 className="text-2xl font-bold text-slate-900">Giỏ hàng</h1>
        <div className="flex items-center gap-3">
          {success && (
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
              Thanh toán thành công!
            </span>
          )}
          <button onClick={clear} className="text-sm font-semibold text-rose-500 hover:text-rose-600">
            Xóa hết
          </button>
        </div>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col gap-3 rounded-2xl border border-slate-100 p-3 shadow-sm sm:flex-row sm:items-center">
            <img src={item.image} alt={item.name} className="h-20 w-20 rounded-xl object-cover" />
            <div className="flex-1 space-y-1">
              <p className="text-sm uppercase tracking-[0.08em] text-slate-500">{item.brand}</p>
              <p className="text-lg font-semibold text-slate-900">{item.name}</p>
              <p className="text-rose-600 font-bold">{item.price.toLocaleString('vi-VN')}₫</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="h-8 w-8 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200"
                onClick={() => updateQty(item.id, -1)}
              >
                -
              </button>
              <span className="w-10 text-center text-sm font-semibold text-slate-900">{item.quantity}</span>
              <button
                className="h-8 w-8 rounded-full bg-rose-500 text-white hover:bg-rose-600"
                onClick={() => updateQty(item.id, 1)}
              >
                +
              </button>
            </div>
            <div className="text-right text-sm font-semibold text-slate-800">
              {(item.price * item.quantity).toLocaleString('vi-VN')}₫
            </div>
            <button className="text-xs font-semibold text-rose-500 hover:text-rose-600" onClick={() => remove(item.id)}>
              Xóa
            </button>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
        <p className="text-sm text-slate-600">
          Tổng ({summary.count} món)
        </p>
        <p className="text-xl font-bold text-rose-600">{summary.subtotal.toLocaleString('vi-VN')}₫</p>
      </div>
      <button
        className="w-full rounded-xl bg-rose-500 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-rose-200 transition hover:bg-rose-600"
        onClick={handleCheckout}
      >
        {success ? 'Đã thanh toán' : 'Thanh toán (demo)'}
      </button>
    </div>
  )
}

export default Cart

