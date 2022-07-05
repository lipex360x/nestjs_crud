import {
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateVersionDto } from './dto/create-version.dto';
import { UpdateVersionDto } from './dto/update-version.dto';
import { VersionRepositoryInterface } from './repositories/versions.repository.interface';

@Injectable()
export class VersionsService {
  constructor(
    @Inject('VersionsRepository')
    private readonly versionRepository: VersionRepositoryInterface,
  ) {}

  async create(createVersionDto: CreateVersionDto) {
    const { systemOperation, version } = createVersionDto;

    const getVersion = await this.versionRepository.findBySOAndVersion(
      systemOperation,
      version,
    );

    if (getVersion)
      throw new NotAcceptableException(
        `Version ${createVersionDto.version} is already exists`,
      );

    return this.versionRepository.create(createVersionDto);
  }

  findAll() {
    return this.versionRepository.findAll();
  }

  async findLast(systemOperation: string) {
    const version = await this.versionRepository.findLast(systemOperation);

    return version;
  }

  async findOne(id: string) {
    const getVersion = await this.versionRepository.findOne(id);

    if (!getVersion) throw new NotFoundException(`Version ID ${id} not found`);

    return getVersion;
  }

  async update(id: string, updateVersionDto: UpdateVersionDto) {
    const getVersionById = await this.versionRepository.findOne(id);
    const { systemOperation, version } = updateVersionDto;

    if (!getVersionById) {
      throw new NotFoundException(`Version ID ${id} not found`);
    }

    const getVersionByNumber = await this.versionRepository.findBySOAndVersion(
      systemOperation,
      version,
    );

    if (getVersionByNumber) {
      throw new NotAcceptableException(
        `Version ${updateVersionDto.version} is already exists`,
      );
    }

    return this.versionRepository.update(id, updateVersionDto);
  }

  async remove(id: string) {
    const getVersion = await this.versionRepository.findOne(id);

    if (!getVersion) throw new NotFoundException(`Version ID ${id} not found`);

    return this.versionRepository.remove(id);
  }
}
