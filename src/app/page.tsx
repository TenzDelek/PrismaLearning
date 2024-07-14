import prisma from "@/lib/db";
import Link from "next/link";


export default async function Home() {
  const story= await prisma.story.findMany();

  return (
    <div className=" w-full h-screen flex flex-col items-center justify-center">
      <p className=" font-bold text-4xl">MOTIVATION</p>
    
      {story.map((post)=>(
        <p key={post.id}>
          <Link href={`posts/${post.id}`}>
            {post.title}
            
          </Link>
        </p>
      ))}
      
    </div>
  );
}
