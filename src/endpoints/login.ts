import { Request, Response } from "express"
import { UserDatabase } from "../data/UserDatabase"
import { Authentication } from "../services/Authentication"
import { HashManager } from "../services/HashManager"

export const login = async (req: Request, res: Response): Promise<void> => {

    try {
        const { email, password }: { email: string, password: string } = req.body

        if (!email || !password) {
            res.status(422).send("Para realizar login é necessário informar os seguintes campos:  email, password.")
        }

        const userDataBase = new UserDatabase()
        const user = await userDataBase.getUserByEmail(email, res)

        const hashManager = new HashManager()
        const passwordIsCorrect: boolean = user && await hashManager.compareHash(password, user.getPassword())

        if (!password || !passwordIsCorrect) {
            res.status(422).send({ message: "Password inválido." })
        }

        const authentication = new Authentication()
        const token = authentication.gererate({ id: user.getId(), role: user.getRole() })

        res.status(200).send({ message: "Usuário logado com sucesso!", token })

    } catch (error: any) {
        res.status(400).send(error.message)
    }
}