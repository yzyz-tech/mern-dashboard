import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "theme";  // 创建的主题设置


function App() {
  const mode = useSelector((state) => state.global.mode);    
  const theme = useMemo(()=> createTheme(ThemeSetting(mode)), [mode]);
  return (
    <div className="app">
      <ThemeProvider theme={theme}> 
        <CssBaseline />  {/* 自动拥有更多 CSS 样式 */}
      </ThemeProvider>
      
    </div>
  );
}

export default App;
