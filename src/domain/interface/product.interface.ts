// 导出产品接口
export interface ProductInterface {
  // 产品ID
  id: number;
  // 产品标题
  title: string;
  // 产品描述
  description: string;
  // 产品价格
  price: number;
  // 产品折扣百分比
  discountPercentage: number;
  // 产品评分
  rating: number;
  // 产品库存
  stock: number;
  // 产品品牌
  brand: string;
  // 产品分类
  category: string;
  // 产品缩略图
  thumbnail: string;
  // 产品图片
  images?: string[] | null; // ? 表示该属性是可选的
}