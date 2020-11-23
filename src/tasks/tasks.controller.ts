import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './entities/task.entity';
import { TaskStatus } from './task-status.enum';


@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) { }
    
    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Promise<Task []>  {
        return this.taskService.getTasks(filterDto);
    }

    @Get('/:id')
    getTasksById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.taskService.getTaskById(id);
    }
    

    @Post() 
    @UsePipes(ValidationPipe)
    createTask( @Body() createTaskDto: CreateTaskDto
    ): Promise<Task> {
        return this.taskService.createTask(createTaskDto)

    }

    @Delete('/:id')
    async deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.taskService.deletTask(id);
    }
    @Patch('/:id/status')
    async updatTaskStatus(@Param('id', ParseIntPipe) id: number, @Body('status', TaskStatusValidationPipe)  status: TaskStatus): Promise<Task> {
        return this.taskService.updatetaskStatus(id, status)
    }
}
