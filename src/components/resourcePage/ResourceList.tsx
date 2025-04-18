import Link from 'next/link'
import { ArrowDownCircle, Calendar, FileText } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default async function ResourceList({ post }: { post: any }) {
  return (
    <div className="flex flex-col border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 h-full bg-white">
      <div className="flex flex-col flex-grow p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-100 p-2 rounded-lg">
            <FileText className="text-[#13589e] w-5 h-5" />
          </div>
          <Badge
            variant="outline"
            className="bg-blue-50 text-[#13589e] border-blue-200 font-medium px-3 py-1"
          >
            {post.category || 'Resource'}
          </Badge>
        </div>

        <div className="flex-grow">
          <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">
            {post.title}
          </h3>

          <div className="mb-5">
            <p className="text-gray-600 leading-relaxed">{post.description}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar size={16} className="mr-2" />
            {new Date(post.publishedDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </div>

          <Link
            href={post.document.url}
            target="_blank"
            className="flex items-center gap-2 bg-[#13589e] hover:bg-[#7aa4c3] text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm group"
          >
            Download
            <ArrowDownCircle
              size={16}
              className="group-hover:translate-y-0.5 transition-transform"
            />
          </Link>
        </div>
      </div>
    </div>
  )
}
