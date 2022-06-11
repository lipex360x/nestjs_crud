import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddCourseIdToCoursesTagsTable1654920860112
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'courses_tags',
      new TableColumn({
        name: 'coursesId',
        type: 'uuid',
        isPrimary: true,
      }),
    );

    await queryRunner.createForeignKey(
      'courses_tags',
      new TableForeignKey({
        name: 'FKCoursesCoursesTags',
        columnNames: ['coursesId'],

        referencedTableName: 'courses',
        referencedColumnNames: ['id'],

        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('courses_tags', 'FKCoursesCoursesTags');
    await queryRunner.dropColumn('courses_tags', 'coursesId');
  }
}
