
import { deleteserver } from '@/actions/actions';
import prisma from '@/lib/db'
import Link from 'next/link';
import React from 'react'

const Postlist =async () => {
    const Story= await prisma.story.findMany({
        // where:{
        //  title:{
        //   endsWith:"dream"
        //  }
        // },
        orderBy:{
          created:"asc"
        },
        // select:{
        //   id:true,
        //   title:true,
        //   slug:true
        // },
        // take:2,
        // // skip:2
      });
  return (
    <div> {Story.map((post)=>(
      <div className=' flex justify-between  w-96'>
        <p key={post.id}>
          <Link href={`Story/${post.slug}`}>
            {post.title}
          </Link>
        </p>
        <form action={deleteserver}>
        <input type="hidden" name="slug" value={post.slug} />
        <button type='submit' className=' line-through text-red-500' >Delete</button>
        </form>
        </div>
      ))}</div>
  )
}

export default Postlist