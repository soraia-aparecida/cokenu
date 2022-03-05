import { Request, Response } from "express";
import { UserDatabase } from "../data/UserDatabase";
import { Authentication } from "../services/Authentication";

export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
    const token = req.headers.authorization as string

    try {
        if (!token) {
            res.status(401).send({ message: "Para realizar essa operação é necessário ter token de autorização" })
        }

        const authentication = new Authentication()
        const verifyToken = authentication.getTokenData(token)

        const userDataBase = new UserDatabase()
        const user = await userDataBase.getUserById(verifyToken.id)

        const result = { id: user.getId(), name: user.getName(), email: user.getEmail(), role: user.getRole() }

        res.status(200).send(result)

    } catch (error: any) {
        res.status(400).send(error.message)
    }
}