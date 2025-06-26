import mongoose from "mongoose";

// 定义user的数据结构
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // 必填
      min: 2,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    // 以下为可选字段
    city: String,
    state: String,
    country: String,
    occupation: String,
    phoneNumber: String,
    transactions: Array,
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"], // 角色必须三选一
      default: "admin",
    },
  },
  // schema配置项的第二个参数
  { timestamps: true } // 自动添加创建、更新时间
);

const User = mongoose.model("User", UserSchema);

export default User;
