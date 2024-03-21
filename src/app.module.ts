/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { PostListModule } from './modules/postList/post.module';
import { SequelizeConfig } from './database/database.providers';
import { AgentMiddleware } from './Middlewares/agent.middleware';
import { HostMiddleware } from './Middlewares/host.middleware';
import { ProtocolMiddleware } from './Middlewares/protocol.middleware';
import { PostDataModule } from './modules/postData/postdata.module';
import { PostDetailModule } from './modules/postDetail/postdetail.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    SequelizeModule.forRoot({ ...SequelizeConfig }),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env', '.env.sample'], }),
    DatabaseModule,
    PostListModule,
    PostDataModule,
    PostDetailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(
      HostMiddleware,
      AgentMiddleware,
      ProtocolMiddleware,
    ).forRoutes('*')
  };
}

