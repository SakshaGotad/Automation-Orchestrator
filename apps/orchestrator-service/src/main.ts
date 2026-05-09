import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Changed default port to 3001 to avoid collision with ingestion-service
  const configService = app.get(ConfigService);
  const port = configService.get<number>('ORCHESTRATOR_SERVICE_PORT') ?? 3001;
  await app.listen(port);
}
bootstrap();
