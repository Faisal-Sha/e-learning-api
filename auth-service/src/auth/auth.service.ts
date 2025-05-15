import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private users: any[] = []; // In-memory user store (replace with DB in production)

  constructor(private readonly jwtService: JwtService) {}

  async register(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { email, password: hashedPassword };
    this.users.push(user);
    return user;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = this.users.find(u => u.email === email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return { email: user.email };
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}