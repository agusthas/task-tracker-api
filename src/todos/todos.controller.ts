import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';

@UsePipes(
  new ValidationPipe({
    transform: true,
  }),
)
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post(':taskId')
  async create(
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Body() createTodoDto: CreateTodoDto,
  ) {
    const todo = await this.todosService.create(taskId, createTodoDto);
    return {
      status: 'success',
      data: todo,
    };
  }

  @Patch('complete/:todoId')
  async update(@Param('todoId', ParseUUIDPipe) todoId: string) {
    const todo = await this.todosService.update(todoId);
    return {
      status: 'success',
      data: todo,
    };
  }

  @Delete(':todoId')
  async remove(@Param('todoId', ParseUUIDPipe) todoId: string) {
    const todo = await this.todosService.remove(todoId);
    return {
      status: 'success',
      data: todo,
    };
  }
}
