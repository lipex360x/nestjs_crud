import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateVersionDto } from '../../dto/create-version.dto';
import { UpdateVersionDto } from '../../dto/update-version.dto';
import { Version } from '../../entities/version.entity';
import { Repository } from 'typeorm';
import { VersionRepositoryInterface } from '../versions.repository.interface';

@Injectable()
export class VersionsRepository implements VersionRepositoryInterface {
  constructor(
    @InjectRepository(Version)
    private readonly versionRepository: Repository<Version>,
  ) {}

  async create({
    version,
    isMandatory,
    systemOperation,
  }: CreateVersionDto): Promise<Version> {
    return this.versionRepository.save({
      version,
      isMandatory,
      systemOperation,
    });
  }

  async findAll(): Promise<Version[]> {
    return this.versionRepository.find();
  }

  async findLast(systemOperation: string): Promise<Version> {
    return this.versionRepository.findOne({
      where: { systemOperation },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Version> {
    return this.versionRepository.findOne(id);
  }

  async findBySOAndVersion(
    systemOperation: string,
    version: string,
  ): Promise<Version> {
    return this.versionRepository.findOne({
      where: { systemOperation, version },
    });
  }

  update(id: string, version: UpdateVersionDto): Promise<Version> {
    return this.versionRepository.save({ id, ...version });
  }

  async remove(id: string): Promise<void> {
    this.versionRepository.delete({ id });
  }
}
