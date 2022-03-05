import { Request, Response } from "express"
import { FollowerDatebase } from "../data/FollowerDatebase"
import { UserDatabase } from "../data/UserDatabase"
import { Follwer } from "../entities/Follwer"
import { Authentication } from "../services/Authentication"

export const unfollowUser = async (req: Request, res: Response) => {
    const token = req.headers.authorization as string
    const id: string = req.body.userToUnfollowId

    try {
        if (!token) {
            res.status(401).send("Para realizar essa operação é necessário ter token de autorização")
        }

        if (!id) {
            res.status(401).send("Para deixar de segui um usuário é necesário informar o: userToUnfollowId")
        }

        const authentication = new Authentication()
        const verifyToken = authentication.getTokenData(token)

        const userDataBase = new UserDatabase()
        const user = await userDataBase.getUserById(verifyToken.id, res)
        const userId = user.getId()

        const unfollowUser = await userDataBase.getUserById(id, res)
        const unfollowUserID = unfollowUser.getId()

        const newUnfollow = new Follwer(userId, unfollowUserID)

        const followerDatebase = new FollowerDatebase()
        await followerDatebase.removeFollower(newUnfollow, res)

        res.status(200).send({ message: "Deixou de seguir com sucesso" })

    } catch (error: any) {
        res.status(400).send(error.message)
    }
}