import { NestFactory } from '@nestjs/core';
import { AppModule } from '../backend/src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express, { Request, Response } from 'express';

const expressApp = express();
const adapter = new ExpressAdapter(expressApp);

let isAppInitialized = false;

async function initializeApp() {
  if (!isAppInitialized) {
    console.log('🚀 Initializing NestJS serverless function...');
    
    const app = await NestFactory.create(AppModule, adapter, {
      logger: ['error', 'warn', 'log'],
    });

    app.enableCors({
      origin: process.env.FRONTEND_URL || '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    });

    await app.init();
    isAppInitialized = true;
    console.log('✓ NestJS app initialized successfully');
  }
}

export default async (req: Request, res: Response) => {
  await initializeApp();
  expressApp(req, res);
};
