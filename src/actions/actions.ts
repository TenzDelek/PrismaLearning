"use server"

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export const callserver= async(formdata:FormData)=>{

    const titles=formdata.get("title") as string
    const contents=formdata.get("content") as string

    await prisma.story.create({
        data:{
            title:titles,
            slug:titles.replace(/\s+/g,"-").toLowerCase(),
            content:contents
        }
    })
    revalidatePath("/")
}

export const deleteserver=async(rawdata:FormData)=>{
    const slug= rawdata.get("slug") as string
 await prisma.story.delete({
    where:{slug}
 })
 revalidatePath("/")
}

export const updateserver=async(formdata:FormData,id:string)=>{
    await prisma.story.update({
        where:{id},
        data:{
            title:formdata.get("title") as string,
            slug:(formdata.get("title") as string).replace(/\s+/g,"-").toLowerCase(),
            content:formdata.get("content") as string
        }
    })
}