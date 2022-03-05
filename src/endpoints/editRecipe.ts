import { Request, Response } from "express";
import { RecipeDatabase } from "../data/RecipeDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { Authentication } from "../services/Authentication";

export const editRecipe = async (req: Request, res: Response) => {
    const token = req.headers.authorization as string
    const id: string = req.params.id
    const { title, description }: { title: string, description: string } = req.body

    try {
        if (!token) {
            res.status(401).send("Para realizar essa operação é necessário ter token de autorização")
        }

        if (!title || !description) {
            res.status(404).send("Para alterar uma receita, é necessário informar os seguintes parâmetros: title, description")
        }

        const authentication = new Authentication()
        const verifyToken = authentication.getTokenData(token)

        const userDataBase = new UserDatabase()
        const user = await userDataBase.getUserById(verifyToken.id)
        const userId = user.getId()

        const recipeDatabase = new RecipeDatabase()
        const recipeCreator = await recipeDatabase.getRecipeById(id, res)

        if (userId !== recipeCreator.getUserId()) {
            res.status(409).send("Você só pode editar as receitas que você mesmo criou. ")
            throw new Error()
        }

        await recipeDatabase.chageRecipe(id, title, description)

        res.status(200).send({ message: "Receita alterada com sucesso!" })

    } catch (error: any) {
        res.status(400).send(error.message)
    }
}