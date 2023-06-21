import { Injectable } from '@nestjs/common';

/**
 * This is the `UserService` provider. This has a lifetime scope synchronized
 */
@Injectable()
export class UsersService {
  findAll() {
    return [];
  }
}
