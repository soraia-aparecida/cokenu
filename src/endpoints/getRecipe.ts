import { Request, Response } from "express"
import { RecipeDatabase } from "../data/RecipeDatabase"
import { Authentication } from "../services/Authentication"
import { CorrectDate } from "../services/CorrectDate"

export const getRecipe = async (req: Request, res: Response): Promise<void> => {
    const token = req.headers.authorization as string
    const id: string = req.params.id

    try {
        if (!token) {
            res.status(401).send("Para realizar essa operação é necessário ter token de autorização")
        }

        const authentication = new Authentication()
        authentication.getTokenData(token)

        const recipeDatabase = new RecipeDatabase()
        const recipe = await recipeDatabase.getRecipeById(id, res)

        const correctDate = new CorrectDate()

        const result = {
            id: recipe.getId(),
            title: recipe.getTitle(),
            description: recipe.getDescription(),
            cratedAt: correctDate.currentDateFormatted(recipe.getDate())
        }

        res.status(200).send({ recipe: result })

    } catch (error: any) {
        res.status(400).send(error.message)
    }
}