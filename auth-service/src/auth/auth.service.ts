import { Injectable, UnauthorizedException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserRole } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password } = registerDto;

    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await this.userModel.create({
        email,
        password: hashedPassword,
        role: UserRole.USER,
      });

      const tokens = await this.generateTokens(user);
      await this.updateRefreshToken(user.id, tokens.refreshToken);

      return {
        id: user.id,
        email: user.email,
        role: user.role,
        ...tokens
      };
    } catch (error) {
      throw new InternalServerErrorException('Error registering user');
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.generateTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      ...tokens
    };
  }

  async logout(userId: string) {
    // Find the user first
    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Update user and clear refresh token
    user.refreshToken = undefined;
    user.refreshTokenExpiry = undefined;
    await user.save();

    return {
      success: true,
      message: 'Logged out successfully',
    };
  }

  async refreshToken(userId: string, refreshToken: string) {
    const user = await this.userModel.findById(userId).exec();

    if (!user || !user.refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.refreshToken
    );

    if (!refreshTokenMatches) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const tokens = await this.generateTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  private async generateTokens(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: user.id,
          email: user.email,
          role: user.role,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: user.id,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userModel.findByIdAndUpdate(userId, {
      refreshToken: hashedRefreshToken,
    });
  }
}