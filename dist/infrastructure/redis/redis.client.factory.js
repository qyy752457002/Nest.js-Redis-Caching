"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClientFactory = void 0;
const ioredis_1 = require("ioredis");
exports.redisClientFactory = {
    provide: 'RedisClient',
    useFactory: () => {
        const redisInstance = new ioredis_1.Redis({
            host: process.env.REDIS_HOST,
            port: +process.env.REDIS_PORT,
        });
        redisInstance.on('error', (err) => {
            throw new Error(`Redis connection failed: ${err}`);
        });
        return redisInstance;
    },
    inject: [],
};
//# sourceMappingURL=redis.client.factory.js.map