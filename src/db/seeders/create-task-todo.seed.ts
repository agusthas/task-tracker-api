import { Factory, Seeder } from 'typeorm-seeding';
import { Task } from '../../tasks/entities/task.entity';
import { Todo } from '../../todos/entities/todo.entity';

export class CreateTaskTodo implements Seeder {
  async run(factory: Factory): Promise<void> {
    await factory(Task)()
      .map(async (task: Task) => {
        const todos: Todo[] = await factory(Todo)().createMany(2);
        task.todos = todos;
        return task;
      })
      .createMany(5);
  }
}
