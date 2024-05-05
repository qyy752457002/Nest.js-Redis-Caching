"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./controller/app.controller");
const password_reset_controller_1 = require("./controller/password-reset.controller");
const product_controller_1 = require("./controller/product.controller");
const redis_module_1 = require("./infrastructure/redis/redis.module");
const app_service_1 = require("./service/app.service");
const password_reset_service_1 = require("./service/password-reset.service");
const product_service_1 = require("./service/product.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [redis_module_1.RedisModule],
        controllers: [app_controller_1.AppController, product_controller_1.ProductController, password_reset_controller_1.PasswordResetController],
        providers: [app_service_1.AppService, product_service_1.ProductService, password_reset_service_1.PasswordResetService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map