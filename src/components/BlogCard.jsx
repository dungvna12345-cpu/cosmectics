import { Link } from 'react-router-dom'
import AccentBadge from './AccentBadge'

function BlogCard({ post }) {
  return (
    <Link
      to={`/blog/${post.id}`}
      className="flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
    >
      <img src={post.cover} alt={post.title} className="h-48 w-full object-cover" loading="lazy" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <AccentBadge>{post.category}</AccentBadge>
          <span>{new Date(post.date).toLocaleDateString('vi-VN')}</span>
          <span>• {post.readTime} phút đọc</span>
        </div>
        <h3 className="text-lg font-semibold text-slate-900">{post.title}</h3>
        <p className="text-sm text-slate-600 line-clamp-2">{post.summary}</p>
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600"
            >
              #{tag}
            </span>
          ))}
        </div>
        <div className="mt-auto text-right text-xs font-semibold text-rose-500 opacity-0 transition hover:opacity-100">
          Đọc tiếp →
        </div>
      </div>
    </Link>
  )
}

export default BlogCard

