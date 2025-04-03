import { Body, Controller, Get, Post } from '@nestjs/common';
import { ZodPipe } from '../pipes/zod.pipe';
import { TransactionDto, TransactionSchema } from './dtos/transaction-create.dto';

@Controller('transactions')
export class TransationsController {

  @Get()
  async list(): Promise<any> {
    return { data: [], nextPageToken: 'xyz' };
  }

  @Post()
  async create(
    @Body(new ZodPipe(TransactionSchema)) body: TransactionDto
  ): Promise<{ data: any }> {
    console.log(body);
    return { data: body };
  }
}
