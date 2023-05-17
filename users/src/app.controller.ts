import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { Users } from './app.interface';
import { UsersE } from './entity/users.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({cmd:'user'})
  getUser(filters){
    return this.appService.getUser(filters);
  }
  
  @EventPattern({'cmd':'create_user'})
  createUser(users:UsersE){
    const {id, name, email, pwd } = users;
    return this.appService.createUsers({id,name,email,pwd});
  }
}
