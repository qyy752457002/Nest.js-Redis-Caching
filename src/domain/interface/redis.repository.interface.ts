// 导出Redis仓库接口
export interface RedisRepositoryInterface {
  // 获取一个键的值
  get(prefix: string, key: string): Promise<string | null>;
  // 设置一个键的值
  set(prefix: string, key: string, value: string): Promise<void>;
  // 删除一个键
  delete(prefix: string, key: string): Promise<void>;
  // 设置一个带过期时间的键值对
  setWithExpiry(
    prefix: string,
    key: string,
    value: string,
    expiry: number,
  ): Promise<void>;
}
