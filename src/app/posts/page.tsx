import prisma from "@/lib/prisma"
import Link from "next/link"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default async function PostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: { updatedAt: "desc" },
  })
  const postCount = await prisma.post.count()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h2 className="scroll-m-20 border-b pb-2 px-6 text-3xl font-semibold tracking-tight first:mt-0">
        Posts
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        There {postCount === 1 ? "is" : "are"} {postCount} post{postCount === 1 ? "" : "s"}
      </p>
      <div className="w-full max-w-8xl mt-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 place-items-center gap-6">
        {posts.map((post) => (
          <Card key={post.id} className="w-full">
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{post.content}</p>
            </CardContent>
            <CardFooter>
            <div className="w-full flex justify-end mx-2">
              <Link href={`/posts/${post.slug}`} className="text-muted-foreground">View</Link>
            </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
