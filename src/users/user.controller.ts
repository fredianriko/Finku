import {
  Controller,
  Get,
  Param,
  Post,
  UseFilters,
  Body,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import {
  CreateUserDto,
  CreateValidLogin,
  CreateValidRegister,
} from './create-user.dto';
import { EntityNotFoundExceptionFilter } from './entity-not-found-exception-filter';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  ApiBody,
  ApiParam,
  ApiProperty,
  ApiTags,
  ApiResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { User } from './user.entity';

@Controller('users')
@ApiTags('users')
@UseFilters(new EntityNotFoundExceptionFilter())
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  // create new user
  @Post('register')
  @ApiBody({ type: [CreateValidRegister] })
  @ApiCreatedResponse({ type: User })
  async register(
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const saltRound = 12;
    const hashPassword = await bcrypt.hash(password, saltRound, (err, hash) => {
      if (!err) {
        return hash;
      } else {
        throw err;
      }
    });

    return this.userService.create({
      username,
      email,
      password: hashPassword,
    });
  }

  @Post('login')
  @ApiBody({
    type: CreateValidLogin,
    description: 'Store product structure',
  })
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = await this.userService.findOne({ email });

    if (!user) {
      throw new BadRequestException('Invalid email');
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid password');
    }

    const jwt = await this.jwtService.signAsync({ id: user.id });
    return {
      data: {
        user_email: user.email,
        JWT: jwt,
      },
    };
  }

  // get all user data
  @Get('/user_information')
  async findAll() {
    return {
      data: await this.userService.findAll(),
    };
  }

  // get user data based on id
  @Get('/user_by_id/:id')
  async userbyid(@Param('id') id: number) {
    return {
      data: await this.userService.userById(id),
    };
  }

  // update user information based on id
  @Put(':id')
  async update(@Body() data: CreateUserDto, @Param('id') id: number) {
    return {
      data: await this.userService.update(data, id),
    };
  }

  // delete user information based on id
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number) {
    await this.userService.delete(id);
  }
}
