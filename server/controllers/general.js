import User from "../models/User.js";

// 处理获取用户信息的请求
// 会被路由 /user/:id 调用
export const getUser = async (req, res) => {
  try {
    const { id } = req.params; // 从请求参数里拿到id
    const user = await User.findById(id); // 通过Mongoose查找数据库中对应id的用户
    res.status(200).json(user); // 能找到，返回200状态码和json格式的用户数据
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
