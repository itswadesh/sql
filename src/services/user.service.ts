// src/services/user.service.ts

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import  Bluebird from 'bluebird'
import { User, UserModel, UserAddModel, UserViewModel } from '../models/user'

export class UserService {
    private readonly _saltRounds = 12
    private readonly _jwtSecret = '0.rfyj3n9nzh'

    static get userAttributes() {
        return ['id', 'email']
    }
    private static _user:any
    static get user() {
        return UserService._user
    }

    register({ email, password }: UserAddModel) {
        return bcrypt.hash(password, this._saltRounds)
            .then(hash => {
                return User.create({ email, password: hash })
                    .then((u:any) => this.getUserById(u!.id))
            })
    }

    login({ email }: UserAddModel) {
        return User.findOne({ where: { email } }).then((u:any) => {
            const { id, email } = u!
            return { token: jwt.sign({ id, email }, this._jwtSecret) }
        })
    }

    verifyToken(token: string) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this._jwtSecret, (err, decoded:any) => {
                if (err) {
                    resolve(false)
                    return
                }

                UserService._user = User.findById(decoded['id'])
                resolve(true)
                return
            })
        }) as Promise<boolean>
    }

    getUserById(id: number) {
        return User.findById(id, {
            attributes: UserService.userAttributes
        }) as Bluebird<UserViewModel>
    }
}