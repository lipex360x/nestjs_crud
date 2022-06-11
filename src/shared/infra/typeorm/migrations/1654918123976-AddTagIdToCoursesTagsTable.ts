import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddTagIdToCoursesTagsTable1654918123976
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'courses_tags',
      new TableColumn({
        name: 'tagId',
        type: 'uuid',
        isPrimary: true,
      }),
    );

    await queryRunner.createForeignKey(
      'courses_tags',
      new TableForeignKey({
        name: 'FKTagsCoursesTags',
        columnNames: ['tagId'],

        referencedTableName: 'tags',
        referencedColumnNames: ['id'],

        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('courses_tags', 'FKTagsCoursesTags');
    await queryRunner.dropColumn('courses_tags', 'tagId');
  }
}
