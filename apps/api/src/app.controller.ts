import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('files')
  trySave(req, _) {
    console.log('Entramos en el servidor con el file', JSON.stringify(req));
  }
}
