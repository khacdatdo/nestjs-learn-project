import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LoginDto, RefreshTokenDto } from './dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('login')
  @HttpCode(200)
  login(@Body() user: LoginDto): Promise<any> {
    return this.authService.login(user.username, user.facebookId);
  }

  @Post('refresh-token')
  @HttpCode(200)
  refreshToken(@Body() body: RefreshTokenDto): Promise<any> {
    return this.authService.refreshToken(body.refreshToken);
  }
}
