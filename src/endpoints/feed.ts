import { Request, Response } from 'express'
import { RecipeDatabase } from '../data/RecipeDatabase'
import { UserDatabase } from '../data/UserDatabase'
import { Authentication } from '../services/Authentication'
import { CorrectDate } from '../services/CorrectDate'
import { Feed } from '../types/types'

export const feed = async (req: Request, res: Response) => {
    const token = req.headers.authorization as string

    try {

        if (!token) {
            res.status(401).send("Para realizar essa operação é necessário ter token de autorização")
        }

        const authentication = new Authentication()
        const verifyToken = authentication.getTokenData(token)

        const userDataBase = new UserDatabase()
        const user = await userDataBase.getUserById(verifyToken.id, res)
        const userId = user.getId()

        const recipeDatabase = new RecipeDatabase
        const recipe = await recipeDatabase.getFeed(userId, res)

        const correctDate = new CorrectDate()

        const result: any = recipe.map((item: Feed) => {
            return ({
                id: item.id,
                title: item.title,
                description: item.description,
                createdAt: correctDate.currentDateFormatted(item.creation_date),
                userId: item.user_id,
                userName: item.name
            })
        })

        res.status(200).send({ result })

    } catch (error: any) {
        res.status(400).send(error.message)
    }
}