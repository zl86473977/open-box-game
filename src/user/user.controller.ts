import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  Session,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }

  @Get('code')
  createCode(@Req() req, @Res() res, @Session() session) {
    const captcha = this.userService.createCode();
    session.code = captcha.text;
    res.type('image/svg+xml');
    res.send(captcha.data);
  }

  @Post('create')
  createUser(@Body() body, @Session() session) {
    console.log(body, typeof body, body.code, session);
    if (!session.code) {
      return {
        code: 400,
        data: {
          msg: '验证码失效',
        },
      };
    } else if (body?.code?.toLowerCase() !== session.code?.toLowerCase()) {
      return {
        code: 400,
        data: {
          msg: '验证码错误',
        },
      };
    } else {
      return {
        code: 200,
        data: {
          msg: '注册成功',
        },
      };
    }
  }
}
