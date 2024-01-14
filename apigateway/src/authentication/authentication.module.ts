// authentication.module.ts
import { Global, Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3100,
        },
      },
    ]),
  ],
  controllers: [AuthenticationController],
  providers: [],
  exports: [AuthenticationModule],
})
export class AuthenticationModule {}
