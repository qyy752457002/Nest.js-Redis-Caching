import {
  Validate, // 导入验证装饰器
  ValidatorConstraint, // 导入验证器约束
  ValidatorConstraintInterface, // 导入验证器约束接口
} from 'class-validator'; // 导入 class-validator 模块

// 创建自定义验证器以确保用户输入与我们的虚拟 API 能够提供的内容一致
@ValidatorConstraint({ name: 'productIdLength', async: false }) // 定义验证器约束，指定名称为 'productIdLength'，不使用异步
export class productIdLength implements ValidatorConstraintInterface {
  validate(productId: string) {
    // 定义验证方法，接收产品 ID 字符串作为参数
    return +productId >= 1 && +productId <= 10; // 检查将产品 ID 转换为数字后是否在 1 到 10 之间
  }

  defaultMessage() {
    // 定义默认错误消息
    return 'productId must be between 1 - 10'; // 返回错误消息，指示产品 ID 必须在 1 到 10 之间
  }
}

export class GetProductDTO {
  // 定义获取产品数据传输对象（DTO）
  @Validate(productIdLength) // 应用自定义的 productIdLength 验证器装饰器，验证 productId 字段
  productId: string; // 产品 ID 字段
}
