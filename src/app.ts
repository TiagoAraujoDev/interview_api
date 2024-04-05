import express from "express";
import { router } from "./routes";
import path from "node:path";

const app = express();

app.use(express.json());

app.use("/", express.static(path.join(__dirname, "..", "public")));

app.use(router);

export { app };