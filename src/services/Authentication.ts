import * as jwt from 'jsonwebtoken'
import { AuthenticationData } from '../types/types'
import dotenv from 'dotenv'

dotenv.config()

const expiresIn = process.env.EXPIRES_IN

export class Authentication {
    public gererate = (input: AuthenticationData): string => {
        const token = jwt.sign(
            { id: input.id, role: input.role },
            process.env.JWT_KEY as string,
            { expiresIn }
        )
        return token
    }

    public getTokenData(token: string): AuthenticationData {
        const data = jwt.verify(token, process.env.JWT_KEY as string) as AuthenticationData
        return data
    }
}