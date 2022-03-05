import { Response } from "express"
import { Follwer } from "../entities/Follwer"
import { BaseDatebase } from "./BaseDatebase"

export class FollowerDatebase extends BaseDatebase {

    public addFollower = async (follower: Follwer, res?: Response): Promise<void> => {

        try {

            const result = await BaseDatebase.connection('Cokenu_Fllowers')
                .where('Cokenu_Fllowers.followed_id', follower.getFollowed())
                .andWhere('Cokenu_Fllowers.follower_id', follower.getFollower())

            if (result.length === 1) {
                res?.status(409).send({ message: "Você já segue essa pessoa" })
                throw new Error()
            }

            await BaseDatebase.connection('Cokenu_Fllowers')
                .insert({
                    follower_id: follower.getFollower(),
                    followed_id: follower.getFollowed()
                })

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);

        }
    }

    public removeFollower = async (follower: Follwer, res?: Response): Promise<void> => {
        try {

            const result = await BaseDatebase.connection('Cokenu_Fllowers')
                .where('Cokenu_Fllowers.followed_id', follower.getFollowed())
                .andWhere('Cokenu_Fllowers.follower_id', follower.getFollower())

            if (result.length === 0) {
                res?.status(409).send({ message: "Você não segue essa pessoa" })
                throw new Error()
            }

            await BaseDatebase.connection('Cokenu_Fllowers')
                .delete()
                .where('Cokenu_Fllowers.followed_id', follower.getFollowed())
                .andWhere('Cokenu_Fllowers.follower_id', follower.getFollower())

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}