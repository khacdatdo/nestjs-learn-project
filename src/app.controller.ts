import { Controller, Get, Post, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { AllValidationPipe } from './common/pipes/validation.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  @UsePipes(new AllValidationPipe())
  getBadRequest(): string {
    return this.appService.getBadRequest();
  }
}
