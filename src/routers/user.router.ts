// src/routers/user.router.ts

import { Router } from 'express'
import { matchedData } from 'express-validator/filter'
import { validationResult } from 'express-validator'
import { userRules } from '../rules/user.rules'
import { UserService } from '../services/user.service'
import { UserAddModel } from '../models/user'

export const userRouter = Router()
const userService = new UserService()

userRouter.post('/me', (req, res) => {
    return res.status(200)
})
userRouter.post('/register', userRules['forRegister'], (req:any, res:any) => {
    const errors = validationResult(req)

    if (!errors.isEmpty())
        return res.status(422).json(errors.array())

    const payload = matchedData(req) as UserAddModel
    const user = userService.register(payload)

    return user.then(u => res.json(u))
})

userRouter.post('/login', userRules['forLogin'], (req:any, res:any) => {
    const errors = validationResult(req)

    if (!errors.isEmpty())
        return res.status(422).json(errors.array())

    const payload = matchedData(req) as UserAddModel
    const token = userService.login(payload)

    return token.then((t:any) => res.json(t))
})