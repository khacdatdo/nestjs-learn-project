import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt/jwt-auth.guard';
import { AuthenticationService } from './authentication.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('login')
  @HttpCode(200)
  login(@Body() user: LoginDto): Promise<any> {
    return this.authService.login(user.username, user.facebookId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh-token')
  @HttpCode(200)
  refreshToken(@Req() req): Promise<any> {
    const payload = req.user;
    return this.authService.refreshToken(payload);
  }
}
