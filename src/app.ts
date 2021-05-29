import express from 'express'
import cors from 'cors'
import session, { Store } from 'express-session'
import oAuthRoutes from './oauth'
import { userRouter } from './routers/user.router'
import { tokenGuard } from './middlewares/token-guard'
import { User } from './models/user'
// import apiRoutes from './routes'
import passport from 'passport'

import { notFound, serverError, active } from './middleware'
import { SESSION_OPTIONS } from './config'
import { books } from './routes'
export const createApp = (store: Store) => {
    const app = express()
    
    const sessionHandler = session({ ...SESSION_OPTIONS, store })
    
    // Setup Passport
    app.use(sessionHandler)
    app.use(passport.initialize())
    app.use(passport.session())
    
    app.use(express.json())
    app.use(cors())
    // app.use('/', userRouter)
    app.use(books)
    
    // Unprotected Get
    app.get('/some-resource', (req, res, next) => {
        User.findOne({ where: { 'email':'xxx' } }).then((u:any) => {
            console.log('some-resource........',u);
        })
        //  const u = User.findById('1')
         return res.json('Hello World')
    })
    app.use(tokenGuard())
    
    // Protected Get
    app.get('/some-protected-resource', (req, res) => {
        res.json('Protected Hello World')
    })
    return app
    }