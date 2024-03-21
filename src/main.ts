/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidateInputPipe } from './pipes/validate.pipe';
import { DbExceptionFilter } from './pipes/db-exception.filter';
import * as bodyParser from 'body-parser';
import { ALLOWEDCORS, ALLOWEDMETHOD } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: ALLOWEDCORS,
    credentials: true,
    methods: ALLOWEDMETHOD,
  });
  app.useGlobalPipes(new ValidateInputPipe());
  app.useGlobalFilters(new DbExceptionFilter());
  app.use(bodyParser.json());
  await app.listen(process.env.APP_PORT);
}
bootstrap();
