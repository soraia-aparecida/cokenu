import { Request, Response } from "express"
import { FollowerDatebase } from "../data/FollowerDatebase"
import { UserDatabase } from "../data/UserDatabase"
import { Follwer } from "../entities/Follwer"
import { Authentication } from "../services/Authentication"

export const followUser = async (req: Request, res: Response) => {
    const token = req.headers.authorization as string
    const id: string = req.body.userToFollowId
    try {

        if (!token) {
            res.status(401).send("Para realizar essa operação é necessário ter token de autorização")
        }

        if (!id) {
            res.status(401).send("Para segui um usuário é necesário informar o: userToFollowId")
        }

        const authentication = new Authentication()
        const verifyToken = authentication.getTokenData(token)

        const userDataBase = new UserDatabase()
        const user = await userDataBase.getUserById(verifyToken.id, res)
        const userId = user.getId()

        const followedUser = await userDataBase.getUserById(id, res)
        const followedID = followedUser.getId()

        const newFollwer = new Follwer(userId, followedID)

        const followerDatebase = new FollowerDatebase()
        await followerDatebase.addFollower(newFollwer, res)

        res.status(201).send({ message: "Seguido com sucesso" })

    } catch (error: any) {
        res.status(200).send(error.message)
    }
}