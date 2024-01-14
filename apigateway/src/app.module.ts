import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthenticationModule } from './authentication/authentication.module';
//@Global()
@Module({
  imports: [
    AuthenticationModule,
  ],
  providers: [],
 // exports: [MyCacheService],
})
export class AppModule {}
