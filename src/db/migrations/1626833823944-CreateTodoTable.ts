import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreateTodoTable1626833823944 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'todo',
      columns: [
        {
          name: 'id',
          type: 'varchar',
          length: '36',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'uuid',
        },
        {
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'description',
          type: 'varchar',
        },
        {
          name: 'dueDate',
          type: 'varchar',
        },
        {
          name: 'isCompleted',
          type: 'tinyint',
          isNullable: false,
          default: '0',
        },
      ],
    });

    await queryRunner.createTable(table);

    // Adding foreign keys
    await queryRunner.addColumn(
      table,
      new TableColumn({
        name: 'taskId',
        type: 'varchar',
        length: '36',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      table,
      new TableForeignKey({
        columnNames: ['taskId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'task',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('todo');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('taskId') !== -1,
    );
    await queryRunner.dropForeignKey(table, foreignKey);
    await queryRunner.dropColumn(table, 'taskId');
    await queryRunner.dropTable(table);
  }
}
