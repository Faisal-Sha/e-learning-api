import { IsEmail, IsString, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail({}, { message: 'Please provide a valid email' })
  email: string;

  @ApiProperty({ 
    example: 'StrongP@ss123',
    description: 'Password must contain at least 8 characters, one uppercase letter, one number, and one special character'
  })
  @IsString()
  @MinLength(8)
  @Matches(
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    { message: 'Password too weak' }
  )
  password: string;
}

export class LoginDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail({}, { message: 'Please provide a valid email' })
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class TokenDto {
  @ApiProperty()
  @IsString()
  refreshToken: string;
}
