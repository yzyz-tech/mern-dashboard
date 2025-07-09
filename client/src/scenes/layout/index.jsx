import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom"; // 嵌套路由
import { useSelector } from "react-redux";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import { useGetUserQuery } from "state/api"; // 引入RTK Query的API调用hook

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)"); // 使用媒体查询判断是否为非移动端设备
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userId = useSelector((state) => state.global.userId); // 从 Redux toolkit 获取
  const { data } = useGetUserQuery(userId);
  // console.log('data', data) // 调试用？

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      {/* 侧边栏 */}
      <Sidebar
        user={data || {}} // undefined时发送个空对象
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* 导航栏 */}
      <Box flexGrow={1}>
        <Navbar
          user={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
