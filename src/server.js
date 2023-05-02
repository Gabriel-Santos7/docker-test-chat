var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var mongoose = require("mongoose");
var cors = require("cors");
var S3 = require("aws-sdk/clients/s3");

require("dotenv").config();

app.use(cors());

app.use(express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  bodyParser.json({
    limit: "50mb",
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    parameterLimit: 1000000,
    extended: true,
  })
);

app.set("view engine", "ejs");
app.set("views", "./public");

app.get("/", function (req, res) {
  res.render("index");
});

const datasource = process.env.DATABASE_URL;
const s3Config = {
  bucketName: String(process.env.AWS_S3_BUCKET),
  defaultRegion: String(process.env.DEFAULT_REGION),
  defaultFilesACL: String(process.env.DEFAULT_FILES_ACL),
  uploadPath: String(process.env.UPLOAD_PATH),
};
const s3 = new S3({
  region: s3Config.defaultRegion,
});

var Message = mongoose.model("Message", {
  name: String,
  message: String,
  image: String,
});

app.get("/messages", (req, res) => {
  Message.find({}, (err, messages) => {
    res.send(messages);
  });
});

app.post("/messages", async (req, res) => {
  try {
    if ((req.body.message || req.body.name) == "")
      return console.log("O input não pode ser nulo");

    if (req.body.image) {
      const base64Data = Buffer.from(
        req.body.image.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );

      const timestamp = Date.now();
      const fileKey = `${req.body.name}-${timestamp}`;
      const imageSource = `https://ezops.s3.amazonaws.com/${fileKey}.png`;
      req.body.image = imageSource;

      (async () => {
        await s3
          .putObject({
            Body: base64Data,
            Bucket: "ezops",
            Key: `${fileKey}.png`,
            ContentEncoding: "base64",
            ContentType: "application/image",
            ACL: s3Config.defaultFilesACL,
          })
          .promise();
      })();
    }

    const message = new Message(req.body);

    var savedMessage = await message.save();
    console.log("saved");

    var censored = await Message.findOne({ message: "badword" });
    if (censored) await Message.remove({ _id: censored.id });
    else io.emit("message", req.body);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
    return console.log("error", error);
  } finally {
    console.log("Message Posted");
  }
});

io.on("connection", () => {
  console.log("a user is connected");
});

mongoose.connect(datasource, (err) => {
  console.log("mongodb connected", err);
});

var server = http.listen(3000, () => {
  console.log("server is running on port", server.address().port);
});
