import { IsNotEmpty, IsString } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;
}
