import { Request, Response } from "express"
import { UserDatabase } from "../data/UserDatabase"
import { User } from "../entities/User"
import { Authentication } from "../services/Authentication"
import { GenerateId } from "../services/GenerateId"
import { HashManager } from "../services/HashManager"
import { USER_ROLES } from "../types/types"

export const signup = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password, role }: { name: string, email: string, password: string, role: USER_ROLES } = req.body
    const id = GenerateId()

    try {
        if (!name || !email || !password || !role) {
            res.status(422).send({ message: "Para realizar o cadastro de um novo usuário é necessário informar os seguintes campos: name, email, password, role." })
        }

        if (password.length < 6) {
            res.status(422).send({ message: "A senha deve conter no mímino 6 caracteres" })
        }

        if (!email.includes('@') || !email.includes('.com')) {
            res.status(422).send({ message: "Formato de email inválido" })
        }

        const userDataBase = new UserDatabase()
        const user = await userDataBase.getUserByEmail(email)

        if (user) {
            res.status(409).send({ message: "E-mail já cadastrado no nosso banco de dados" })
        }

        const encryptedPassword = await new HashManager().genareHash(password)
        const newUser = new User(id, name, email, encryptedPassword, role)

        await userDataBase.createUser(newUser)

        const authentication = new Authentication()
        const token = authentication.gererate({ id, role })

        res.status(201).send({ message: "Novo usuário cadastrado com sucesso!", token })

    } catch (error: any) {
        res.status(400).send(error.message || error.sqlMessage)
    }

}