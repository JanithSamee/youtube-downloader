require("dotenv").config();
const express = require("express");
const youtubeDl = require("youtube-dl-exec");
const cors = require("cors");
const serverless = require("serverless-http");

const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(cors({ origin: "*" }));

const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/download", (req, res) => {
    const { videoUrl, videoId, format } = req.query;

    const options = {
        dumpSingleJson: true,
        noCheckCertificates: true,
        noWarnings: true,
        preferFreeFormats: true,
        format: "mp4",
        addHeader: ["referer:youtube.com", "user-agent:googlebot"],
    };

    if (!videoUrl && !videoId) {
        return res.status(400).send("Youtube URL or Video ID not found");
    }

    const youtubeLink = videoUrl
        ? videoUrl
        : `https://www.youtube.com/watch?v=${videoId}`;

    youtubeDl(youtubeLink, options)
        .then((output) => {
            const { thumbnail, title, description, channel, formats, ...rest } =
                output;

            res.setHeader("Content-Type", "application/json");
            const filteredFormat =
                format && format !== "none"
                    ? formats.filter((element) => element.ext === format)
                    : [];

            return res.json({
                thumbnail,
                title,
                description,
                channel,
                formats: filteredFormat,
            });
        })
        .catch((err) => {
            res.status(500).send("Something went wrong!");
        });
});

app.get("*", (req, res) => {
    res.sendFile(path.join(path.join(__dirname, "public"), "index.html"));
});
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
// module.exports.handler = serverless(app);
