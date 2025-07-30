import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Hello World')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get hello world message' })
  @ApiResponse({ status: 200, description: 'Returns hello world message' })
  getHello(): string {
    return 'hello world';
  }
}
