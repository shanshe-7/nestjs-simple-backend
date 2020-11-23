import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { Task } from './entities/task.entity';
import { TaskRepository } from './repositories/task.repository';
import { TaskStatus } from './task-status.enum';


@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) {}

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }
        return found;
    }

    async getTasks(filderDto: GetTaskFilterDto): Promise<Task[]> {
        return this.taskRepository.getTasks(filderDto);
        
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return  this.taskRepository.createTask(createTaskDto);
   
    }
    
    async deletTask(id: number): Promise<void> {
        const result = await this.taskRepository.delete(id)
        
        if (!result.affected) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }
        
    }

    async updatetaskStatus(id: number, status: TaskStatus): Promise<Task> {
        const task =  await this.getTaskById(id);
        task.status = status;
        await task.save();
        return task;
    }
}
