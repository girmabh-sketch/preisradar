import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey
  };

  const app = await NestFactory.create(AppModule, {
    logger: new Logger()
  });

  // version can be done here 'api/v1'
  app.setGlobalPrefix('api/');

  const config = new DocumentBuilder()
    .setTitle('Spritpreisradar API')
    .setDescription('PASCADA Spritpreisradar')
    .setVersion('1.0')
    .addServer('http://localhost:60111', 'Local development')
    .addServer('http://localhost:60110', 'Docker Compose environment')
    .addServer('http://spritpreisradar.minikube', 'minikube')
    .addServer('http://demo.spritpreisradar.testcenter.pascada.net/', 'Demo')
    .addServer('http://test.spritpreisradar.testcenter.pascada.net/', 'Test')
    .addServer('http://dev.spritpreisradar.testcenter.pascada.net/', 'Development')
    // .addTag('Your API Tag')
    .build();

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('/docs', app, document, {
    swaggerOptions: {
      apisSorter: 'alpha',
      tagsSorter: 'alpha',
      operationsSorter: 'alpha'
    }
  });

  // https://nodejs.org/en/learn/command-line/how-to-read-environment-variables-from-nodejs:
  // Note: process does not require a "require", it's automatically available.
  await app.listen(process.env.PORT || 3000);
  console.log(`This application is running on: ${await app.getUrl()}`);
}

bootstrap();
