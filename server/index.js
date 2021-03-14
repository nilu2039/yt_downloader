require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { json } = require("express");
const app = express();
const fs = require("fs");
const pool = require("./db");
const ytdl = require("ytdl-core");
const { format } = require("path");
var bar;
var url;

app.use(cors());
app.use(express.json());

app.post("/get", async (req, res) => {
  try {
    url = req.body.url;
    const x = await ytdl.getInfo(url);
    x.formats.map(async (val) => {
      const newData = await pool.query(
        "INSERT INTO format(extension, format, audio, code) VALUES($1, $2, $3, $4)",
        [val.container, val.height, val.audioQuality, val.itag]
      );
    });
    const data = await pool.query("SELECT * FROM format");
    res.json(data.rows);
    pool.query("DELETE FROM format");
  } catch (error) {
    console.log(error);
  }
});

app.get("/get/download", async (req, res) => {
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

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`connected at port ${port}`);
});
