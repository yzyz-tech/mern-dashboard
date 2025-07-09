import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useGetProductsQuery } from "state/api"; // Redux Toolkit Query 提供的自动化API Hook
import Header from "components/Header";

// 单个产品展示组件
const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false); // 是否展开详情
  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      {/* 产品卡片的具体信息 */}
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          $
          {
            Number(price).toFixed(2) // 最多显示两位小数
          }
        </Typography>
        <Rating value={rating} readOnly />
        <Typography>{description}</Typography>
      </CardContent>

      {/* 展开更多按钮 */}
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)} // 点击切换折叠状态
        >
          See More
        </Button>
      </CardActions>

      {/* 折叠内容 */}
      <Collapse // 进入/退出动画组件
        in={isExpanded}
        timeout="auto"
        unmountOnExit // 折叠时卸载组件
        sx={{ color: theme.palette.neutral[300] }}
      >
        <CardContent>
          <Typography>id:{_id}</Typography>
          <Typography>Supply Left:{supply}</Typography>
          <Typography>
            Yearly Sales This Year:{stat.yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Unit Sold This Year:{stat.yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};
// 产品列表页面组件
const Products = () => {
  const { data, isLoading } = useGetProductsQuery(); // 发起产品数据请求，获取状态
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  // console.log("data", data); // 开发调试，check 数据是否符合预期
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subtitle="See your list of products." />
      {data || !isLoading ? (
        // 拿到数据 或 加载完成，才渲染组件
        <Box
          mt="20px"
          display="grid" // 二维布局用网格
          gridTemplateColumns="repeat(4, minmax(0, 1fr))" // 4列，列宽理论上允许压缩到0，最大为等分的宽度
          justifyContent="space-between"  // 左右间距尽可能拉满
          rowGap="20px" // 行距
          columnGap="1.33%" // 列间距根据容器按比例调整
          sx={{
            "& > div": {
              // 针对Box内部的所有直接子元素（每个单个产品）
              gridColumn: isNonMobile
                ? undefined // 非移动端保持默认网格列数
                : "span 4", // 移动端时为单列布局（横向合并4个列单元格）
            },
          }}
        >
          {/* 遍历数组，渲染每一个Product组件 */}
          {data.map(
            ({
              _id,
              name,
              description,
              price,
              rating,
              category,
              supply,
              stat,
            }) => (
              <Product
                key={_id}
                _id={_id}
                name={name}
                description={description}
                price={price}
                rating={rating}
                category={category}
                supply={supply}
                stat={stat}
              />
            )
          )}
        </Box>
      ) : (
        // 如果数据还没回来，显示loading提示
        <>loading...</>
      )}
    </Box>
  );
};

export default Products;
