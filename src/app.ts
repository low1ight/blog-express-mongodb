import express from 'express'
import cors from 'cors'
import {blogRouter} from "./modules/blog_platform/blogs/controllers/blogs.controller";
import {postsRouter} from "./modules/blog_platform/posts/controllers/posts.controller";
import {SETTINGS} from "./settings";
import {runDB} from "./db/db.mongodb";
import {testingRouter} from "./modules/testing/controller/testing.controller";



export const app = express()

app.use(express.json())
app.use(cors())





runDB(SETTINGS.DB.URL);


app.get('/', (req:any, res:any) => {
    res.send(`Hello world`)
})



app.use('/blogs', blogRouter)
app.use('/posts', postsRouter)
app.use('/testing', testingRouter)