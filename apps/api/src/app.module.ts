import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { CardsModule } from './cards/cards.module';

@Module({
  imports: [DatabaseModule, AuthModule, CardsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
