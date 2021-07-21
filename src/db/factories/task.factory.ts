import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Task } from '../../tasks/entities/task.entity';

define(Task, (faker: typeof Faker) => {
  const task = new Task();
  task.id = faker.random.uuid();
  task.title = faker.random.words(2);
  return task;
});
