import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateCardDto {
  @ApiProperty({ example: 'Nubank' })
  @IsString()
  @MinLength(2)
  name: string;
}
