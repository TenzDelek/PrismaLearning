import prisma from '@/lib/db'
import React from 'react'

const Story = async ({params}) => {
const singlepost=await prisma.story.findUnique({
    where:{
        slug:params.slug
    }
})
  return (
    <div className=' w-full h-screen flex flex-col items-center justify-center'>
        {params.id}
        <p>{singlepost?.title}</p>
        {singlepost?.content}
    </div>
  )
}

export default Story