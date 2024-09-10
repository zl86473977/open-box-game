import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppService2 } from './app.service2';
import { JacketModule } from './jacket/jacket.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from './config/config.module';
import { UploadModule } from './upload/upload.module';

// app.module.ts 根模块用于处理其他类的引用与共享
@Module({
  imports: [JacketModule, UserModule, ConfigModule.forRoot({
    path: '/leo'
  }), UploadModule],
  controllers: [AppController],
  providers: [
    AppService2,
    // 起别名
    {
      provide: 'APP',
      useClass: AppService,
    },
    {
      provide: 'SW',
      useValue: ['HS', 'RS', 'BS'],
    },
    {
      provide: 'CCC',
      inject: [AppService2],
      useFactory(app2: AppService2) {
        return app2.getSW();
      },
    },
  ],
})
export class AppModule {}
