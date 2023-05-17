import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasks } from './entity/tasks.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'sqlite',
      database:'../users/domina.db',
      entities:[Tasks],
      synchronize:true
    }),
    TypeOrmModule.forFeature([Tasks]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
