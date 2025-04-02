import { Controller, Post } from '@nestjs/common';

@Controller('transactions')
export class TransationsController {
  @Post()
  async create(): Promise<any> {
    return;
  }
}
