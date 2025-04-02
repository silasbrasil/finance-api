import { Body, Controller, Post } from '@nestjs/common';
import { ZodPipe } from 'src/pipes/zod.pipe';
import { TransactionDto, TransactionSchema } from './dtos/transaction-create.dto';

@Controller('transactions')
export class TransationsController {
  @Post()
  async create(
    @Body(new ZodPipe(TransactionSchema)) body: TransactionDto
  ): Promise<TransactionDto> {
    console.log(body);
    return body;
  }
}
