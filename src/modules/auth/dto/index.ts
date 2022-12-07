import { IsString } from 'class-validator'
import { ApiProperty, ApiTags } from '@nestjs/swagger';

export class UserLoginDTO {
  @ApiProperty()
  @IsString()
  email: string

  @ApiProperty()
  @IsString()
  password: string
}
