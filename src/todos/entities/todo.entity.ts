import { Task } from 'src/tasks/entities/task.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  dueDate: string;

  @Column({ default: 0 })
  isCompleted: boolean;

  @ManyToOne(() => Task, (task) => task.todos, { onDelete: 'CASCADE' })
  task: Task;
}
