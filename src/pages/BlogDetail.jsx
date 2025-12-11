import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import AccentBadge from '../components/AccentBadge'
import BlogCard from '../components/BlogCard'
import { blogPosts } from '../data/mockData'

function BlogDetail() {
  const { id } = useParams()
  const post = blogPosts.find((p) => p.id === id)

  const related = useMemo(() => {
    if (!post) return []
    return blogPosts
      .filter((p) => p.id !== post.id && (p.category === post.category || p.tags.some((t) => post.tags.includes(t))))
      .slice(0, 4)
  }, [post])

  if (!post) {
    return <div className="py-20 text-center text-lg">Không tìm thấy bài viết.</div>
  }

  const body = Array.isArray(post.body) ? post.body : []
  const tips = Array.isArray(post.tips) ? post.tips : []

  return (
    <div className="space-y-10">
      <article className="space-y-4 rounded-3xl bg-white/80 p-6 shadow-lg ring-1 ring-rose-100">
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <AccentBadge>{post.category}</AccentBadge>
          <span>{new Date(post.date).toLocaleDateString('vi-VN')}</span>
          <span>• {post.readTime} phút đọc</span>
          <span className="font-semibold text-slate-800">Tác giả: {post.author}</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900">{post.title}</h1>
        <img src={post.cover} alt={post.title} className="w-full rounded-2xl object-cover" />
        <p className="text-lg text-slate-700">{post.summary}</p>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
            >
              #{tag}
            </span>
          ))}
        </div>
        <div className="space-y-3 text-slate-700">
          {body.length > 0 ? (
            body.map((para) => <p key={para}>{para}</p>)
          ) : (
            <>
              <p>
                Nội dung chi tiết (mock): lên routine ngắn gọn, tập trung làm sạch - dưỡng ẩm - chống
                nắng, xen kẽ treatment nhẹ, ưu tiên sản phẩm dịu nhẹ và giãn cách ngày dùng.
              </p>
              <p>
                Lifestyle: ngủ đủ, uống nước, vận động nhẹ 20-30 phút mỗi ngày, hạn chế đường và dầu
                chiên, ưu tiên thực phẩm tươi và giàu chất xơ. Dành thời gian thư giãn, tránh stress
                kéo dài.
              </p>
            </>
          )}
          {tips.length > 0 && (
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="mb-2 text-sm font-semibold text-slate-800">Ghi chú nhanh</p>
              <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
                {tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </article>

      {related.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">Bài viết liên quan</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <BlogCard key={item.id} post={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default BlogDetail

