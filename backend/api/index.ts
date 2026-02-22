import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();

export default async (req, res) => {
  if (!global.nestApp) {
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(server),
    );

    // Enable CORS
    app.enableCors({
      origin: process.env.FRONTEND_URL || '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    });

    await app.init();
    global.nestApp = app;
  }

  return server(req, res);
};
