const { Box } = require("@mui/material");
const { styled } = require("@mui/system");

// 样式组件
const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default FlexBetween;
