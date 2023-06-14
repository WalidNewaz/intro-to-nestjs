import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto, ListAllEntities, UpdateCatDto } from './dto/cat.dto';
import { Cat } from './interfaces/cat.interface';
import { LoggingService } from '../logging/logging.service';

/**
 * @description This is a CRUD controller for cats
 */
@Controller('cats')
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly LOG: LoggingService,
  ) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    this.LOG.log('create', createCatDto);
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(@Query() query: ListAllEntities): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get('breeds')
  getBreeds(): Array<string> {
    return [''];
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto): string {
    this.LOG.log('update', updateCatDto);
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return `This action removes a #${id} cat`;
  }
}
