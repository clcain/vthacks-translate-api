
const express = require("express");
const bodyParser = require("body-parser");
const aws = require("aws-sdk");

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hello, world!");
});

app.post("/translate", (req, res) => {
    let translator = new aws.Translate({ region: "us-east-1" });
    translator.translateText({
        "Text": req.body.Text,
        "SourceLanguageCode": req.body.SourceLanguageCode,
        "TargetLanguageCode": req.body.TargetLanguageCode
    }, (error, data) => {
        if (error) {
            res.status(500).send({ error: error });
        }
        else {
            res.status(200).send({ result: data.TranslatedText });
        }
    });
});

app.listen(80, () => {
    console.log("Application is running.");
});
