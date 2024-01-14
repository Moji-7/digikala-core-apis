import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
@Injectable()
export class MyCacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async get(key: string) {
    return await this.cacheManager.get(key);
  }

  async set(key: string, value: any, ttl?: number) {
    return await this.cacheManager.set(key, value, ttl);
  }

  async del(key: string) {
    return await this.cacheManager.del(key);
  }

  // Add this method to get the redis client
  async getClient() {
    return this.cacheManager.store.getClient();
  }
}
