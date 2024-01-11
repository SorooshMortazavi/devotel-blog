import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async signup(@Body() registerDto:RegisterUserDto){
    const  user  = await this.authService.register(registerDto)
    return {
      success:true,
      user
    }
  }
}
