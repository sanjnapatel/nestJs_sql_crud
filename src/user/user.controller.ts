import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  Res,
  Req,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from './user.entity';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Get(':id')
  get(@Param() params) {
    return this.service.getUser(params.id);
  }

  @Get('')
  async showAllUsers(@Res() res: any) {
    const users = await this.service.showAll();
    return {
      message: 'Users fetched successfully',
      users,
    };
  }

  @Post('create')
  create(@Body() user: User) {
    console.log(user);
    return this.service.createUser(user);
  }

  @Put(':id')
  update(@Param() id:number ,@Body() user: User) {
    return this.service.updateUser(id , user);
  }

  @Delete(':id')
  deleteUser(@Param() params) {
    return this.service.deleteUser(params.id);
  }
}
