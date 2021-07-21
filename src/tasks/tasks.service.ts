import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  create(payload: CreateTaskDto): Promise<Task> {
    const newTask = this.taskRepository.create(payload);
    return this.taskRepository.save(newTask);
  }

  findAll(): Promise<Task[]> {
    return this.taskRepository.find({
      relations: ['todos'],
    });
  }

  findOne(id: string): Promise<Task> {
    return this.taskRepository.findOne(id, {
      relations: ['todos'],
    });
  }

  async update(id: string, { title }: UpdateTaskDto): Promise<Task> {
    const isExist = await this.findOne(id);
    if (!isExist) {
      throw new NotFoundException({
        status: 'fail',
        message: 'Update failed. Id not found',
      });
    }

    await this.taskRepository.update(id, { title });
    return this.findOne(id);
  }

  async remove(id: string): Promise<Task> {
    const task = await this.findOne(id);
    if (!task) {
      throw new NotFoundException({
        status: 'fail',
        message: 'Update failed. Id not found',
      });
    }

    return this.taskRepository.remove(task);
  }

  async deleteAll(): Promise<void> {
    const tasks = await this.taskRepository.find();
    await this.taskRepository.remove(tasks);
  }
}
