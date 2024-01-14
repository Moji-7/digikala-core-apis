//controller.ts of authentication service
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { UserService } from './user.service';
import { UserRO } from './user.interface';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto';
import { Controller, Logger } from '@nestjs/common';



@Controller()
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(
    private readonly userService: UserService
  ) {}

  @MessagePattern('login')
  async login(@Payload() loginUserDto: LoginUserDto): Promise<UserRO> {
    this.logger.log(`Login methos of micro service called :) with payload ${loginUserDto}`);

    const _user = await this.userService.findOne(loginUserDto);

    const errors = { User: ' not found' };
    if (!_user) throw new RpcException({ errors });

    const token = await this.userService.generateJWT(_user);
    const { email, username, bio, image } = _user;
    const user = { email, token, username, bio, image };
    await this.userService.cacheToken(token, user); // store token in Redis
    return { user };
  }

  @MessagePattern('register')
  async create(@Payload() userData: CreateUserDto): Promise<UserRO> {
    return this.userService.create(userData);
  }

  @MessagePattern('findMe')
  async findMe(@Payload() email: string): Promise<UserRO> {
    return await this.userService.findByEmail(email);
  }

}
