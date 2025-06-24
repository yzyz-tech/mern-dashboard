import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween"; // 自定义布局组件，左右两端对齐
import { useDispatch } from "react-redux";
import { setMode } from "state";
import profileImage from "assets/profile.jpg";
import {
  AppBar,
  IconButton,
  InputBase,
  Toolbar,
  useTheme,
} from "@mui/material";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch(); // 状态更新（此处用于切换主题）
  const theme = useTheme(); // 获取MUI当前主题对象（访问样式）
  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
        }}
      >
        {/* 左侧区域 */}
        <FlexBetween>
          {/* 菜单按钮 */}
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>

          {/* 搜索框 */}
          <FlexBetween
            backgroundColor={theme.palette.background.alt} // 使用自定义主题中的替代背景色（alt）
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search.." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* 右侧 */}
        <FlexBetween gap="1.5rem">
          {/* 切换主题按钮 */}
          <IconButton onClick={() => dispatch(setMode())}>
            {/* 派发setMode()返回的action */}
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} /> // 月亮图标
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>

          {/* 设置按钮 */}
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
