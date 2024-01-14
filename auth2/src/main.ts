// import { NestFactory } from '@nestjs/core';
// import { ApplicationModule } from './app.module';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// async function bootstrap() {
//   const appOptions = {cors: true};
//   const app = await NestFactory.create(ApplicationModule, appOptions);
//   app.setGlobalPrefix('api');

//   const options = new DocumentBuilder()
//     .setTitle('NestJS Realworld Example App')
//     .setDescription('The Realworld API description')
//     .setVersion('1.0')
//     .setBasePath('api')
//     .addBearerAuth()
//     .build();
//   const document = SwaggerModule.createDocument(app, options);
//   SwaggerModule.setup('/docs', app, document);

//   await app.listen(3100);
// }
// bootstrap();

// main.ts of authentication service
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices'; // import Transport enum
import { ApplicationModule } from './app.module';

async function bootstrap() {
  // change create() to createMicroservice()
  const app = await NestFactory.createMicroservice(ApplicationModule, {
    transport: Transport.TCP, // specify transport strategy
    options: {
      host: 'localhost',
      port: 3100,
    },
  });
  // remove appOptions, app.setGlobalPrefix(), and SwaggerModule related code
  // change app.listen() to app.listenAsync()
  await app.listen();
}
bootstrap();
