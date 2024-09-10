import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import * as session from 'express-session';
import { Request, Response, NextFunction } from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

const whiteList = ['/user'];
function MiddleWareAll(req: Request, res: Response, next: NextFunction) {
  console.log(req.originalUrl);
  console.log('进入全局中间件');
  next();
  // if (whiteList.includes(req.originalUrl)) {
  //   next();
  // } else {
  //   res.send({ msg: '你他娘的真是个天才' });
  // }
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // cors: true
  });
  app.useStaticAssets(join(__dirname, 'images'), {
    prefix: '/pics',
  })

  // 允许增加接口的版本控制
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.use(
    session({
      secret: 'leozhang',
      rolling: true,
      name: 'zhanglei.sid',
      cookie: { maxAge: 999999 },
    }),
  );
  // app.use(cors());
  app.use(MiddleWareAll);

  await app.listen(3000);
}
bootstrap();
