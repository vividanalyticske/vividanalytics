// app/blog/page.tsx or pages/blog/index.tsx
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { RichText } from '@payloadcms/richtext-lexical/react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function CaseList({ post }: { post: any }) {
  return (
    <div className="flex flex-col border-2 border-[#13589e] rounded-lg overflow-hidden hover:shadow-lg transition-shadow h-full">
      <div className="relative h-48 w-full">
        {post.coverImage?.url && (
          <Image src={post.coverImage.url} alt={post.title} fill className="object-cover" />
        )}
      </div>

      <div className="flex flex-col flex-grow p-4 sm:p-6">
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-3 gap-2">
            <Badge
              variant="outline"
              className="bg-[#f0f8e0] text-[#13589e] border-[#b4d23d]"
            ></Badge>
            <div className="flex items-center text-xs text-gray-500">
              <Calendar size={14} className="mr-1" />
              {new Date(post.publishedDate).toLocaleDateString()}
            </div>
          </div>

          <h3 className="text-lg font-bold mb-3 hover:text-[#13589e] transition-colors">
            <Link href={`/insights/case-studies/${post.slug}`}>{post.title}</Link>
          </h3>

          <div className="mb-4">
            <RichText
              className="text-sm text-gray-700 leading-relaxed line-clamp-3"
              data={post.excerpt}
            />
          </div>
        </div>

        <div className="mt-auto pt-3 border-t border-gray-100">
          <Link
            href={`/blog/${post.slug}`}
            className="text-[#13589e] font-medium text-sm flex items-center hover:text-[#0c4780]"
          >
            Read more <ArrowRight size={14} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}
