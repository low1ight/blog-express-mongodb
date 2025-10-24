import './dotenv-settings'
import express from 'express'
import cors from 'cors'
import {blogRouter} from "./modules/blog_platform/blogs/controllers/blogs.controller";
import {postsRouter} from "./modules/blog_platform/posts/controllers/posts.controller";
import {testingRouter} from "./modules/testing/controller/testing.controller";
import {userRouter} from "./modules/users_module/users/controllers/users.controller";
import {authRouter} from "./modules/users_module/auth/controllers/auth.controller";
import {commentsRouter} from "./modules/blog_platform/comments/controllers/comments.controller";
import cookieParser from "cookie-parser";
import {deviceRouter} from "./modules/users_module/devices/controllers/devices.controller";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger/swagger.json'
import {swaggerOptions} from "./swagger/options";


export const app = express()


app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(express.static('public'));


app.use('/blogs',
    // #swagger.tags = ['Blogs']
    blogRouter)

app.use('/posts',
    // #swagger.tags = ['Posts']
    postsRouter)

app.use('/users',
    // #swagger.tags = ['Users']
    userRouter)

app.use('/comments',
    // #swagger.tags = ['Comments']
    commentsRouter)

app.use('/testing',
    // #swagger.tags = ['Testing']
    testingRouter)

app.use('/auth',
    // #swagger.tags = ['Auth']
    authRouter)

app.use('/security/devices',
    // #swagger.tags = ['Devices']
    deviceRouter)


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));