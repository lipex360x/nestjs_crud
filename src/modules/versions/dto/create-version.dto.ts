import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateVersionDto {
  @IsString()
  @IsNotEmpty()
  version?: string;

  @IsString()
  @IsNotEmpty()
  systemOperation: string;

  @IsOptional()
  isMandatory?: boolean;

  createdAt?: Date;
}
