import { Router, Request, Response } from "express";
import { join } from "node:path";
import { authController } from "../controllers/auth";
import { User } from "../@types/user";
import axios from "axios";
import { sign } from "jsonwebtoken";


const router = Router();

const tokens = [];

let users: User[] = [
    {
        id: 1,
        name: "admin",
        cpf: 123123123,
        password: "admin",
        job: "Hacker"
    },
    {
        id: 2,
        name: "John Doe",
        cpf: 456456456,
        password: "john123",
        job: "Script Kiddie"
    },
    {
        id: 3,
        name: "John Smith",
        cpf: 789789789,
        password: "smith456",
        job: "Not even a script kiddie"
    },
    {
        id: 4,
        name: "Kevin",
        cpf: 101010101,
        password: "kevin789",
        job: "Shellcoder"
    }
];

// api endpoints
router.post("/login", (req: Request, res: Response) => {
    const { name, password } = req.body;
    const user = users.find(user => user.name === name)
    if (!user) {
        return res.status(401).json({ message: "Nome não encontrado!"});
    }
    if (!user.password == password) {
        return res.status(401).json({ message: "Senha errada"});
    }
    const token = sign({}, "secret", {
        subject: user.name,
        expiresIn: 60,
    });

    tokens.push(token);

    return res.status(200).json({ token });
});

// views
router.get("/", (_req: Request, res: Response) => {
    return res.sendFile(join(__dirname, "..", "view", "index.html"))
});

router.get("/welcome", (_req: Request, res: Response) => {
    return res.sendFile(join(__dirname, "..", "view", "home.html"))
});


router.get('/users', (req: Request, res: Response) => {
    res.json(users);
});

router.post('/comment', (req: Request, res: Response) => {
    const { prompt } = req.body;
    console.log(req.body)
    res.send( `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>You're not welcome</title>
        <link rel="stylesheet" href="/css/home.css">
    </head>
    
    <body>
        <div class="image-container">
            <img src="/images/hacking.png" alt="">
        </div>
        <div class="terminal-container">
            <div class="terminal">
                <form class="prompt" action="/api/comment" method="post">
                    <label for="prompt">~/root #</label>
                    <input name="prompt" id="prompt" class="block" />
                </form>
                <div class="comment-container">
                    <div class="comment">
                         > ${prompt}           
                    </div>

                </div>
            </div>
        </div>
    
    </body>
    
    </html>` )
});


router.get('/users/:id', (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    const user = users.find(user => user.id === userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
});

router.post('/check-url', async (req: Request, res: Response) => {
    // Get the URL from the request query parameters
    const url = req.query.url;
  
    // Check if URL is provided
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }
  
    try {
      // Send a request to the provided URL
      const response = await axios.get("url");
  
      // Return the response received from the URL
      res.json(response.data);
    } catch (error: unknown) {
      // If there's an error in the request to the URL
      console.error('Error fetching URL:');
      res.status(500).json({ error: 'Error fetching URL' });
    }
  });

export { router };