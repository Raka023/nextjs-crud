import prisma from "@/lib/prisma"
import Link from "next/link"
import { createPost } from "@/actions/action"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default async function PostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: { updatedAt: "desc" },
  })
  const postCount = await prisma.post.count()

  return (
    <main>
      <div className="min-h-screen p-24">
        <div className="flex justify-between gap-x-6 w-full">
          <div>
            <h2 className="scroll-m-20 text-start border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Posts
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              There {postCount === 1 ? "is" : "are"} {postCount} post{postCount === 1 ? "" : "s"}
            </p>
          </div>
          <Dialog>
              <DialogTrigger asChild>
                <Button>Add a Post</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[360px]">
                <form action={createPost} className="flex flex-col gap-4">
                  <DialogHeader>
                    <DialogTitle>Add a new Post</DialogTitle>
                    <DialogDescription>
                      Make sure to fill in all the fields.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4">
                    <div className="grid gap-3">
                      <Label htmlFor="title">Title</Label>
                      <Input id="title" name="title" required />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="content">Content</Label>
                      <Textarea id="content" name="content" rows={3} className="resize-none" required />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Add Post</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
          </Dialog>
        </div>
        <div className="w-full max-w-8xl mt-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 place-items-center gap-6">
          {posts.map(({ id, title, slug, content }) => (
            <Card key={id} className="w-full">
              <CardHeader>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{content}</p>
              </CardContent>
              <CardFooter>
              <div className="w-full flex justify-end mx-2">
                <Link href={`/posts/${slug}`} className="text-sm text-zinc-700 hover:text-muted-foreground transition">View</Link>
              </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
