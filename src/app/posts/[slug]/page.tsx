import prisma from "@/lib/prisma"
import Link from "next/link"
import { deletePost } from "@/actions/action"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"

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
        <div className="border-b flex items-center justify-between">
          <div className="flex items-center pb-4">
            <Link href="/posts"><ArrowLeft className="mr-2 inline hover:text-muted-foreground transition"/></Link>
            <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
              {post?.title}
            </h2>
          </div>
          <div className="flex gap-2">
            <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary">Edit Post</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[360px]">
                  <form action={undefined} className="flex flex-col gap-4">
                    <DialogHeader>
                      <DialogTitle>Edit the Post</DialogTitle>
                      <DialogDescription>
                        Make sure to fill in all the fields.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                      <div className="grid gap-3">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" name="title" defaultValue={post?.title} required />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="content">Content</Label>
                        <Textarea id="content" name="content" defaultValue={post?.content} rows={3} className="resize-none" required />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button type="submit">Update Post</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
            </Dialog>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <form action={async () => {
                    "use server"
                    if (post?.id) {
                      await deletePost(post.id)
                    }
                  }}>
                    <AlertDialogAction type="submit">Delete</AlertDialogAction>
                  </form>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <section className="mt-4 space-y-4">
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            {post?.content}
          </p>
        </section>
      </div>
    </main>
  )
}
