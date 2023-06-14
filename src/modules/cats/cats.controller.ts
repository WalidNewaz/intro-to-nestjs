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
  ParseIntPipe,
  ParseUUIDPipe,
  UsePipes,
} from '@nestjs/common';
import { ForbiddenException } from '../../shared/exceptions/forbidden.exception';
import { HttpExceptionFilter } from '../../shared/filters/http-exception.filter';
import { CatsService } from './cats.service';
import { CreateCatDto, ListAllEntities, UpdateCatDto } from './dto/cat.dto';
import { Cat } from './interfaces/cat.interface';
import { LoggingService } from '../logging/logging.service';
import { createCatSchema } from './schemas/cat.schema';
import { JoiValidationPipe } from '../../shared/pipes/joi-validation.pipe';

/**
 * @description This is a CRUD controller for cats
 */
@Controller('cats')
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly LOG: LoggingService,
  ) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createCatSchema))
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
    return [''];
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): string {
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
}
