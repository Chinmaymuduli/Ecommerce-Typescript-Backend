import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true,
  },
  imageUrl: String,
});
const CategoryModel = mongoose.model("Category", CategorySchema);
export default CategoryModel;
