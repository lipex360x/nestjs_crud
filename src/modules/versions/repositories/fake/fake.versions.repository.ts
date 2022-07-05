import { CreateVersionDto } from '../../dto/create-version.dto';
import { UpdateVersionDto } from '../../dto/update-version.dto';
import { Version } from '../../entities/version.entity';
import { VersionRepositoryInterface } from '../versions.repository.interface';

export default class FakeVersionsRepository
  implements VersionRepositoryInterface
{
  private versionRepository: Version[] = [];

  async create({
    version,
    isMandatory,
    systemOperation,
  }: CreateVersionDto): Promise<Version> {
    const newVersion = new Version();

    Object.assign(newVersion, {
      ...newVersion,
      version,
      isMandatory,
      systemOperation,
      createdAt: new Date(),
    });

    this.versionRepository.push(newVersion);

    return newVersion;
  }

  async findAll(): Promise<Version[]> {
    return this.versionRepository;
  }

  async findLast(systemOperation: string): Promise<Version> {
    const versions = this.versionRepository.filter(
      (entity) => entity.systemOperation === systemOperation,
    );

    const getLastVersions = versions.sort((a, b) => {
      const c = new Date(a.createdAt).getTime();
      const d = new Date(b.createdAt).getTime();

      return d - c;
    });

    return getLastVersions[0];
  }

  async findOne(id: string): Promise<Version> {
    return this.versionRepository.find((entity) => entity.id === id);
  }

  async findBySOAndVersion(
    systemOperation: string,
    version: string,
  ): Promise<Version> {
    const versions = this.versionRepository.filter(
      (entity) => entity.systemOperation === systemOperation,
    );

    return versions.find((entity) => entity.version === version);
  }

  async update(id: string, version: UpdateVersionDto): Promise<Version> {
    const getIndex = this.versionRepository.findIndex(
      (entity) => entity.id === id,
    );

    const updateVersion = new Version();

    Object.assign(updateVersion, {
      ...updateVersion,
      ...version,
      createdAt: new Date(),
    });

    this.versionRepository[getIndex] = version;

    return updateVersion;
  }

  async remove(id: string): Promise<void> {
    this.versionRepository = this.versionRepository.filter(
      (entity) => entity.id !== id,
    );
  }
}
