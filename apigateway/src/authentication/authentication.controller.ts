// authentication.controller.ts
import { Controller, Inject, Post, Body, Logger, HttpCode, HttpException, HttpStatus, Res } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';

import { LoginRequestDto } from './login-user.dto'
@Controller()
export class AuthenticationController {

  private readonly logger = new Logger(AuthenticationController.name);
  constructor(
    @Inject('AUTH_SERVICE') private readonly client: ClientProxy,
  ) {}

  // @Post('login')
  // async login(@Body() loginRequestDto: LoginRequestDto) {
  //   const { user } = loginRequestDto;
  //   this.logger.log(`Attempting login for user with email: ${user.email}`);
  //   return this.client.send('login', user);
  // }
  
  @EventPattern('auth/token')
  @HttpCode(200)
  handleToken(@Res() res, data: any) {
    // ...
  }
  @Post('login')
  @HttpCode(200)
  async handleLogin(@Body() loginRequestDto: LoginRequestDto) {
    const { user } = loginRequestDto;
    this.logger.log(`Attempting login for user with email: ${user.email}`);
    try {
      // use the await keyword
      const resp = await this.client.send('login', user).toPromise();
      // return the token to the client
      return { resp };
    } catch (error) {
      // handle any errors that might occur during the authentication process
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }
}
