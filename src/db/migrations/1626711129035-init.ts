import {MigrationInterface, QueryRunner} from "typeorm";

export class init1626711129035 implements MigrationInterface {
    name = 'init1626711129035'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `todo` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `dueDate` varchar(255) NOT NULL, `isCompleted` tinyint NOT NULL DEFAULT '0', `taskId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `task` (`id` varchar(36) NOT NULL, `title` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `todo` ADD CONSTRAINT `FK_681a7f7ce5bbf0990f8d51f4e0d` FOREIGN KEY (`taskId`) REFERENCES `task`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `todo` DROP FOREIGN KEY `FK_681a7f7ce5bbf0990f8d51f4e0d`");
        await queryRunner.query("DROP TABLE `task`");
        await queryRunner.query("DROP TABLE `todo`");
    }

}
