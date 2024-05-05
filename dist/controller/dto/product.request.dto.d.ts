import { ValidatorConstraintInterface } from 'class-validator';
export declare class productIdLength implements ValidatorConstraintInterface {
    validate(productId: string): boolean;
    defaultMessage(): string;
}
export declare class GetProductDTO {
    productId: string;
}
