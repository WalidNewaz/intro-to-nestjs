import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseFilters,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ForbiddenException } from '../../shared/exceptions/forbidden.exception';
import { HttpExceptionFilter } from '../../shared/filters/http-exception.filter';
import { CatsService } from './cats.service';
import { CreateCatDto, ListAllEntities, UpdateCatDto } from './dto/cat.dto';
import { Cat } from './interfaces/cat.interface';
import { LoggingService } from '../logging/logging.service';
// import { ValidationPipe } from '../../shared/pipes/validation.pipe';
import { ParseIntPipe } from '../../shared/pipes/parse-int.pipe';

/**
 * @description This is a CRUD controller for cats
 */
@Controller('cats')
@UseFilters(HttpExceptionFilter)
export class CatsController {
  private readonly dbHost;
  private readonly dbUser;
  private readonly dPass;

  constructor(
    private readonly catsService: CatsService,
    private readonly LOG: LoggingService,
    private readonly configService: ConfigService,
  ) {
    // get an environment variable
    this.dbHost = this.configService.get<string>('database.host', 'localhost');
    this.dbUser = this.configService.get<string>('database.user');
    this.dPass = this.configService.get<string>('database.password');
  }

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    this.LOG.log('create', createCatDto);
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(@Query() query: ListAllEntities): Promise<Cat[]> {
    const { limit } = query;
    if (limit > 0) {
      return this.catsService.findAll();
    }
    throw new ForbiddenException();
  }

  @Get('breeds')
  getBreeds(): Array<string> {
    return ['unknown'];
  }

  @Get(':id')
  findOne(@Param('id') id: number): string {
    this.LOG.log(
      'dbHost',
      this.dbHost,
      'dbUser',
      this.dbUser,
      'dPass',
      this.dPass,
    );
    this.LOG.log('findOne', id);
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateCatDto: UpdateCatDto,
  ): string {
    this.LOG.log('update', updateCatDto);
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return `This action removes a #${id} cat`;
  }

  /** Lifecycle event handlers **/

  onModuleInit() {
    this.LOG.log('CatController: onModuleInit');
  }

  onApplicationBootstrap() {
    this.LOG.log('CatController: onApplicationBootstrap');
  }

  onModuleDestroy() {
    this.LOG.log('CatController: onModuleDestroy');
  }

  beforeApplicationShutdown(signal: string) {
    this.LOG.log('CatController: beforeApplicationShutdown', signal);
  }

  onApplicationShutdown(signal: string) {
    this.LOG.log('CatController: onApplicationShutdown', signal);
  }
}
