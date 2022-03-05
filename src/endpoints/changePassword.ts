import { Request, Response } from "express";
import { UserDatabase } from "../data/UserDatabase";
import { HashManager } from "../services/HashManager";
import { MailTransporter } from "../services/MailTransporter";
import dotenv from 'dotenv'

dotenv.config()

export const changePasswor = async (req: Request, res: Response): Promise<void> => {

    const email = req.body.email
    const newPassword = Date.now().toString()

    try {
        if (!email) {
            res.status(422).send("Para redefinir a sua senha, é necessário informar um email")
        }

        const userDataBase = new UserDatabase()
        const user = await userDataBase.getUserByEmail(email, res)

        await MailTransporter.sendMail({
            from: `<${process.env.NODEMAILER_USER}>`,
            to: email,
            subject: "Redefinição de senha",
            text: `Olá, ${user.getName()}! Segue sua nova senha: ${newPassword} `
        })

        const encryptedPassword = await new HashManager().genareHash(newPassword)

        await userDataBase.changePassword(email, encryptedPassword)

        res.status(200).send({ message: "A nova senha, foi enviada por e-email." })

    } catch (error: any) {
        res.status(400).send(error.message)
    }
}