import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Task, Users } from './app.interface';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    @Inject('PUBSUB')
    private readonly client: ClientProxy
  ) {}

  @Post('users/create')
  async createUser(@Body() user:Users){
    return firstValueFrom(await this.client.send<Users>({'cmd':'create_user'},user))
    .then((value)=>{
      return value;
    });
  }

  @Post('users/login')
  async getUser(@Body() user:Users){
    return firstValueFrom(await this.client.send<Users>({'cmd':'user'},{user}))
    .then((value)=>{
      if(value!=null){
        return value
      }else{
        return {"message":"Usuario no encontrado o datos incorrectos.","success":"error"}
      }
    });
  }

  @Post('tasks/create')
  async createTask(@Body() task:Task){
    return firstValueFrom(await this.client.send<Task>({'cmd':'create_task'},task))
    .then((value)=>{
      return value;
    });
  }

  @Put('tasks/update')
  async updateTask(@Body() task:Task){
    return firstValueFrom(await this.client.send<Task>({'cmd':'create_task'},task))
    .then((value)=>{
      return value;
    });
  }

  @Delete('tasks/delete/:id')
  async deleteTask(@Param('id') id:number){
    return firstValueFrom(await this.client.send<any>({"cmd":"delete_task"},id))
    .then((value)=>{
      if(value.affected>0){
        return {"message":"Registro eliminado satisfactoriamente","success":"success"}
      }else{
        return {"message":"Error inesperado, no se pudo eliminar ningún registro.","success":"error"}
      }
    })
  }

  @Get("tasks/:id")
  async GetTasks(@Param("id") id:number){
    return firstValueFrom(await this.client.send<Task[]>({"cmd":"get_tasks"},id))
    .then((value)=>{
      return value;
    });
  }
}
