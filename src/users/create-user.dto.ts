import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    required: true,
    nullable: false,
  })
  username?: string;
  @ApiProperty({
    required: true,
    nullable: false,
  })
  email?: string;
  @ApiProperty({ required: true, nullable: false })
  password?: string;
}

export class CreateValidRegister {
  @ApiProperty({
    example: 'fredianrikox',
  })
  username?: string;
  @ApiProperty({
    example: 'fredianrikox@gmail.com',
  })
  email?: string;
  @ApiProperty({
    example: 'admin',
  })
  password?: string;
}

export class CreateValidLogin {
  @ApiProperty({
    example: 'fredianriko@gmail.com',
  })
  email?: 'fredianriko@mail.com';
  @ApiProperty({
    example: 'admin',
  })
  password?: 'admin';
}
