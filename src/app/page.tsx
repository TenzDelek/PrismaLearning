import prisma from "@/lib/db";
import Link from "next/link";


export default async function Home() {
  const story= await prisma.story.findMany({
    where:{
     title:{
      endsWith:"dream"
     }
    },
    orderBy:{
      created:"asc"
    },
    select:{
      id:true,
      title:true,
      slug:true
    },
    take:2,
    // skip:2
  });
const count= await prisma.story.count();
  return (
    <div className=" w-full h-screen flex flex-col items-center justify-center">
      <p className=" font-bold text-4xl">MOTIVATION {count}</p>
    
      {story.map((post)=>(
        <p key={post.id}>
          <Link href={`Story/${post.slug}`}>
            {post.title}
            
          </Link>
        </p>
      ))}
      
    </div>
  );
}
