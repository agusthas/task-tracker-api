import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  InternalServerErrorException,
  ParseUUIDPipe,
  NotFoundException,
  Patch,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@UsePipes(
  new ValidationPipe({
    transform: true,
  }),
)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() body: CreateTaskDto) {
    try {
      const task = await this.tasksService.create(body);
      return {
        status: 'success',
        message: 'Insert success.',
        data: task,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: 'fail',
        message: 'Insert failed',
        error: error.message,
      });
    }
  }

  @Get()
  async findAll() {
    const tasks = await this.tasksService.findAll();

    return {
      status: 'success',
      data: tasks,
    };
  }

  @Delete()
  async deleteAll() {
    await this.tasksService.deleteAll();

    return {
      status: 'success',
      message: 'Delete all success.',
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const task = await this.tasksService.findOne(id);
    if (!task) {
      throw new NotFoundException({
        status: 'fail',
        message: 'Fetch failed. Id not found',
      });
    }

    return {
      status: 'success',
      data: task,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const task = await this.tasksService.update(id, updateTaskDto);

    return {
      status: 'success',
      message: 'Update success.',
      data: task,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const task = await this.tasksService.remove(id);

    return {
      status: 'success',
      message: 'Delete success.',
      data: task,
    };
  }
}
