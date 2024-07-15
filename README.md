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

@map - 
@map(create_at) = change the name like alas
so in code we have CreateAt but in db we have create_at
 created   DateTime @default(now()) @map(create_at)

@@map -
at the last -for db name change alas
@@map(storyss)
}

@@index
at the last
@@index read performance like for slug and id
}

- both used in default func
now()
autoincrement()

# slug
>slug      String   @unique ->must use @unique if not then error
usefull for pasing in url like title and all
use like my-post
if we are using slug the [slug] not [id] for dynamic routing
slug:params.slug

# filtering
```js
 const story= await prisma.story.findMany({
    where:{
      published:true
    }
  });
```
```js
 const story= await prisma.story.findMany({
    where:{
     title:{
        contains:"a"
     }
    }
  });
```
```js
 const story= await prisma.story.findMany({
    where:{
      title:{
        endsWith:"post"
      }
    }
  });
```
```js
 const story= await prisma.story.findMany({
    where:{
      title:{
        endsWith:"post"
      }
    },
    orderBy:{
        created:"asc"
    }
  });
```

# complete:

```js
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
    take:1 # pagination
  });
the select is usefull for not selecting password like we can write password:false
```
# problem related with pagination
- sometime the pagination only take 2 suppose 
now we when we do .length the out put thens to
be 2 but in db we have 10 so for that we do
>const count=await prisma.story.count()

# relationship
one to many:
- user and post
a user can have many post but one post can be only of one user
# one-many
```JS
model User {
  id       String  @id @default(cuid())
  posts    Story[]
}

model Story {
  id        String   @id @default(cuid())
  author    User     @relation(fields: [authorid], references: [id])
  authorid  String
}
# HERE when we create the model user and at posts we give Story[] it auto generate the field in the 
Story schema author and authorid.  the @relation simply says that the authorid is referencing id of User
(foriegn key)
```
# many-many
```js

model User {
  id       String  @id @default(cuid())
  posts    Story[]
}

model Story {
  id        String   @id @default(cuid())
  author    User[]
}
# for many to many (when a post might have many users) we simply use User[]. (Impplicit many-many)
```
# one - one
```js

model User {
  id       String  @id @default(cuid())
  post    Story?
}

model Story {
  id        String   @id @default(cuid())
  author    User     @relation(fields: [authorid], references: [id])
  authorid  String @unique
}
```

# connect
```js
//usefull when we are inserting data and user is needed
 await prisma.story.create({
        data:{
            title:titles,
            slug:titles.replace(/\s+/g,"-").toLowerCase(),
            content:contents,
            author:{
                connect:{
                    email:"tenzindelek@gmail.com"
                }
            }
        }
    })
```