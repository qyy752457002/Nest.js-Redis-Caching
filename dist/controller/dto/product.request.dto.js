"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProductDTO = exports.productIdLength = void 0;
const class_validator_1 = require("class-validator");
let productIdLength = class productIdLength {
    validate(productId) {
        return +productId >= 1 && +productId <= 10;
    }
    defaultMessage() {
        return 'productId must be between 1 - 10';
    }
};
exports.productIdLength = productIdLength;
exports.productIdLength = productIdLength = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'productIdLength', async: false })
], productIdLength);
class GetProductDTO {
}
exports.GetProductDTO = GetProductDTO;
__decorate([
    (0, class_validator_1.Validate)(productIdLength),
    __metadata("design:type", String)
], GetProductDTO.prototype, "productId", void 0);
//# sourceMappingURL=product.request.dto.js.map