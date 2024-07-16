
import { deleteserver } from '@/actions/actions';
import prisma from '@/lib/db'
import Link from 'next/link';
import { unstable_cache as cache } from 'next/cache';

const Postlist =async () => {
    // const Story= await prisma.story.findMany({
    //     // where:{
    //     //  title:{
    //     //   endsWith:"dream"
    //     //  }
    //     // },
    //     orderBy:{
    //       created:"asc"
    //     },
    //     // select:{
    //     //   id:true,
    //     //   title:true,
    //     //   slug:true
    //     // },
    //     // take:2,
    //     // // skip:2
    //   });

    //here we are taking data from the user 
    const getcachedpost=cache(()=>{
      return prisma.user.findUnique({
        where:{
          email:"tenzdelek@gmail.com"
        },
        include:{
          posts:true
        }
      })
      
    })

    const user=await getcachedpost();
    //here the include is important if not the post wont show
  return (
    <div> {user?.posts.map((post)=>(
      <div key={post.id} className=' flex justify-between  w-96'>
        <p >
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