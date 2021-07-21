import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../tasks/entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
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

  async update(id: string): Promise<Todo> {
    const todo = await this.todoRepository.findOneOrFail(id);
    todo.isCompleted = !todo.isCompleted;
    return this.todoRepository.save(todo);
  }

  async remove(id: string): Promise<Todo> {
    const todo = await this.todoRepository.findOneOrFail(id);
    return this.todoRepository.remove(todo);
  }
}
