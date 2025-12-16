import { useState, useEffect, useRef } from 'react'

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)
  const rootRef = useRef(null)

  useEffect(() => {
    // đảm bảo section hiển thị nếu không có global reveal observer
    if (rootRef.current && !rootRef.current.classList.contains('is-visible')) {
      rootRef.current.classList.add('is-visible')
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/i.test(form.email.trim())
    if (!form.name.trim() || !isEmail || !form.message.trim()) {
      setStatus({ type: 'error', message: 'Vui lòng nhập đủ tên, email hợp lệ và nội dung.' })
      return
    }
    // giả lập gửi — show success then clear form
    setStatus({ type: 'sending', message: 'Đang gửi...' })
    setTimeout(() => {
      setStatus({ type: 'success', message: 'Đã gửi thông tin. Chúng tôi sẽ phản hồi sớm!' })
      setForm({ name: '', email: '', message: '' })
    }, 700)
  }

  return (
    <section ref={rootRef} className="reveal-on-scroll mx-auto max-w-6xl space-y-6 rounded-3xl bg-white/85 p-6 shadow-lg ring-1 ring-rose-100">
      <div>        <h1 className="text-2xl font-bold text-slate-900">ㅤ</h1>
        <h1 className="text-2xl font-bold text-slate-900">ㅤ</h1>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-500">Liên hệ</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Kết nối với Phương Cosmetics</h1>
        <p className="mt-2 text-slate-600">Gửi câu hỏi, hợp tác hoặc góp ý. Chúng tôi phản hồi trong 1-2 ngày làm việc.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_0.95fr]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Họ và tên</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nguyễn Văn A"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-100"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="email@domain.com"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-100"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Nội dung</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Bạn muốn trao đổi điều gì..."
              rows={6}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-100"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="hover-lift inline-flex items-center gap-2 rounded-2xl bg-rose-500 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-rose-200 transition hover:bg-rose-600"
            >
              {status?.type === 'sending' ? 'Đang gửi...' : 'Gửi thông tin'}
            </button>
            <button
              type="button"
              onClick={() => setForm({ name: '', email: '', message: '' })}
              className="rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              Xóa
            </button>
          </div>

          {status && (
            <div
              className={`rounded-xl px-4 py-3 text-sm font-semibold ${
                status.type === 'success' ? 'bg-emerald-50 text-emerald-600' : status.type === 'sending' ? 'bg-sky-50 text-sky-700' : 'bg-amber-50 text-amber-700'
              }`}
            >
              {status.message}
            </div>
          )}
        </form>

        <div className="space-y-6 rounded-3xl bg-rose-50 p-5 text-slate-800 shadow-sm ring-1 ring-rose-100">
          <div>
            <h3 className="text-lg font-semibold text-rose-600">Thông tin</h3>
            <div className="space-y-2 text-sm">
              <p>Hotline: <a href="tel:0901234567" className="font-medium text-rose-600">0901 234 567</a></p>
              <p>Email: <a href="mailto:hello@phuongcosmetics.vn" className="font-medium text-rose-600">quynhphuong11a8@gmail.com</a></p>
              <p>Giờ làm việc: 9:00 - 18:00 (T2 - T6)</p>
              <p>Địa chỉ: 123 Đường Skincare, Quận Beauty, TP.HCM</p>
            </div>
          </div>

          <div>
            <p className="font-semibold text-slate-900">Hỗ trợ nhanh</p>
            <ul className="list-disc space-y-1 pl-4 text-slate-700">
              <li>Tư vấn routine dịu nhẹ</li>
              <li>Gợi ý sản phẩm phù hợp</li>
              <li>Hỗ trợ đơn hàng và bảo hành</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-slate-900">Kết nối</p>
            <div className="mt-2 flex gap-3">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white shadow hover:bg-rose-50"
              >
                <svg className="h-5 w-5 text-rose-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path fill="currentColor" d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.07 1.8.5 2.22.85.5.4.86 1 1.02 2.06.07 1.22.07 1.66.07 4.85s0 3.62-.07 4.85c-.16 1.06-.52 1.66-1.02 2.06-.42.35-1.05.78-2.22.85-1.25.07-1.65.07-4.85.07s-3.6 0-4.85-.07c-1.17-.07-1.8-.5-2.22-.85-.5-.4-.86-1-1.02-2.06C2.2 15.62 2.2 15.18 2.2 12s0-3.62.07-4.85c.16-1.06.52-1.66 1.02-2.06.42-.35 1.05-.78 2.22-.85C8.4 2.2 8.8 2.2 12 2.2zm0 3.3A6.5 6.5 0 1 0 18.5 12 6.51 6.51 0 0 0 12 5.5zm0 10.75A4.25 4.25 0 1 1 16.25 12 4.25 4.25 0 0 1 12 16.25z" />
                </svg>
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white shadow hover:bg-rose-50"
              >
                <svg className="h-5 w-5 text-rose-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path fill="currentColor" d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07C2 17.1 5.66 21.2 10.4 22v-7.03H8.08v-2.9h2.32V9.41c0-2.3 1.37-3.56 3.46-3.56.99 0 2.03.18 2.03.18v2.23h-1.14c-1.12 0-1.47.7-1.47 1.42v1.7h2.5l-.4 2.9h-2.1V22C18.34 21.2 22 17.1 22 12.07z" />
                </svg>
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white shadow hover:bg-rose-50"
              >
                <svg className="h-5 w-5 text-rose-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path fill="currentColor" d="M16 3v10.5a4.5 4.5 0 1 1-2-3.8V6.2L16 3z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden">
            <iframe
              title="Vị trí Phương Cosmetics"
              src="https://maps.google.com/maps?q=Ho%20Chi%20Minh%20City&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="h-40 w-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact

