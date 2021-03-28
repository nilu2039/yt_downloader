require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");
const ytdl = require("ytdl-core");
const urlLib = require("url");
const https = require("https");
const { response } = require("express");
const { rejects } = require("assert");

var bar;
var url;
app.use(cors());
app.use(express.json());

app.post("/api/get", async (req, res) => {
  try {
    await pool.query("BEGIN");
    await pool.query("DELETE FROM format");
    url = req.body.url;
    const x = await ytdl.getInfo(url);
    const videoID = ytdl.getURLVideoID(url);
    const info = await ytdl.getInfo(videoID);
    x.formats.map(async (val) => {
      try {
        await pool.query(
          "INSERT INTO format(extension, format, audio, code, thumbnail, title) VALUES($1, $2, $3, $4, $5, $6)",
          [
            val.container,
            val.height,
            val.audioQuality,
            val.itag,
            info.videoDetails.thumbnails[4]?.url,
            info.videoDetails.title,
          ]
        );
      } catch (error) {
        console.log(error);
      }
    });

    const data = await pool.query("SELECT * FROM format");

    //await pool.query("DELETE FROM format");
    await pool.query("COMMIT");
    res.json(data.rows);
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/get/download", async (req, res) => {
  try {
    const code = req.query.code;
    const extension = req.query.extension;
    const videoID = ytdl.getURLVideoID(url);
    const info = await ytdl.getInfo(videoID);
    const format = ytdl.chooseFormat(info.formats, { quality: code });
    res.header(
      "Content-Disposition",
      `attachment; filename=${info.videoDetails.title}.${extension}`
    );
    const x = await ytdl(url, { format })
      .on("response", (res) => {
        var ProgressBar = require("progress");
        bar = new ProgressBar("downloading [:bar] :rate/bps :percent :etas", {
          complete: String.fromCharCode(0x2588),
          total: parseInt(res.headers["content-length"], 10),
        });
      })
      .on("data", (data) => {
        bar.tick(data.length);
      })
      .on("finish", () => {
        console.log("Download finished...");
      })
      .pipe(res);
  } catch (error) {
    console.log(error);
  }
});

const port = process.env.PORT || 5000;
app.listen(5000, () => {
  console.log(`connected at port ${port}`);
});
