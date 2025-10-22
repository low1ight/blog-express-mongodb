import './dotenv-settings'
import express from 'express'
import cors from 'cors'
import {blogRouter} from "./modules/blog_platform/blogs/controllers/blogs.controller";
import {postsRouter} from "./modules/blog_platform/posts/controllers/posts.controller";
import {SETTINGS} from "./settings";
import {runDB} from "./db/mongodb";
import {testingRouter} from "./modules/testing/controller/testing.controller";
import {userRouter} from "./modules/users_module/users/controllers/users.controller";
import {authRouter} from "./modules/users_module/auth/controllers/auth.controller";
import {commentsRouter} from "./modules/blog_platform/comments/controllers/comments.controller";
import cookieParser from "cookie-parser";
import {deviceRouter} from "./modules/users_module/devices/controllers/devices.controller";



export const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

//console.log(SETTINGS)


runDB(SETTINGS.DB.URL).then();


app.get('/', (req:any, res:any) => {
    res.send(`Hello world`)
})



app.use('/blogs', blogRouter)
app.use('/posts', postsRouter)
app.use('/users', userRouter)
app.use('/comments', commentsRouter)
app.use('/testing', testingRouter)
app.use('/auth', authRouter)
app.use('/security/devices', deviceRouter)
