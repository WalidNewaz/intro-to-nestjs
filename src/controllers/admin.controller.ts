import { Controller, Get } from '@nestjs/common';

@Controller({ host: 'localhost', path: 'admin' })
export class AdminController {
  @Get()
  index(): string {
    return 'Admin page';
  }
}
