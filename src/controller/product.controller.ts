// 导入Nestjs的Controller、Get、Param等模块
import { Controller, Get, Param } from '@nestjs/common';
// 导入产品接口和产品服务
import { ProductInterface } from '../domain/interface/product.interface';
import { ProductService } from '../service/product.service';
// 导入获取产品请求参数
import { GetProductDTO } from './dto/product.request.dto';

// 定义产品控制器
@Controller('products')
export class ProductController {
  // 构造函数，注入产品服务
  constructor(private readonly productService: ProductService) {}

  // 定义获取产品路由，通过产品ID获取产品
  @Get('/:productId')
  async getProduct(
    // 获取产品ID
    @Param() params: GetProductDTO,
  ): Promise<{ data: ProductInterface }> {
    // 调用产品服务获取产品
    const data = await this.productService.getProduct(params.productId);
    // 返回产品
    return { data };
  }
}
