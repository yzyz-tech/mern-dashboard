import express from "express"; // express框架
import { getUser } from "../controllers/general.js";

// 创建Express 路由实例
const router = express.Router();

router.get("/user/:id", getUser);
/*
 * 定义Get请求路由，调用getUser处理逻辑
 * :id 为动态路径参数
 */

export default router;
