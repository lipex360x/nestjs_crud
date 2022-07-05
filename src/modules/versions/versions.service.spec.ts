import 'reflect-metadata';

import { VersionsService } from './versions.service';
import FakeVersionRepository from './repositories/fake/fake.versions.repository';
import { NotAcceptableException, NotFoundException } from '@nestjs/common';

let versionsService: VersionsService;
let fakeVersionRepository: FakeVersionRepository;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('VersionsService', () => {
  beforeEach(async () => {
    fakeVersionRepository = new FakeVersionRepository();
    versionsService = new VersionsService(fakeVersionRepository);
  });

  it('should not be able to create a duplicate version', async () => {
    await fakeVersionRepository.create({
      version: '1.0.0',
      isMandatory: true,
      systemOperation: 'iOS',
    });

    await expect(
      versionsService.create({
        version: '1.0.0',
        isMandatory: false,
        systemOperation: 'iOS',
      }),
    ).rejects.toBeInstanceOf(NotAcceptableException);
  });

  it('should be able to create a new version', async () => {
    const version = {
      version: '1.0.0',
      isMandatory: false,
      systemOperation: 'iOS',
    };

    const newVersion = await versionsService.create(version);

    expect(newVersion).toHaveProperty('id');
  });

  it('should be able to list all versions', async () => {
    await fakeVersionRepository.create({
      version: '1.0.0',
      isMandatory: true,
      systemOperation: 'iOS',
    });

    await fakeVersionRepository.create({
      version: '2.0.0',
      isMandatory: true,
      systemOperation: 'iOS',
    });

    const getVersions = await versionsService.findAll();

    expect(getVersions.length).toEqual(2);
  });

  it('should be able to show the latest version', async () => {
    await fakeVersionRepository.create({
      version: '1.0.0',
      isMandatory: true,
      systemOperation: 'ios',
    });

    await sleep(50);
    await fakeVersionRepository.create({
      version: '2.0.0',
      isMandatory: true,
      systemOperation: 'ios',
    });

    await sleep(50);
    await fakeVersionRepository.create({
      version: '2.0.1',
      isMandatory: true,
      systemOperation: 'ios',
    });

    await sleep(50);
    await fakeVersionRepository.create({
      version: '2.0.2',
      isMandatory: true,
      systemOperation: 'android',
    });

    await sleep(50);
    await fakeVersionRepository.create({
      version: '2.0.3',
      isMandatory: true,
      systemOperation: 'android',
    });

    const getLastVersionAndroid = await versionsService.findLast('android');

    expect(getLastVersionAndroid).toEqual(
      expect.objectContaining({
        version: '2.0.3',
      }),
    );

    const getLastVersionIos = await versionsService.findLast('ios');
    expect(getLastVersionIos).toEqual(
      expect.objectContaining({
        version: '2.0.1',
      }),
    );
  });

  it('should not be able to show non-existing version', async () => {
    await expect(versionsService.findOne('fakeId')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('should be able to show one version by id', async () => {
    await fakeVersionRepository.create({
      version: '1.0.0',
      isMandatory: true,
      systemOperation: 'iOS',
    });

    const version = await fakeVersionRepository.create({
      version: '2.0.0',
      isMandatory: true,
      systemOperation: 'iOS',
    });

    const getVersions = await versionsService.findOne(version.id);

    expect(getVersions).toEqual(
      expect.objectContaining({
        version: '2.0.0',
      }),
    );
  });

  it('should not be able to update a non-existing version', async () => {
    const version = {
      id: 'fakeId',
      version: '2.0.0',
      isMandatory: true,
      systemOperation: 'iOS',
    };

    await expect(
      versionsService.update(version.id, version),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should not be able to update a version to an existenting version', async () => {
    const version = await fakeVersionRepository.create({
      version: '2.0.0',
      isMandatory: true,
      systemOperation: 'iOS',
    });

    await expect(
      versionsService.update(version.id, version),
    ).rejects.toBeInstanceOf(NotAcceptableException);
  });

  it('should be able to update a version', async () => {
    const newVersion = await fakeVersionRepository.create({
      version: '2.0.0',
      isMandatory: true,
      systemOperation: 'iOS',
    });

    const updateVersion = {
      id: newVersion.id,
      version: '2.0.3',
      isMandatory: true,
      systemOperation: 'iOS',
    };

    const versionUpdated = await versionsService.update(
      newVersion.id,
      updateVersion,
    );

    expect(versionUpdated).toEqual(
      expect.objectContaining({
        version: '2.0.3',
      }),
    );
  });

  it('should not be able to delete a non-existing version', async () => {
    await expect(versionsService.remove('fakeId')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('should be able to delete a version', async () => {
    const version = await fakeVersionRepository.create({
      version: '2.0.0',
      isMandatory: true,
      systemOperation: 'iOS',
    });

    await versionsService.remove(version.id);

    const getVersions = await fakeVersionRepository.findAll();
    expect(getVersions.length).toEqual(0);
  });
});
