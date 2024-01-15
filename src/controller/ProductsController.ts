import ProductModel from "../schemas/ProductSchema";
import useCloudinaryUpload from "../hooks/UseCloudinaryUpload";
const createProducts = async (req: any, res: any) => {
  try {
    let { title, price, description, stock, brand, category, size } = req.body;
    let resImg: any;
    if (req?.files?.imageUrl?.tempFilePath) {
      resImg = await useCloudinaryUpload(req?.files?.imageUrl?.tempFilePath);
    }
    const newProduct = new ProductModel({
      title,
      description,
      price,
      stock,
      brand,
      category,
      size,
      imageUrl: resImg?.url,
    });
    const createProducts = await newProduct.save();
    if (!createProducts) {
      res.status(400).json({
        data: undefined,
        message: "Failed to create product",
        status: 400,
      });
    }
    res.status(200).json({
      data: createProducts,
      message: "Product Create Successfully",
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
};
const getProducts = async (req: any, res: any) => {
  try {
    const getAllProducts = await ProductModel.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryData",
        },
      },
      {
        $unwind: "$categoryData",
      },
      {
        $project: {
          category: 0,
        },
      },
    ]).exec();
    if (!getAllProducts) {
      res.status(400).json({
        data: undefined,
        message: "Failed to get product",
        status: 400,
      });
    }
    res.status(200).json({
      data: getAllProducts,
      message: "Product Get Successfully",
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
};
const updateProducts = async (req: any, res: any) => {
  try {
    let { title, price, description, stock, brand, category, size } = req.body;
    let resImg: any;
    if (req?.files?.imageUrl?.tempFilePath) {
      resImg = await useCloudinaryUpload(req?.files?.imageUrl?.tempFilePath);
    }
    const createProducts = await ProductModel.findByIdAndUpdate(
      req?.params?.id,
      {
        title,
        description,
        price,
        stock,
        brand,
        category,
        size,
        imageUrl: resImg?.url,
      }
    );
    if (!createProducts) {
      res.status(400).json({
        data: undefined,
        message: "Failed to update product",
        status: 400,
      });
    }
    res.status(200).json({
      data: createProducts,
      message: "Product Updated Successfully",
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
};

export { createProducts, getProducts, updateProducts };
