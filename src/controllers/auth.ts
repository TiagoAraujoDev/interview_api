import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { User } from "../@types/user";

const users: User[] = [];

const admin: User = {
    name: "admin",
    password: "admin",
    cpf: 32165498765,
    job: "dev"
};

users.push(admin);

const tokens = [];

const authController = (req: Request, res: Response) => {
    const { name, password } = req.body;
    const _user = users.find(user => {
        console.log('name:', name)
        console.log('userName:', user.name)
        return user.name === name
    })
    if (!_user) {
        console.log("Nome não encontrado!")
    }
    const user = users.find(user => {
        console.log('password:', password)
        console.log('userPassword:', user.password)

        return user.name == _user?.name && user.password == password
    })

    if (!user) {
        console.log("Senha errada")
    } else {
        const token = sign({}, "secret", {
            subject: user.name,
            expiresIn: 60,
        });
        tokens.push(token);
        return res.json(token);
        
    }
    console.log('teste');

    return res.end();
}

export { authController };