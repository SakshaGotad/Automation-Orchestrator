import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Changed default port to 3001 to avoid collision with ingestion-service
  await app.listen(process.env.ORCHESTRATOR_SERVICE_PORT ?? 3001);
}
bootstrap();
