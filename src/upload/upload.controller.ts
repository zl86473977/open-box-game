import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Res,
  Param,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { Response } from 'express';
import { zip } from 'compressing';
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('album')
  @UseInterceptors(FileInterceptor('file1')) // 这边的file1是前端上传时的键名
  upload(@UploadedFile() file) {
    console.log(file);
    return true;
  }

  // download方式下载
  @Get('download/:id')
  downloadImg(@Res() res: Response, @Param('id') id: string) {
    const url = join(__dirname, `../images/${id}.jpg`)
    res.download(url);
  }

  @Get('stream/:id')
  async down(@Res() res: Response, @Param('id') id: string) {
    const url = join(__dirname, `../images/${id}.jpg`)
    const tarStream = new zip.Stream();
    await tarStream.addEntry(url)
    // 图片流固定格式
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment; filename=zzl');
    tarStream.pipe(res);
  }
}
