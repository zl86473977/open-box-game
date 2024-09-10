import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { JacketService } from './jacket.service';
import { JacketController } from './jacket.controller';
import { Logger } from '../logger/index';

@Module({
  controllers: [JacketController],
  providers: [JacketService],
})
export class JacketModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 字符串写法
    // consumer.apply(Logger).forRoutes('jacket');

    // 对象写法
    // consumer
    //   .apply(Logger)
    //   .forRoutes({ path: 'jacket', method: RequestMethod.POST });

    // 类写法
    consumer.apply(Logger).forRoutes(JacketController);
  }
}
