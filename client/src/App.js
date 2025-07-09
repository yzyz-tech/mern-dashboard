import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";  // 创建的主题设置
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Products from "scenes/products";

function App() {
  const mode = useSelector((state) => state.global.mode); // 从Redux获取全局mode状态
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);  // 根据mode动态生成MUI的主题，useMemo避免重复生成
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />  {/* 自动拥有更多 CSS 样式 */}

          {/* 路由配置 */}
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
