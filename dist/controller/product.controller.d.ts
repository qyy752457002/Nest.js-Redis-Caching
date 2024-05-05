import { ProductInterface } from '../domain/interface/product.interface';
import { ProductService } from '../service/product.service';
import { GetProductDTO } from './dto/product.request.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getProduct(params: GetProductDTO): Promise<{
        data: ProductInterface;
    }>;
}
