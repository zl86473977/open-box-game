import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

@Module({
  imports : [MulterModule.register({
    storage: diskStorage({
      destination: join(__dirname, "../images"),
      filename: (_req, file, callback) => {
        const fileName = `${Date.now() + extname(file.originalname)}`
        return callback(null, fileName)
      }
    })
  })],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
