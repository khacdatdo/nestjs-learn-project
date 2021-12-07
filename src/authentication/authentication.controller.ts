import { Body, Controller, Get, Post } from '@nestjs/common';
import { ROLES } from 'src/common/constants';
import { Role } from '../common/guards/role/role.decorator';
import { AuthenticationService } from './authentication.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Role(ROLES.ADMIN)
  @Get('test')
  async hello(): Promise<any> {
    return {
      message: 'Hello World',
    };
  }

  @Post('login')
  async login(@Body() user: LoginDto): Promise<any> {
    const accessToken = await this.authService.login(
      user.username,
      user.facebookId,
    );
    return { accessToken };
  }
}
