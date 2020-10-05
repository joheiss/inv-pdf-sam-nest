import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { fastify, FastifyInstance, FastifyServerOptions } from 'fastify';

export interface NestApp {
  app: NestFastifyApplication;
  instance: FastifyInstance;
}

export async function bootstrap(): Promise<NestApp> {
  const serverOptions: FastifyServerOptions = {
    logger: true,
  };
  const instance: FastifyInstance = fastify(serverOptions);
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(instance),
    {
      logger: 'local' == process.env['APP_STAGE'] ? new Logger() : console,
    },
  );
  app.enableCors();

  app.setGlobalPrefix('v1');
  app.useGlobalPipes(new ValidationPipe());
  await app.init();

  return { app, instance };
}
