import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('=================================================');
  console.log('🚀 Starting NestJS Backend Server...');
  console.log('=================================================');
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Port: ${process.env.PORT || 3001}`);
  console.log(`Frontend URL: ${process.env.FRONTEND_URL || '*'}`);
  console.log(`Supabase URL: ${process.env.SUPABASE_URL ? '✓ Configured' : '❌ Missing'}`);
  console.log(`Supabase Key: ${process.env.SUPABASE_KEY ? '✓ Configured' : '❌ Missing'}`);
  console.log('=================================================');
  
  try {
    const app = await NestFactory.create(AppModule);
    
    // Enable CORS
    app.enableCors({
      origin: process.env.FRONTEND_URL || '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    });

    const port = process.env.PORT || 3001;
    await app.listen(port);
    
    console.log('=================================================');
    console.log(`✓ Backend server running successfully on port ${port}`);
    console.log(`✓ CORS enabled for: ${process.env.FRONTEND_URL || '*'}`);
    console.log('=================================================');
  } catch (error) {
    console.error('=================================================');
    console.error('❌ FATAL ERROR: Failed to start server');
    console.error('=================================================');
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
    console.error('=================================================');
    process.exit(1);
  }
}

bootstrap();
