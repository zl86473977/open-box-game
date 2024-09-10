import {
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Body,
  Query,
  HttpCode,
  Request,
  Inject,
} from '@nestjs/common';
import { JacketService } from './jacket.service';

// @Controller({
//     path: 'jacket',
//     version: '1'
// })
@Controller('jacket')
export class JacketController {
  constructor(
    private readonly jacketService: JacketService,
    @Inject('Config') private readonly config: any,
  ) {}

  @Get()
  findAll(@Query() query) {
    console.log(this.config);
    console.log(query);
    return {
      code: 200,
      msg: query.name,
    };
  }

  @Post()
  create(@Body('name') name) {
    console.log(name);
    return {
      code: 200,
      msg: name,
    };
  }

  @Get(':id')
  @HttpCode(500)
  findOne(@Param('id') id: string) {
    return this.jacketService.getJacket(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() jacketDto: any) {
    return this.jacketService.updateJacket(+id, jacketDto);
  }
}
