import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { Tasks } from './entity/tasks.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern({'cmd':'create_task'})
  createTasks(task:Tasks){
    const { id,description,status,user_id } = task;
    return this.appService.createTask({id,description,status,user_id});
  }

  @EventPattern({'cmd':'delete_task'})
  deleteTask(id:number){
    return this.appService.deleteTask(id);
  }

  @EventPattern({"cmd":"get_tasks"})
  getTasks(user_id:number){
    return this.appService.getTasks({user_id:user_id});
  }
}
