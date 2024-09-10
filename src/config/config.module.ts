import { DynamicModule, Global, Module } from '@nestjs/common';

interface Options {
  path: string;
}

@Global()
@Module({})
export class ConfigModule {
  // 动态写法
  static forRoot(options: Options): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: 'Config',
          useValue: { baseUrl: '/api' + options.path },
        },
      ],
      exports: [
        {
          provide: 'Config',
          useValue: { baseUrl: '/api' + options.path },
        },
      ],
    };
  }
}
