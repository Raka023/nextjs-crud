"use server"

import prisma from "@/lib/prisma"
import { error } from "console"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import z from "zod"

const formSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(5),
})

export async function createPost(formData: FormData) {
  const ValidatedForm = formSchema.safeParse({ 
    title: formData.get("title")?.toString().trim() as string, 
    content: formData.get("content")?.toString().trim() as string 
  })
  const validated = ValidatedForm.data

  if (!validated) {
    return console.error("Invalid form data: " + ValidatedForm.error)
  }

  await prisma.post.create({ 
    data: { 
      title: validated.title,
      slug: validated.title.replace(/\s+/g, "-").toLowerCase(),
      content: validated.content,
    }
  }).catch((ex) => console.error(ex))

  revalidatePath("/posts")
}

export async function updatePost(formData: FormData) {
  // const ValidatedForm = formSchema.safeParse({ 
  //   id: formData.get("id") as string,
  //   title: formData.get("title")?.toString().trim() as string, 
  //   content: formData.get("content")?.toString().trim() as string 
  // })

  // const validated = ValidatedForm.data

  // if (!validated) {
  //   return console.error("Invalid form data: " + ValidatedForm.error)
  // }

  // await prisma.post.update({
  //   where: { id: validated.id },
  //   data: { 
  //     title: validated.title,
  //     slug: validated.title.replace(/\s+/g, "-").toLowerCase(),
  //     content: validated.content,
  //   }
  // }).catch((ex) => console.error(ex))

  // revalidatePath(`/posts/${validated.id}`)
}

export async function deletePost(id: string) {
  await prisma.post.delete({ where: { id: id } }).catch((ex) => console.error(ex))

  redirect("/posts")
}