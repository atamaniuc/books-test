import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {ConfigModule} from './config.module';
import {ConfigService} from './config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.select(ConfigModule).get(ConfigService);
  const apiVersion = configService.get('API_VERSION');
  const apiPrefix = `api/v${apiVersion}`;

  app.setGlobalPrefix(apiPrefix);

  const options = new DocumentBuilder()
      .setBasePath(apiPrefix)
      .setTitle('Books Library')
      .setDescription('Some cool description')
      .setVersion(apiVersion)
      .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  const port = configService.getNumber('PORT');

  await app.listen(port);
}

bootstrap();
