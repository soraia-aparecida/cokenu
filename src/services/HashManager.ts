import * as byscript from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

export class HashManager {
    public genareHash = async (text: string): Promise<string> => {
        const rounds = Number(process.env.BCRYPT_COST)
        const salt = await byscript.genSalt(rounds)
        const result = await byscript.hash(text, salt)
        return result
    }

    public compareHash = async (text: string, hash: string): Promise<boolean> => {
        const result = await byscript.compare(text, hash)
        return result
    }
}