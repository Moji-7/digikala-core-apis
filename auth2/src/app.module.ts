
import { Module ,Global } from '@nestjs/common';
import { AppController } from './app.controller';
import { ArticleModule } from './article/article.module';
//import { UserModule } from './user/userold.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ProfileModule } from './profile/profile.module';
import { TagModule } from './tag/tag.module';
import { InjectDataSource } from '@nestjs/typeorm';
import { MyCacheModule } from './myCache/myCache.module';

//import { MyCacheModule } from './myCache/myCache.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'authdb',
      entities: ["src/**/**.entity{.ts,.js}"],
      synchronize: true
    }),
    MyCacheModule,
    ArticleModule,
    UserModule,
    ProfileModule,
    TagModule,
  ],
  controllers: [
    AppController
  ],
  providers: []
})
export class ApplicationModule {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}
}
