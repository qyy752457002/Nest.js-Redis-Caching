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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordResetController = void 0;
const common_1 = require("@nestjs/common");
const password_reset_service_1 = require("../service/password-reset.service");
const password_reset_token_request_dto_1 = require("./dto/password-reset-token-request.dto");
const password_update_request_dto_1 = require("./dto/password-update-request.dto");
let PasswordResetController = class PasswordResetController {
    constructor(passwordResetService) {
        this.passwordResetService = passwordResetService;
    }
    async generateToken(passwordResetTokenRequestDTO) {
        const data = await this.passwordResetService.generateResetToken(passwordResetTokenRequestDTO.userId);
        return { data };
    }
    async updatePassword(passwordUpdateRequestDTO) {
        const userId = await this.passwordResetService.getTokenUserId(passwordUpdateRequestDTO.token);
        if (userId) {
            console.log('Password updated successfully');
        }
        else {
            throw new common_1.BadRequestException('Invalid token');
        }
    }
};
exports.PasswordResetController = PasswordResetController;
__decorate([
    (0, common_1.Post)('/generate-token'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [password_reset_token_request_dto_1.PasswordResetTokenRequestDTO]),
    __metadata("design:returntype", Promise)
], PasswordResetController.prototype, "generateToken", null);
__decorate([
    (0, common_1.Get)('/update-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [password_update_request_dto_1.PasswordUpdateRequestDTO]),
    __metadata("design:returntype", Promise)
], PasswordResetController.prototype, "updatePassword", null);
exports.PasswordResetController = PasswordResetController = __decorate([
    (0, common_1.Controller)('reset-password'),
    __metadata("design:paramtypes", [password_reset_service_1.PasswordResetService])
], PasswordResetController);
//# sourceMappingURL=password-reset.controller.js.map