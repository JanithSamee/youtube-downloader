require("dotenv").config();
const express = require("express");
const youtubeDl = require("youtube-dl-exec");
const cors = require("cors");

const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/api/download", (req, res) => {
    const { videoUrl, videoId } = req.query;

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
            // const _formats = output.formats.filter(
            //     (format) => format.ext === "m"
            // );
            return res.send(output);
        })
        .catch((err) => {
            res.status(500).send("Something went wrong!");
        });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
