import { callserver } from "@/actions/actions";
import Postlist from "@/components/postlist";
import prisma from "@/lib/db";
import Link from "next/link";
import { Suspense } from "react";


export default async function Home() {

const count= await prisma.story.count();
  return (
    <div className=" w-full h-screen flex flex-col items-center justify-center">
      <p className=" font-bold text-4xl">MOTIVATION {count}</p>
     <Suspense fallback="loading ...">
      <Postlist/>
      </Suspense>
      <form action={callserver} className="flex text-black  mt-3 space-y-4 flex-col">
        <input name="title" type="text" placeholder="enter title" className=" p-2 rounded-lg text-sm" />
        <textarea  placeholder="enter content" name="content" rows={5} className=" text-sm p-2 rounded-lg"
  
        />
        <button type="submit" className=" border p-2 rounded-lg hover:bg-white transition hover:text-black">Create post</button>
      </form>
     
    </div>
  );
}
