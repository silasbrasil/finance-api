import { Module } from '@nestjs/common';
import { TransationsModule } from './transactions/transactions.module';

@Module({
  imports: [TransationsModule],
})
export class AppModule {}
