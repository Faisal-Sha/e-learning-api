import { Controller, Post, Body } from '@nestjs/common';
import { Client, ClientTCP, Transport } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  @Client({
    transport: Transport.TCP,
    options: {
      host: 'auth-service',
      port: 3001,
    },
  })
  private client: ClientTCP;

  @Post('login')
  async login(@Body() credentials: any) {
    return this.client.send({ cmd: 'login' }, credentials);
  }

  @Post('register')
  async register(@Body() userData: any) {
    return this.client.send({ cmd: 'register' }, userData);
  }

  @Post('verify')
  async verifyToken(@Body() token: string) {
    return this.client.send({ cmd: 'verify-token' }, { token });
  }
}
