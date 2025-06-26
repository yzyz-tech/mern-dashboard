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
import { setMode } from "state"; // 暗/亮主题切换
import profileImage from "assets/profile.jpg";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch(); // 状态更新（此处用于切换主题）
  const theme = useTheme(); // 获取MUI当前主题对象（访问样式）

  // 处理用户头像区域下拉菜单的逻辑
  const [anchorEl, setAnchorEl] = useState(null); // 控制菜单锚点元素，为null时菜单隐藏
  const isOpen = Boolean(anchorEl); 
  const handleClick = (event) => setAnchorEl(event.currentTarget); // 设置锚点为当前点击的元素，从而控制菜单显示
  const handleClose = () => setAnchorEl(null);

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
            {/* 输入框 */}
            <InputBase placeholder="Search.." />

            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* 右侧 */}
        <FlexBetween gap="1.5rem">
          {/* 切换主题按钮 */}
          {/* 派发setMode()返回的action */}
          <IconButton onClick={() => dispatch(setMode())}>
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

          {/* 用户头像 */}
          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                textTransform: "none", // 保持文本原始大小写
                gap: "1rem",
              }}
            >
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />

              {/* 用户信息 */}
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.role}
                </Typography>
              </Box>

              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }} // ▽，下拉按钮 
              />
            </Button>

            {/* 下拉菜单的 */}
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onclick={handleClose}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
