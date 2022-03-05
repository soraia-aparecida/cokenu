import { Request, Response } from "express";
import { UserDatabase } from "../data/UserDatabase";
import { Authentication } from "../services/Authentication";

export const deleteAccount = async (req: Request, res: Response): Promise<void> => {
    const token = req.headers.authorization as string
    const id: string = req.body.id

    try {

        if (!token) {
            res.status(401).send("Para realizar essa operação é necessário ter token de autorização")
        }

        if (!id) {
            res.status(404).send({ message: "Para poder excluir uma conta, é necessário informar o id da mesma" })
        }

        const authentication = new Authentication()
        const verifyToken = authentication.getTokenData(token)

        const userDataBase = new UserDatabase()
        const user = await userDataBase.getUserById(verifyToken.id)

        await userDataBase.getUserById(id, res)

        const userRole = user.getRole()

        if (userRole !== "ADMIN") {
            res.status(401).send({ message: "Somente usuários com perfil de ADMIN podem realizar essa requisição" })
            throw new Error()
        }

        await userDataBase.deleteUser(id)

        res.status(200).send({ message: "Usuário deletado com sucesso!" })

    } catch (error: any) {
        res.status(400).send(error.message)
    }

}