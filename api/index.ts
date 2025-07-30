import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { VercelRequest, VercelResponse } from '@vercel/node';

const server = express();
let app: any;

async function createNestServer(expressInstance: express.Express) {
  if (!app) {
    app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressInstance),
    );

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

    await app.init();
  }
  return app;
}

export default async (req: VercelRequest, res: VercelResponse) => {
  await createNestServer(server);
  server(req as any, res as any);
};
