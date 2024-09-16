import express from "express";
import cors from "cors";
import simpleGit from "simple-git";
import { generate } from "./utils";
import path from "path";
import { getAllFiles } from "./file";
import { uploadFile } from "./aws";
import { createClient } from "redis";
const publisher = createClient();
publisher.connect();
const subscriber = createClient();
subscriber.connect();

// uploadFile("yogesh/package.json", "/Users/yogeshpoonia/Documents/100xdev/vercel/upload/dist/output/gbzcx/package.json")
const app = express();
app.use(cors());
app.use(express.json());
app.post("/deploy", async (req, res) => {
    const repoUrl = req.body.repoUrl;
    const id = generate(); // asd12
    await simpleGit().clone(repoUrl, path.join(__dirname, `output/${id}`));

    const files = getAllFiles(path.join(__dirname, `output/${id}`));
    console.log(files)
    console.log(__dirname)
    files.forEach(async file => {
        await uploadFile(file.slice(__dirname.length + 1), file);
    })
    publisher.lPush("build-queue", id);
    res.json({
        id:id
    })
    publisher.hSet("status", id, "uploaded");

    // await new Promise((resolve) => setTimeout(resolve, 5000))
    

});
app.get("/status", async (req, res) => {
    const id = req.query.id;
    const response = await subscriber.hGet("status", id as string);
    res.json({
        status: response
    })
})

app.listen(3000) 
