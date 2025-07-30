import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Testing NestJS Swagger')
    .setDescription('Simple API with Swagger UI')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3001);
  console.log('Application is running on: http://localhost:3001');
  console.log('Swagger UI is available at: http://localhost:3001/api');
}
bootstrap();
