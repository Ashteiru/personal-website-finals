import { NestFactory } from '@nestjs/core';
import { AppModule } from '../backend/src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();
let app;

export default async (req, res) => {
  if (!app) {
    console.log('🚀 Initializing NestJS serverless function...');
    app = await NestFactory.create(
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
    console.log('✓ NestJS app initialized');
  }

  return server(req, res);
};
