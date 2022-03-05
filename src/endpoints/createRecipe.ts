import { Request, Response } from "express"
import { RecipeDatabase } from "../data/RecipeDatabase"
import { UserDatabase } from "../data/UserDatabase"
import { Recipe } from "../entities/Recipe"
import { Authentication } from "../services/Authentication"
import { CorrectDate } from '../services/CorrectDate'
import { GenerateId } from "../services/GenerateId"

export const createRecipe = async (req: Request, res: Response): Promise<void> => {

    const { title, description }: { title: string, description: string } = req.body
    const token = req.headers.authorization as string
    const id = GenerateId()

    try {

        if (!token) {
            res.status(401).send("Para realizar essa operação é necessário ter token de autorização")
        }

        if (!title || !description) {
            res.status(422).send("Para realizar o cadastro de uma nova receita é necessário informar os seguintes campos: title, description.")
        }

        const authentication = new Authentication()
        const verifyToken = authentication.getTokenData(token)

        const userDataBase = new UserDatabase()
        const user = await userDataBase.getUserById(verifyToken.id)
        const userId = user.getId()

        const date = new Date().toLocaleDateString("pt-BR")
        const correctDate = new CorrectDate()
        const creation_date = correctDate.sendDateToDB(date)

        const newRecipe = new Recipe(id, userId, title, description, creation_date)

        const recipeDatabase = new RecipeDatabase()
        recipeDatabase.registerRecipe(newRecipe)

        res.status(201).send({ message: "Receita cadastrada com sucesso!" })

    } catch (error: any) {
        res.status(400).send(error.message)
    }
}