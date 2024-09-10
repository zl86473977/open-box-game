import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
// app.controller.ts 常用功能是用来处理http请求以及调用service层的处理方法
@Controller()
export class AppController {
  // constructor(private readonly appService: AppService) {} // 使用默认的module注入方式
  constructor(
    @Inject('APP') private readonly appService: AppService,
    @Inject('SW') private readonly sw: string[],
    @Inject('CCC') private readonly ccc: string[],
    private readonly userService: UserService,
  ) {} // 起了别名的module注入方式

  @Get()
  getHello(): string {
    // return this.appService.getHello();
    return this.userService.findAll();
  }

  @Get('/sw')
  getSW(): string[] {
    return this.sw;
  }

  @Get('/ccc')
  getCCC(): string[] {
    return this.ccc;
  }
}
