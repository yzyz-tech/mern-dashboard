import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";

export const getProducts = async (req, res) => {
  // 创建异步控制器
  try {
    const products = await Product.find(); // 获取所有product数据
    const productsWithStats = await Promise.all(
      // 并发查询每个产品的统计信息
      products.map(async (product) => {
        const stat = await ProductStat.find({
          productId: product._id,
        });
        // 返回一个合并对象
        return {
          ...product._doc, // 产品所有字段
          stat,
        };
      })
    );
    res.status(200).json(productsWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message }); // 比较通用的错误响应
  }
};
