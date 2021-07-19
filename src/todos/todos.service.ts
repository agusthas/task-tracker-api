import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../tasks/entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  async create(taskId: string, createTodoDto: CreateTodoDto) {
    const task = await this.taskRepository.findOneOrFail(taskId);

    const newTodo = this.todoRepository.create(createTodoDto);
    await this.todoRepository.save(newTodo);

    task.todos = [newTodo];
    await this.taskRepository.save(task);
    return newTodo;
  }

  findAll() {
    return `This action returns all todos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
