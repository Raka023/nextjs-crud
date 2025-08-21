import prisma from "@/lib/prisma"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function PostPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const post = await prisma.post.findUnique({ where: { slug } })

  return (
    <main>
      <div className="min-h-screen p-24">
        {post === null && (
          <h2 className="scroll-m-20 pb-4 text-3xl font-semibold tracking-tight first:mt-0">
            Post not found
          </h2>
        )}
        <h2 className="scroll-m-20 border-b pb-4 text-3xl font-semibold tracking-tight first:mt-0">
          <Link href="/posts"><ArrowLeft className="mr-2 inline hover:text-muted-foreground transition"/></Link>
          {post?.title}
        </h2>
        <section className="mt-4 space-y-4">
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            {post?.content}
          </p>
        </section>
      </div>
    </main>
  )
}
