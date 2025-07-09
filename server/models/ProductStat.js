import mongoose from "mongoose";

const ProductStatSchema = new mongoose.Schema({
  productId: String,
  yearlySalesToal: Number,
  yearlyTotalSoldUnits: Number,
  year: Number,
  monthlyData: [
    {
      month: String,
      totalSales: Number,
      toalUnits: Number,
    },
  ],
  dailyData: {
    date: String,
    totalSales: Number,
    toalUnits: Number,
  },
});

const ProductStat = mongoose.model("ProductStat", ProductStatSchema);

export default ProductStat;
