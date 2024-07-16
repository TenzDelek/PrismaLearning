import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const initialpost:Prisma.StoryCreateInput[]=[
    {
        title:"post1",
        slug:"post-1",
        content:"this is post 1",
        author:{
            connectOrCreate:{
                where:{
                    email:"tenzdelek@gmail.com"
                },
                create:{
                    email:"tenzdelek@gmail.com",
                    password:"23232323fd"
                }
            }
        }
    }
]
async function main() {

    console.log(`start seeding.....`)
    for (const post of initialpost){
        const newpost=await prisma.story.create(
            {
                data:post,
            }
        );
        console.log(`created post with id: ${newpost.id}`)
    }
    console.log(` seeding done.....`)
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })