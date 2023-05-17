import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UsersE } from './entity/users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UsersE)
    private repo:Repository<UsersE>
  ){}
  
  getUser(filters){
    return this.repo.findOne({
      select:['email','name','id'],
      where:{
        email:filters.user.email,
        pwd:filters.user.pwd
      }
    })
  }

  async createUsers(user:UsersE):Promise<UsersE>{
    const userEntity: UsersE = this.repo.create();
    const {id,name,email,pwd} = user;
    userEntity.name = name;
    userEntity.email = email;
    userEntity.pwd = pwd;
    const response = await this.repo.save(userEntity);
    return response;

  }
}
