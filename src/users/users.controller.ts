import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { RequestWithUser } from 'src/utils/requestWithUser';
import { ObjectID } from 'typeorm';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(LocalAuthGuard)
  @Get('@me')
  getLoggedUser(@Request() req: RequestWithUser) {
    return req.user;
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.usersService.findById(new ObjectID(id));
  }

  @Get('/:username')
  getByUsername(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  @Post('/premium/:username')
  setPremium(@Param('username') username: string) {
    return this.usersService.setPremium(username);
  }

  @Delete('/:id')
  deleteById(@Param('id') id: string) {
    return this.usersService.deleteById(new ObjectID(id));
  }
}
