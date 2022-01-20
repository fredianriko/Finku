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
} from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { EntityNotFoundExceptionFilter } from './entity-not-found-exception-filter';
import { UserService } from './user.service';

@Controller('users')
@UseFilters(new EntityNotFoundExceptionFilter())
export class UserController {
  constructor(private readonly userService: UserService) {}

  // get all user data
  @Get()
  async findAll() {
    return {
      data: await this.userService.findAll(),
    };
  }

  // get user data based on id
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return {
      data: await this.userService.findOne(id),
    };
  }

  // create new user
  @Post('/register')
  async create(@Body() data: CreateUserDto) {
    return {
      data: await this.userService.create(data),
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
