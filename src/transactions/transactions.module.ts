import { Module } from '@nestjs/common';
import { TransationsController } from './transactions.controller';

@Module({
  controllers: [TransationsController],
})
export class TransationsModule {}
