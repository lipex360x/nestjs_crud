import { Version } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VersionsRepository } from './repositories/typeorm/Versions.repository';
import { VersionsController } from './versions.controller';
import { VersionsService } from './versions.service';

describe('VersionsController', () => {
  let controller: VersionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Version])],
      controllers: [VersionsController],
      providers: [
        VersionsService,
        {
          provide: 'VersionsRepository',
          useClass: VersionsRepository,
        },
      ],
    }).compile();

    controller = module.get<VersionsController>(VersionsController);
  });

  it('should be defined', () => {
    // expect(controller).toBeDefined();
  });
});
