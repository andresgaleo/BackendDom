import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tasks } from './entity/tasks.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Tasks)
    private repo:Repository<Tasks>
  ){}
  
  async createTask(task:Tasks):Promise<Tasks>{
    const taskEntity:Tasks = this.repo.create();
    const {id, description, status, user_id} = task;
    if(id>0){
      //Si existe ID, se actualiza, sino inserta.
      taskEntity.id = id;
    }
    taskEntity.description = description;
    taskEntity.status = status;
    taskEntity.user_id = user_id;
    const response = await this.repo.save(taskEntity);
    return response;
  }

  async getTask(filters){
    return this.repo.findOne({
      select:['id','description','status','user_id'],
      where:{
        id:filters.id
      }
    });
  }

  async deleteTask(id:number):Promise<DeleteResult>{
    let result = await this.getTask({id:id});
    const response = await this.repo.delete(result.id);
    return response;
  }

  async getTasks(filters){
    return this.repo.find({
      select:['id','description','status','user_id'],
      where:{
        user_id:filters.user_id
      }
    });
  }
}
