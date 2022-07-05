import { CreateVersionDto } from '../dto/create-version.dto';
import { UpdateVersionDto } from '../dto/update-version.dto';
import { Version } from '../entities/version.entity';

export interface VersionRepositoryInterface {
  create(version: CreateVersionDto): Promise<Version>;
  findAll(): Promise<Version[]>;
  findLast(systemOperation: string): Promise<Version>;
  findOne(id: string): Promise<Version>;
  findBySOAndVersion(
    systemOperation: string,
    version: string,
  ): Promise<Version>;
  update(id: string, version: UpdateVersionDto): Promise<Version>;
  remove(id: string): Promise<void>;
}
