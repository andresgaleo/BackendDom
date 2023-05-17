import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersE } from './entity/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'sqlite',
      database:'domina.db',
      entities:[UsersE],
      synchronize:true
    }),
    TypeOrmModule.forFeature([UsersE]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
