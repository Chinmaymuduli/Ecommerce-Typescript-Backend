import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const useCloudinaryUpload = async (tempFilePath: any) => {
  let data;
  try {
    data = await cloudinary.uploader.upload(tempFilePath);
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
  } finally {
    // Cleanup temp file
    fs.unlink(tempFilePath, () => {});
    fs.rm(tempFilePath, () => {});
  }
  return data;
};

export default useCloudinaryUpload;
