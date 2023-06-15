import { Controller, Get, UseGuards, SetMetadata } from '@nestjs/common';
import { RolesGuard } from '../../shared/guards/roles.guard';
import { Roles } from '../../shared/decorators/roles.decorator';

@Controller({ host: 'localhost', path: 'admin' })
@UseGuards(RolesGuard)
export class AdminController {
  @Get()
  @Roles('admin')
  index(): string {
    return 'Admin page';
  }
}
