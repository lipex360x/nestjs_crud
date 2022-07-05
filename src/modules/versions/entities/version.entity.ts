import { v4 as uuid } from 'uuid';

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

@Entity('versions')
export class Version {
  constructor() {
    if (!this.id) this.id = uuid();
  }

  @ApiProperty({ description: 'Identifier type universally unique identifier' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: ' Define version' })
  @Column({ name: 'version' })
  version?: string;

  @ApiProperty({ description: ' Define system operation' })
  @Column({ name: 'system_operation' })
  systemOperation?: string;

  @ApiProperty({ description: 'Define if update is mandatory' })
  @Column({ name: 'is_mandatory' })
  isMandatory?: boolean;

  @ApiProperty({ description: 'When versions content was created' })
  @CreateDateColumn()
  @Column({ name: 'created_at' })
  createdAt?: Date;
}
