import express from "express";
import { S3 } from "aws-sdk";

const s3 = new S3({
    accessKeyId: process.env.accessKeyId || "",
    secretAccessKey: process.env.secretAccessKey || "",
})

const app = express();

app.get("/*", async (req, res) => {
    const host = req.hostname;
    console.log(host)
    const id = host.split(".")[0];
    console.log(id)
    const filePath = req.path;

    const contents = await s3.getObject({
        Bucket: "vercel-bucketp",
        Key: `dist/${id}${filePath}`
    }).promise();
    const type = filePath.endsWith("html") ? "text/html" : filePath.endsWith("css") ? "text/css" : "application/javascript"
    res.set("Content-Type", type);

    res.send(contents.Body);
})

app.listen(3001);
