import express from "express";
import bodyParser from "body-parser"; // 解析请求体
import mongoose from "mongoose";
import cors from "cors"; // 解决跨域问题
import dotenv from "dotenv"; // 加载环境变量（.env文件）
import helmet from "helmet"; // 增强HTTP头的安全性
import morgan from "morgan"; // 记录HTTP请求日志

// 路由模块
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

// 导入数据
import User from "./models/User.js";
import { dataUser } from "./data/index.js";

/* 配置 */
dotenv.config(); // 读取.env文件的变量
const app = express(); // 创建express应用

// 配置中间件
app.use(express.json()); // 解析json数据
app.use(helmet()); // 添加常规的安全设置
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // 允许跨域资源访问
app.use(morgan("common")); // 输出常规的日志格式
app.use(bodyParser.json()); // 处理json数据
app.use(bodyParser.urlencoded({ extended: false })); // 处理表单
app.use(cors()); // 启用跨域支持

/* 路由 */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/* 数据库设置 */
const PORT = process.env.PORT || 9000; // 服务端口

// 连接数据库（从.env中获取地址）
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  // 数据库连接成功后，启动服务器
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    // 仅添加一次数据（开发测试用）
    // User.insertMany(dataUser);
  })
  // 数据库连接失败
  .catch((error) => console.log(`${error} did not connect`));
