import { Request, Response } from "express";
import { RecipeDatabase } from "../data/RecipeDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { Authentication } from "../services/Authentication";

export const deleteRecipe = async (req: Request, res: Response): Promise<void> => {
    const token = req.headers.authorization as string
    const id = req.params.id

    try {

        if (!token) {
            res.status(401).send("Para realizar essa operação é necessário ter token de autorização")
        }

        const authentication = new Authentication()
        const verifyToken = authentication.getTokenData(token)

        const userDataBase = new UserDatabase()
        const user = await userDataBase.getUserById(verifyToken.id)
        const userId = user.getId()
        const userRole = user.getRole()

        const recipeDatabase = new RecipeDatabase()

        if (userRole === "ADMIN") {
            await recipeDatabase.deleteRecipe(id)
        }

        if (userRole === "NORMAL") {

            const recipeCreator = await recipeDatabase.getRecipeById(id, res)

            if (userId !== recipeCreator.getUserId()) {
                res.status(409).send({ message: "Você só pode excluir as receitas que você mesmo criou." })
                throw new Error()
            }

            await recipeDatabase.deleteRecipe(id)
        }

        res.status(200).send({ message: "Receita deletada com sucesso!" })

    } catch (error: any) {
        res.status(400).send(error.message)
    }

}