import { Request, Response } from "express";
import { UserDatabase } from "../data/UserDatabase";
import { Authentication } from "../services/Authentication";

export const getAnotherUserProfile = async (req: Request, res: Response): Promise<void> => {

    const token = req.headers.authorization as string
    const id = req.params.id

    try {
        if (!token) {
            res.status(401).send("Para realizar essa operação é necessário ter token de autorização")
        }

        const authentication = new Authentication()
        authentication.getTokenData(token)

        const userDataBase = new UserDatabase()
        const user = await userDataBase.getUserById(id)

        const result = { id: user.getId(), name: user.getName(), email: user.getEmail() }

        res.status(200).send(result)

    } catch (error: any) {
        res.status(400).send(error.message)
    }
}