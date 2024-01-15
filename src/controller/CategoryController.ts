import useCloudinaryUpload from "../hooks/UseCloudinaryUpload";
import CategoryModel from "../schemas/CategorySchema";

const createCategory = async (req: any, res: any) => {
  try {
    let { title } = req?.body;
    if (!title)
      return res.status(400).json({
        message: "Title is required",
        status: 400,
      });
    let resImg;
    if (req.files?.imageUrl) {
      resImg = await useCloudinaryUpload(req.files?.imageUrl?.tempFilePath);
    }
    const categoryCreate = new CategoryModel({
      title,
      imageUrl: resImg?.url,
    });
    const categorySaved = await categoryCreate.save();
    if (!categorySaved) {
      res.status(400).json({
        data: undefined,
        message: "Category create failed",
        status: 400,
      });
    }
    res.status(200).json({
      data: categorySaved,
      message: "Category create successfully",
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
};

const getCategory = async (req: any, res: any) => {
  try {
    const allCategory = await CategoryModel.find();
    if (!allCategory) {
      res.status(400).json({
        data: undefined,
        message: "Category get failed",
        status: 400,
      });
    }
    res.status(200).json({
      data: allCategory,
      message: "Category get successfully",
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateCategory = async (req: any, res: any) => {
  try {
    let { title } = req?.body;

    let resImg;
    if (req.files?.imageUrl) {
      resImg = await useCloudinaryUpload(req.files?.imageUrl?.tempFilePath);
    }
    const allCategory = await CategoryModel.findByIdAndUpdate(req?.params?.id, {
      title,
      imageUrl: resImg?.url,
    });
    if (!allCategory) {
      res.status(400).json({
        data: undefined,
        message: "Category update failed",
        status: 400,
      });
    }
    res.status(200).json({
      data: allCategory,
      message: "Category update successfully",
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
};

export { createCategory, getCategory, updateCategory };
