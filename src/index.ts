import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import * as cloudinary from "cloudinary";
import fileUpload from "express-fileupload";
import fs from "fs";
import path from "path";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cloudinaryImage = cloudinary.v2;
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

cloudinaryImage.config({
  cloud_name: "dk3stwbo1",
  api_key: "195442494843476",
  api_secret: "5McgGiTzpbOON9NPbyXWPIQ5zG4",
});

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log("db connected");
});

const routesFolder = path.join(__dirname, "routes");
const ReadDynamicRoutesPath = (app: any) => {
  let fileObjs = fs.readdirSync(routesFolder);
  fileObjs.forEach(async (file) => {
    const routePath = path.join(routesFolder, file);
    const route: any = await import(routePath);
    app.use("/" + file?.split(".")?.[0], route.default);
  });
};

ReadDynamicRoutesPath(app);

app.listen(8000, () => {
  console.log(`app running at 8000`);
});
