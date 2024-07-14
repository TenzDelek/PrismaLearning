# prisma note

setup

> npm i prisma --save-dev

then we have to initialize

> npx prisma init --datasource-provider sqlite

this will create a prisma folder where db is sql


then we model the table
'''js
model Post{
id Int @id @default(autoincrement())
name String

}
the autoincrement can be change to cuid() for safety and it is now string not int
'''

# db push (sort of a sync method)
whenever a schema is changed in beginning
we do
> npx prisma db push

then all the client and all are created

# studio
you can generate the studio by
>npx prisma studio

# fetching (displaying)(findMany)
now we have a data in the db suppose 
the .tsx should be async 
as it is default server component we
can directly call the db.
# instantating
(link for db.ts)[https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices]
src/lib/db.ts
when you try to do prisma.post.findMany()
there will be a error where prisma is not define
so make db.ts 

- calling
const story= await prisma.story.findMany();
-dont forget the await
then you can map
# format in vscode
so to format and have prisma format when save
click
crtl shift p
user setting(json)
write
"editor.formatOnSave": true,
"[prisma]": {
"editor.defaultFormatter": "Prisma.prisma"
},
now when you save the format will happen

# types
@default
when we put default the element becomes optional
also we can add ?
publish Boolean? @default(false)

@updatedAt - 
updateat DateTime @updateat
whenever it is updated it changes

- both used in default func
now()
autoincrement()

