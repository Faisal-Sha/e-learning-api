import { Injectable } from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class RedisService {
  private client = createClient({
    url: process.env.REDIS_URL || 'redis://redis:6379'
  });

  constructor() {
    this.client.connect().catch(err => {
      console.error('Redis connection error:', err);
    });

    this.client.on('error', (err) => {
      console.error('Redis error:', err);
    });
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async set(key: string, value: string, ttl: number): Promise<void> {
    await this.client.setEx(key, ttl, value);
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }
}