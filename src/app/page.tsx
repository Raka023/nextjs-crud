import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
          Welcome to my Blog App!
        </h1>
        <Link href="/posts" className="mt-4 scroll-m-20 text-xl tracking-tight hover:text-muted-foreground transition">See the Posts!</Link>
      </div>
    </main>
  );
}
