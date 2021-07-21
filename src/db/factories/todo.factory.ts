import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Todo } from '../../todos/entities/todo.entity';

define(Todo, (faker: typeof Faker) => {
  const todo = new Todo();
  todo.id = faker.random.uuid();
  todo.name = faker.random.word();
  todo.description = faker.lorem.words(2);
  todo.isCompleted = false;
  todo.dueDate = faker.date.future().toISOString();
  return todo;
});
